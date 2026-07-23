import { useRouterState } from "@tanstack/react-router";
import { Headphones, MessageCircle, RefreshCw, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import restadigiIcon from "@/assets/restadigi-logo-icon.png";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLocale, useMessages } from "@/i18n";
import type { ChatMessage } from "@/lib/chatbot-prompt";
import type { PublicRestaurantSettings } from "@/lib/restaurant-settings-types";
import {
  getChatSessionId,
  getOrCreateVisitorSessionId,
  setChatSessionId,
} from "@/lib/visitor-session";
import { cn } from "@/lib/utils";

type ChatMode = "sales" | "reservation";

type ChatbotPanelProps = {
  mode: ChatMode;
  /** floating = bottom-right FAB; inline = button for hero (chat panel still floats) */
  placement: "floating" | "inline";
  className?: string;
};

const BROWN = "#432f24";
const ORANGE = "#c46a32";

function useChatbot(mode: ChatMode) {
  const t = useMessages();
  const { locale } = useLocale();
  const copy = mode === "sales" ? t.widget.sales : t.widget.booking;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [siteSettings, setSiteSettings] = useState<PublicRestaurantSettings | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(() => getChatSessionId(mode));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const accentColor = mode === "reservation" ? (siteSettings?.accentColor ?? ORANGE) : BROWN;

  const welcomeText =
    mode === "reservation" && locale === "fi" && siteSettings?.chatbotWelcomeMessage
      ? siteSettings.chatbotWelcomeMessage
      : copy.welcome;

  const headerTitle =
    mode === "reservation" ? (siteSettings?.restaurantName ?? copy.title) : copy.title;

  useEffect(() => {
    if (mode !== "reservation") return;
    void fetch("/api/restaurant/settings")
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json() as Promise<{ settings: PublicRestaurantSettings }>;
      })
      .then((data) => {
        if (data?.settings) setSiteSettings(data.settings);
      })
      .catch(() => undefined);
  }, [mode]);

  function resetConversation() {
    setMessages([{ role: "assistant", content: welcomeText }]);
    setSessionId(null);
    setError(null);
    setInput("");
  }

  useEffect(() => {
    setMessages([{ role: "assistant", content: welcomeText }]);
    setError(null);
  }, [welcomeText, locale]);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  async function sendMessage(rawText?: string) {
    const text = (rawText ?? input).trim();
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
          locale,
          mode,
          messages: nextMessages.filter((m) => m.role !== "assistant" || m.content !== welcomeText),
        }),
      });

      const data = (await response.json()) as {
        message?: ChatMessage;
        sessionId?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? copy.sendFailed);
      }

      if (data.sessionId) {
        setSessionId(data.sessionId);
        setChatSessionId(data.sessionId, mode);
      }

      if (data.message) {
        setMessages((prev) => [...prev, data.message!]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.genericError);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  return {
    mode,
    copy,
    open,
    setOpen,
    input,
    setInput,
    messages,
    loading,
    error,
    scrollRef,
    inputRef,
    accentColor,
    headerTitle,
    welcomeText,
    sendMessage,
    handleKeyDown,
    resetConversation,
  };
}

function ChatDialog({
  mode,
  panel,
  panelClassName,
}: {
  mode: ChatMode;
  panel: ReturnType<typeof useChatbot>;
  panelClassName?: string;
}) {
  const {
    copy,
    open,
    setOpen,
    input,
    setInput,
    messages,
    loading,
    error,
    scrollRef,
    inputRef,
    accentColor,
    headerTitle,
    welcomeText,
    sendMessage,
    handleKeyDown,
    resetConversation,
  } = panel;

  if (!open) return null;

  const isSales = mode === "sales";
  const showQuickReplies =
    isSales &&
    "quickReplies" in copy &&
    messages.length === 1 &&
    messages[0]?.role === "assistant" &&
    messages[0]?.content === welcomeText &&
    !loading;

  // Sales = dark brown panel; booking = orange panel (same structure as Resta-AI)
  const panelBg = isSales ? "#2a2018" : accentColor;
  const brandColor = isSales ? ORANGE : "#fff7ed";
  const userBubbleBg = isSales ? ORANGE : BROWN;
  const avatarBg = isSales ? BROWN : "rgba(0,0,0,0.2)";
  const footerBg = isSales ? "rgba(26,21,18,0.5)" : "rgba(0,0,0,0.18)";
  const chipClass = isSales
    ? "border-[rgba(196,106,50,0.55)] bg-[#1a1512]/70 text-[#e8a05a] hover:border-[rgba(196,106,50,0.9)] hover:bg-[#432f24]"
    : "border-white/40 bg-black/15 text-white hover:border-white/70 hover:bg-black/25";

  return (
    <div
      className={cn(
        "flex w-[min(100vw-2.5rem,22.5rem)] flex-col overflow-hidden rounded-2xl border border-white/15 text-white shadow-2xl",
        "animate-in fade-in slide-in-from-bottom-4 duration-200",
        panelClassName,
      )}
      style={{ backgroundColor: panelBg }}
      role="dialog"
      aria-label={copy.dialogAria}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={restadigiIcon}
            alt="Restadigi"
            className="size-9 shrink-0 rounded-full border border-white/25 object-cover shadow-sm"
            style={{ backgroundColor: avatarBg }}
          />
          <div className="min-w-0">
            <p
              className="truncate text-sm font-semibold tracking-[0.14em]"
              style={{ color: brandColor }}
            >
              {copy.eyebrow}
            </p>
            <p className="truncate text-xs text-white/70">{headerTitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={resetConversation}
            className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
            aria-label={"resetAria" in copy ? copy.resetAria : copy.closeAria}
          >
            <RefreshCw className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
            aria-label={copy.closeLabel}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex max-h-[min(55vh,28rem)] flex-col gap-3 overflow-y-auto px-3 pb-3"
      >
        {messages.map((msg, i) =>
          msg.role === "assistant" ? (
            <div key={`a-${i}`} className="flex items-end gap-2">
              <img
                src={restadigiIcon}
                alt=""
                className="mb-0.5 size-8 shrink-0 rounded-full border border-white/20 object-cover"
                style={{ backgroundColor: avatarBg }}
              />
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[#1a1512] shadow-sm whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          ) : (
            <div
              key={`u-${i}`}
              className="ml-auto max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm whitespace-pre-wrap"
              style={{ backgroundColor: userBubbleBg }}
            >
              {msg.content}
            </div>
          ),
        )}
        {loading && (
          <div className="flex items-end gap-2">
            <img
              src={restadigiIcon}
              alt=""
              className="size-8 shrink-0 rounded-full border border-white/20 object-cover"
              style={{ backgroundColor: avatarBg }}
            />
            <div className="rounded-2xl bg-white/95 px-3.5 py-2.5 text-sm text-[#5c534c]">
              {copy.typing}
            </div>
          </div>
        )}

        {showQuickReplies ? (
          <div className="mt-1 flex flex-wrap justify-end gap-2">
            {copy.quickReplies.map((item) => (
              <button
                key={item.label}
                type="button"
                disabled={loading}
                onClick={() => void sendMessage(item.message)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  chipClass,
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {error && (
        <p className="px-4 pb-2 text-xs text-red-100" role="alert">
          {error}
        </p>
      )}

      <div className="border-t border-white/15 p-3" style={{ backgroundColor: footerBg }}>
        <div className="flex items-end gap-2 rounded-2xl bg-white p-1.5 shadow-inner">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={copy.placeholder}
            rows={1}
            disabled={loading}
            className="min-h-[40px] max-h-28 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-[#1a1512] shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            size="icon"
            onClick={() => void sendMessage()}
            disabled={loading || !input.trim()}
            className="mb-0.5 size-9 shrink-0 rounded-full text-white hover:opacity-90"
            style={{ backgroundColor: isSales ? ORANGE : BROWN }}
            aria-label={copy.sendAria}
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] tracking-wide text-white/50">{headerTitle}</p>
      </div>
    </div>
  );
}

function ChatbotPanel({ mode, placement, className }: ChatbotPanelProps) {
  const panel = useChatbot(mode);
  const { copy, open, setOpen, accentColor } = panel;
  const Icon = mode === "sales" ? Headphones : MessageCircle;

  useEffect(() => {
    if (placement !== "floating") return;
    document.documentElement.classList.toggle("chatbot-open", open);
    return () => document.documentElement.classList.remove("chatbot-open");
  }, [open, placement]);

  useEffect(() => {
    if (mode !== "sales" || placement !== "floating") return;
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SALES_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SALES_CHAT_EVENT, onOpen);
  }, [mode, placement, setOpen]);

  if (placement === "inline") {
    return (
      <div className={cn("relative flex flex-col items-center", className)}>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] sm:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2">
              <ChatDialog mode={mode} panel={panel} />
            </div>
          </>
        )}
        <Button
          type="button"
          size="lg"
          onClick={() => setOpen((v) => !v)}
          className="h-14 rounded-full px-6 text-white shadow-lg hover:opacity-90"
          style={{ backgroundColor: accentColor }}
          aria-expanded={open}
          aria-label={open ? copy.closeAria : copy.openAria}
        >
          <MessageCircle className="size-5" />
          <span>{open ? copy.closeLabel : copy.openLabel}</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div className={cn("fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", className)}>
        <ChatDialog mode={mode} panel={panel} />

        <Button
          type="button"
          size="lg"
          onClick={() => setOpen((v) => !v)}
          className="h-14 rounded-full px-5 text-white shadow-lg hover:opacity-90"
          style={{ backgroundColor: accentColor }}
          aria-expanded={open}
          aria-label={open ? copy.closeAria : copy.openAria}
        >
          <Icon className="size-5" />
          <span className="hidden sm:inline">{open ? copy.closeLabel : copy.openLabel}</span>
        </Button>
      </div>
    </>
  );
}

/** Restadigi sales / customer-service bot — every page, bottom right */
export const OPEN_SALES_CHAT_EVENT = "restadigi:open-sales-chat";

export function openSalesChatbot() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_SALES_CHAT_EVENT));
}

export function ChatbotWidget() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/dashboard")) return null;
  return <ChatbotPanel mode="sales" placement="floating" />;
}

/** Table booking demo bot — only on pöytävarauspalvelu hero */
export function BookingChatbotButton({ className }: { className?: string }) {
  return <ChatbotPanel mode="reservation" placement="inline" className={className} />;
}
