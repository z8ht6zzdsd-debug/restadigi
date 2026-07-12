import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { CHATBOT_SYSTEM_PROMPT, type ChatMessage } from "@/lib/chatbot-prompt";

const chatRequestSchema = z.object({
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

        const openAiMessages = [
          { role: "system" as const, content: CHATBOT_SYSTEM_PROMPT },
          ...parsed.data.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ];

        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages: openAiMessages,
              max_tokens: 500,
              temperature: 0.7,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API error:", response.status, errorText);
            return Response.json(
              { error: "Chatbot ei vastaa juuri nyt. Yritä hetken päästä uudelleen." },
              { status: 502 },
            );
          }

          const data = (await response.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };

          const reply = data.choices?.[0]?.message?.content?.trim();
          if (!reply) {
            return Response.json({ error: "Tyhjä vastaus chatbotilta." }, { status: 502 });
          }

          const assistantMessage: ChatMessage = { role: "assistant", content: reply };
          return Response.json({ message: assistantMessage });
        } catch (error) {
          console.error("Chat API error:", error);
          return Response.json({ error: "Palvelinvirhe. Yritä uudelleen." }, { status: 500 });
        }
      },
    },
  },
});
