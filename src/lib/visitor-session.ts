export const VISITOR_SESSION_KEY = "restadigi_visitor_session";
export const CHAT_SESSION_KEY = "restadigi_chat_session";

export function getOrCreateVisitorSessionId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_SESSION_KEY, id);
  }
  return id;
}

export function getChatSessionId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CHAT_SESSION_KEY);
}

export function setChatSessionId(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAT_SESSION_KEY, id);
}
