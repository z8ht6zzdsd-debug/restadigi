import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  createReservation,
  ensureChatSession,
  parseReservationArgs,
  saveChatMessage,
} from "@/lib/chat-service";
import type { ChatMessage } from "@/lib/chatbot-prompt";
import { getDatabaseUrl } from "@/lib/database-url";
import {
  buildChatbotSystemPrompt,
  buildReservationTool,
  getRestaurantSettings,
} from "@/lib/settings-service";

const chatRequestSchema = z.object({
  sessionId: z.string().uuid().optional(),
  visitorSessionId: z.string().uuid().optional(),
  locale: z.enum(["fi", "en", "es"]).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
});

type OpenAiMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content?: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
  name?: string;
};

async function callOpenAi(
  messages: OpenAiMessage[],
  apiKey: string,
  model: string,
  tools: ReturnType<typeof buildReservationTool>[],
) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      tools,
      tool_choice: "auto",
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI API error:", response.status, errorText);
    throw new Error("OpenAI request failed");
  }

  return (await response.json()) as {
    choices?: Array<{ message?: OpenAiMessage }>;
  };
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "OpenAI API -avain puuttuu. Aseta OPENAI_API_KEY ympäristömuuttujaksi." },
            { status: 500 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Virheellinen pyyntö." }, { status: 400 });
        }

        const parsed = chatRequestSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Virheelliset viestit." }, { status: 400 });
        }

        const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
        const userMessages = parsed.data.messages;
        const lastUserMessage = userMessages[userMessages.length - 1];
        const locale = parsed.data.locale ?? "fi";
        const settings = await getRestaurantSettings();
        const reservationTool = buildReservationTool(settings);
        const tools = settings.reservationsEnabled ? [reservationTool] : [];

        let sessionId = parsed.data.sessionId;
        let reservationCreated = false;

        if (getDatabaseUrl()) {
          try {
            sessionId = await ensureChatSession(sessionId, parsed.data.visitorSessionId);
            if (lastUserMessage?.role === "user") {
              await saveChatMessage(sessionId, "user", lastUserMessage.content);
            }
          } catch (error) {
            console.error("Chat DB error:", error);
          }
        }

        const openAiMessages: OpenAiMessage[] = [
          { role: "system", content: buildChatbotSystemPrompt(settings, locale) },
          ...userMessages.map((m) => ({ role: m.role, content: m.content })),
        ];

        try {
          let data = await callOpenAi(openAiMessages, apiKey, model, tools);
          let assistantMsg = data.choices?.[0]?.message;

          if (assistantMsg?.tool_calls?.length) {
            openAiMessages.push(assistantMsg);

            for (const toolCall of assistantMsg.tool_calls) {
              if (toolCall.function.name !== "create_restaurant_reservation") continue;

              let toolContent = "Varaus tallennettu onnistuneesti.";
              try {
                const args = parseReservationArgs(toolCall.function.arguments);
                if (!getDatabaseUrl()) {
                  throw new Error("Tietokantaa ei ole konfiguroitu");
                }
                if (!sessionId) {
                  throw new Error("Chat-istunto puuttuu");
                }
                await createReservation({ ...args, chatSessionId: sessionId }, settings);
                reservationCreated = true;
              } catch (error) {
                console.error("Reservation error:", error);
                toolContent =
                  error instanceof Error
                    ? `Varauksen tallennus epäonnistui: ${error.message}. Pyydä asiakasta tarkistamaan tiedot.`
                    : "Varauksen tallennus epäonnistui. Pyydä asiakasta tarkistamaan tiedot.";
              }

              openAiMessages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: toolContent,
              });
            }

            data = await callOpenAi(openAiMessages, apiKey, model, tools);
            assistantMsg = data.choices?.[0]?.message;
          }

          const reply = assistantMsg?.content?.trim();
          if (!reply) {
            return Response.json({ error: "Tyhjä vastaus chatbotilta." }, { status: 502 });
          }

          if (getDatabaseUrl() && sessionId) {
            try {
              await saveChatMessage(sessionId, "assistant", reply);
            } catch (error) {
              console.error("Save assistant message error:", error);
            }
          }

          const assistantMessage: ChatMessage = { role: "assistant", content: reply };
          return Response.json({
            message: assistantMessage,
            sessionId,
            reservationCreated,
          });
        } catch (error) {
          console.error("Chat API error:", error);
          return Response.json({ error: "Palvelinvirhe. Yritä uudelleen." }, { status: 500 });
        }
      },
    },
  },
});
