import { createFileRoute } from "@tanstack/react-router";
import { Eye, FileText, Mail, Send, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/mail")({
  component: DashboardMailPage,
});

type AttachmentMeta = {
  slot: "pdf1" | "pdf2";
  filename: string | null;
  sizeBytes: number;
  updatedAt: string | null;
  hasFile: boolean;
};

type OutboundEmail = {
  id: string;
  toEmail: string;
  toName: string | null;
  subject: string;
  status: string;
  errorMessage: string | null;
  openCount: number;
  openedAt: string | null;
  lastOpenedAt: string | null;
  sentAt: string;
};

type MailStats = {
  total: number;
  sent: number;
  failed: number;
  opened: number;
};

const SLOT_LABELS: Record<AttachmentMeta["slot"], string> = {
  pdf1: "PDF 1 · Digipalvelut",
  pdf2: "PDF 2 · Verkkosivupaketit",
};

function formatBytes(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} kt`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mt`;
}

function DashboardMailPage() {
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);
  const [emails, setEmails] = useState<OutboundEmail[]>([]);
  const [stats, setStats] = useState<MailStats>({ total: 0, sent: 0, failed: 0, opened: 0 });
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [toName, setToName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/dashboard/mail", { credentials: "include" });
      const data = (await res.json()) as {
        emails?: OutboundEmail[];
        attachments?: AttachmentMeta[];
        stats?: MailStats;
        template?: { subject: string; body: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Lataus epäonnistui");
      setEmails(data.emails ?? []);
      setAttachments(data.attachments ?? []);
      setStats(data.stats ?? { total: 0, sent: 0, failed: 0, opened: 0 });
      if (data.template) {
        setSubject((prev) => prev || data.template!.subject);
        setBody((prev) => prev || data.template!.body);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Virhe");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleUpload(slot: AttachmentMeta["slot"], file: File | undefined) {
    if (!file) return;
    setUploadingSlot(slot);
    try {
      const form = new FormData();
      form.set("slot", slot);
      form.set("file", file);
      const res = await fetch("/api/dashboard/mail/attachments", {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      toast.success("PDF tallennettu");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingSlot(null);
    }
  }

  async function handleDelete(slot: AttachmentMeta["slot"]) {
    try {
      const res = await fetch(`/api/dashboard/mail/attachments?slot=${slot}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Poisto epäonnistui");
      toast.success("PDF poistettu");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Poisto epäonnistui");
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/dashboard/mail", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail, toName, subject, body }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Lähetys epäonnistui");
      toast.success(`Viesti lähetetty: ${toEmail}`);
      setToEmail("");
      setToName("");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lähetys epäonnistui");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Ladataan…</p>;
  }

  if (error) {
    return (
      <div className="rounded-sm border border-destructive/30 bg-destructive/5 p-4 text-sm">
        {error}
        <p className="mt-2 text-muted-foreground">
          Tarvitset DATABASE_URL (Neon) ja SMTP-asetukset Zohoa varten.
        </p>
      </div>
    );
  }

  const openRate = stats.sent > 0 ? Math.round((stats.opened / stats.sent) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Asiakasposti</p>
        <h2 className="mt-1 text-2xl font-medium">Sähköpostilähetys</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/70">
          Lähetä asiakkaalle kiinteä suomenkielinen viesti kahden tallennetun PDF:n kanssa. Yksi
          klikkaus — vastaanottajan osoite riittää.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Lähetetty", value: stats.sent },
          { label: "Avattu", value: stats.opened },
          { label: "Avausprosentti", value: `${openRate} %` },
          { label: "Epäonnistuneet", value: stats.failed },
        ].map((card) => (
          <div key={card.label} className="rounded-sm border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{card.label}</p>
            <p className="mt-2 text-2xl font-medium tabular-nums">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-sm border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-accent" />
          <h3 className="font-medium">PDF-liitteet (manuaalinen lataus)</h3>
        </div>
        <p className="text-sm text-foreground/70">
          Lataa molemmat PDF:t itse. Ne tallentuvat Neon-tietokantaan ja säilyvät, kunnes poistat
          tai vaihdat ne. Lähetys vaatii molemmat tiedostot.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {attachments.map((att) => (
            <div key={att.slot} className="rounded-sm border border-border p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{SLOT_LABELS[att.slot]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {att.hasFile
                      ? `${att.filename} · ${formatBytes(att.sizeBytes)}`
                      : "Ei tiedostoa — lataa PDF"}
                  </p>
                </div>
                {att.hasFile ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void handleDelete(att.slot)}
                  >
                    <Trash2 className="size-3.5" />
                    Poista
                  </Button>
                ) : null}
              </div>
              <Label
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-border px-3 py-3 text-sm hover:bg-secondary/60",
                  uploadingSlot === att.slot && "opacity-60",
                )}
              >
                <Upload className="size-4" />
                {uploadingSlot === att.slot
                  ? "Ladataan…"
                  : att.hasFile
                    ? "Vaihda PDF"
                    : "Lataa PDF"}
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  disabled={uploadingSlot === att.slot}
                  onChange={(e) => void handleUpload(att.slot, e.target.files?.[0])}
                />
              </Label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Send className="size-4 text-accent" />
          <h3 className="font-medium">Lähetä asiakkaalle</h3>
        </div>
        <form onSubmit={(e) => void handleSend(e)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="toEmail">Vastaanottajan sähköposti</Label>
              <Input
                id="toEmail"
                type="email"
                required
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                placeholder="asiakas@yritys.fi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toName">Nimi (valinnainen)</Label>
              <Input
                id="toName"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder="Matti Meikäläinen"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Aihe</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Viestipohja (suomi)</Label>
            <Textarea
              id="body"
              rows={12}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={sending || attachments.filter((a) => a.hasFile).length < 2}
          >
            <Mail className="size-4" />
            {sending ? "Lähetetään…" : "Lähetä PDF:t asiakkaalle"}
          </Button>
          {attachments.filter((a) => a.hasFile).length < 2 ? (
            <p className="text-xs text-muted-foreground">
              Lataa ensin molemmat PDF-tiedostot yläpuolelta.
            </p>
          ) : null}
        </form>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Eye className="size-4 text-accent" />
          <h3 className="font-medium">Lähetetyt viestit</h3>
        </div>
        {emails.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ei vielä lähetettyjä viestejä.</p>
        ) : (
          <div className="overflow-x-auto rounded-sm border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Vastaanottaja</th>
                  <th className="px-3 py-2 font-medium">Aihe</th>
                  <th className="px-3 py-2 font-medium">Tila</th>
                  <th className="px-3 py-2 font-medium">Avaukset</th>
                  <th className="px-3 py-2 font-medium">Lähetetty</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr key={email.id} className="border-t border-border">
                    <td className="px-3 py-2">
                      <div className="font-medium">{email.toName || email.toEmail}</div>
                      {email.toName ? (
                        <div className="text-xs text-muted-foreground">{email.toEmail}</div>
                      ) : null}
                    </td>
                    <td className="px-3 py-2 max-w-[220px] truncate">{email.subject}</td>
                    <td className="px-3 py-2">
                      <span
                        className={cn(
                          "rounded-sm px-2 py-0.5 text-xs",
                          email.status === "sent"
                            ? "bg-accent/15 text-accent"
                            : "bg-destructive/10 text-destructive",
                        )}
                      >
                        {email.status === "sent" ? "Lähetetty" : "Epäonnistui"}
                      </span>
                      {email.errorMessage ? (
                        <p className="mt-1 text-xs text-destructive">{email.errorMessage}</p>
                      ) : null}
                    </td>
                    <td className="px-3 py-2 tabular-nums">
                      {email.openCount > 0 ? (
                        <span>
                          {email.openCount}×
                          {email.lastOpenedAt ? (
                            <span className="block text-xs text-muted-foreground">
                              {new Date(email.lastOpenedAt).toLocaleString("fi-FI")}
                            </span>
                          ) : null}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Ei avattu</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">
                      {new Date(email.sentAt).toLocaleString("fi-FI")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
