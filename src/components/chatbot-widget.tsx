import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ChatMessage } from "@/lib/chatbot-prompt";
import {
  getChatSessionId,
  getOrCreateVisitorSessionId,
  setChatSessionId,
} from "@/lib/visitor-session";
import { cn } from "@/lib/utils";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hei! Olen Restadigin chatbot. Voin kertoa palveluistamme tai auttaa tekemään demo-pöytävarauksen ravintolaan. Miten voin auttaa?",
};

export function ChatbotWidget() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [sessionId, setSessionId] = useState<string | null>(() => getChatSessionId());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hidden = pathname.startsWith("/dashboard");

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId ?? undefined,
          visitorSessionId: getOrCreateVisitorSessionId(),
          messages: nextMessages.filter((m) => m !== WELCOME),
        }),
      });

      const data = (await response.json()) as {
        message?: ChatMessage;
        sessionId?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Viestin lähetys epäonnistui.");
      }

      if (data.sessionId) {
        setSessionId(data.sessionId);
        setChatSessionId(data.sessionId);
      }

      if (data.message) {
        setMessages((prev) => [...prev, data.message!]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tapahtui virhe.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  if (hidden) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {open && (
          <div
            className={cn(
              "flex w-[min(100vw-3rem,24rem)] flex-col overflow-hidden rounded-sm border border-border bg-card shadow-2xl",
              "animate-in fade-in slide-in-from-bottom-4 duration-200",
            )}
            role="dialog"
            aria-label="Restadigi chatbot"
          >
            <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-primary-foreground/70">
                  Chatbot
                </p>
                <p className="text-sm font-medium">Restadigi avustaja</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-primary-foreground/10"
                aria-label="Sulje chat"
              >
                <X className="size-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex max-h-80 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={cn(
                    "max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "ml-auto bg-accent text-accent-foreground"
                      : "mr-auto border border-border bg-background text-foreground/85",
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto rounded-sm border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                  Kirjoittaa…
                </div>
              )}
            </div>

            {error && (
              <p className="px-4 pb-2 text-xs text-destructive" role="alert">
                {error}
              </p>
            )}

            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Kirjoita viestisi…"
                  rows={2}
                  disabled={loading}
                  className="min-h-[44px] resize-none border-border bg-background"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => void sendMessage()}
                  disabled={loading || !input.trim()}
                  className="shrink-0 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  aria-label="Lähetä viesti"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <Button
          type="button"
          size="lg"
          onClick={() => setOpen((v) => !v)}
          className="h-14 rounded-full bg-primary px-5 shadow-lg hover:bg-accent"
          aria-expanded={open}
          aria-label={open ? "Sulje chatbot" : "Avaa chatbot"}
        >
          <MessageCircle className="size-5" />
          <span className="hidden sm:inline">{open ? "Sulje chat" : "Kokeile chatbotia"}</span>
        </Button>
      </div>
    </>
  );
}
