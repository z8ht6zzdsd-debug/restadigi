import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ChatMessage } from "@/lib/chatbot-prompt";
import type { PublicRestaurantSettings } from "@/lib/restaurant-settings-types";
import {
  getChatSessionId,
  getOrCreateVisitorSessionId,
  setChatSessionId,
} from "@/lib/visitor-session";
import { cn } from "@/lib/utils";

const FALLBACK_WELCOME =
  "Hei! Tervetuloa ravintolaan. Autan mielelläni pöytävarauksessa — kerro nimesi, henkilömäärän, päivän, kellonajan, sähköpostisi ja puhelinnumerosi.";

export function ChatbotWidget() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [siteSettings, setSiteSettings] = useState<PublicRestaurantSettings | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(() => getChatSessionId());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hidden = pathname.startsWith("/dashboard");
  const accentColor = siteSettings?.accentColor ?? "#c46a32";
  const welcomeText = siteSettings?.chatbotWelcomeMessage ?? FALLBACK_WELCOME;
  const restaurantName = siteSettings?.restaurantName ?? "Ravintola";

  useEffect(() => {
    document.documentElement.classList.toggle("chatbot-open", open);
    return () => document.documentElement.classList.remove("chatbot-open");
  }, [open]);

  useEffect(() => {
    void fetch("/api/restaurant/settings")
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json() as Promise<{ settings: PublicRestaurantSettings }>;
      })
      .then((data) => {
        if (data?.settings) setSiteSettings(data.settings);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setMessages([{ role: "assistant", content: welcomeText }]);
  }, [welcomeText]);

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
          messages: nextMessages.filter((m) => m.role !== "assistant" || m.content !== welcomeText),
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
            aria-label="Ravintolan chatbot"
          >
            <div
              className="flex items-center justify-between border-b border-border px-4 py-3 text-white"
              style={{ backgroundColor: accentColor }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/70">Chatbot</p>
                <p className="text-sm font-medium">{restaurantName}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-white/10"
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
                      ? "ml-auto text-white"
                      : "mr-auto border border-border bg-background text-foreground/85",
                  )}
                  style={msg.role === "user" ? { backgroundColor: accentColor } : undefined}
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
                  className="shrink-0 rounded-full text-white hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
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
          className="h-14 rounded-full px-5 text-white shadow-lg hover:opacity-90"
          style={{ backgroundColor: accentColor }}
          aria-expanded={open}
          aria-label={open ? "Sulje chatbot" : "Avaa chatbot"}
        >
          <MessageCircle className="size-5" />
          <span className="hidden sm:inline">{open ? "Sulje chat" : "Varaa pöytä"}</span>
        </Button>
      </div>
    </>
  );
}
