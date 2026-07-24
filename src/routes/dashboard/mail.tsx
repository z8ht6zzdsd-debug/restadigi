import { createFileRoute } from "@tanstack/react-router";
import { Eye, FileText, Mail, RefreshCw, Save, Send, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { MailEsikatseluPreview } from "@/components/mail-esikatselu-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fillDashboardUi, localeDateTag, useDashboardUi, useLocale } from "@/i18n";
import {
  applyMailPlaceholders,
  MAIL_TEMPLATE_DEFAULTS,
  MAIL_TEMPLATE_IDS,
  type MailTemplateId,
} from "@/lib/mail-template";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/mail")({
  component: DashboardMailPage,
});

type LogicalSlot = "pdf1" | "pdf2";

type AttachmentMeta = {
  slot: LogicalSlot;
  physicalSlot?: string;
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
  templateId?: string;
};

type MailStats = {
  total: number;
  sent: number;
  failed: number;
  opened: number;
};

function formatBytes(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} kt`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mt`;
}

function DashboardMailPage() {
  const t = useDashboardUi();
  const { locale } = useLocale();
  const dateLocale = localeDateTag(locale);
  const [activeType, setActiveType] = useState<MailTemplateId>("default");
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);
  const [emails, setEmails] = useState<OutboundEmail[]>([]);
  const [stats, setStats] = useState<MailStats>({ total: 0, sent: 0, failed: 0, opened: 0 });
  const [subject, setSubject] = useState(MAIL_TEMPLATE_DEFAULTS.default.subject);
  const [body, setBody] = useState(MAIL_TEMPLATE_DEFAULTS.default.body);
  const [templateUpdatedAt, setTemplateUpdatedAt] = useState<string | null>(null);
  const [requireAttachments, setRequireAttachments] = useState(true);
  const [toEmail, setToEmail] = useState("");
  const [toName, setToName] = useState("");
  const [company, setCompany] = useState("");
  const [previewFirstName, setPreviewFirstName] = useState("Jani");
  const [previewCompany, setPreviewCompany] = useState("Oluthuone Hannikainen");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [seedingDefaults, setSeedingDefaults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabLabels: Record<MailTemplateId, string> = {
    default: t.mail.tabAfterCall,
    cold: t.mail.tabCold,
    order: t.mail.tabOrder,
    free: t.mail.tabFree,
  };

  const slotLabels: Record<LogicalSlot, string> = {
    pdf1: t.mail.pdf1,
    pdf2: t.mail.pdf2,
  };

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(`/api/dashboard/mail?type=${activeType}`, {
        credentials: "include",
      });
      const data = (await res.json()) as {
        emails?: OutboundEmail[];
        attachments?: AttachmentMeta[];
        stats?: MailStats;
        template?: { subject: string; body: string; updatedAt: string | null };
        meta?: { requireAttachments?: boolean };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? t.mail.title);
      setEmails(data.emails ?? []);
      setAttachments(data.attachments ?? []);
      setStats(data.stats ?? { total: 0, sent: 0, failed: 0, opened: 0 });
      setRequireAttachments(
        data.meta?.requireAttachments ?? MAIL_TEMPLATE_DEFAULTS[activeType].requireAttachments,
      );
      if (data.template) {
        setSubject(data.template.subject);
        setBody(data.template.body);
        setTemplateUpdatedAt(data.template.updatedAt);
      } else {
        const defaults = MAIL_TEMPLATE_DEFAULTS[activeType];
        setSubject(defaults.subject);
        setBody(defaults.body);
        setTemplateUpdatedAt(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.mail.title);
    } finally {
      setLoading(false);
    }
  }, [activeType, t.mail.title]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  const filledSubject = useMemo(
    () =>
      applyMailPlaceholders(subject, {
        firstName: previewFirstName,
        company: previewCompany,
      }),
    [subject, previewFirstName, previewCompany],
  );

  const filledBody = useMemo(
    () =>
      applyMailPlaceholders(body, {
        firstName: previewFirstName,
        company: previewCompany,
      }),
    [body, previewFirstName, previewCompany],
  );

  async function handleUpload(slot: LogicalSlot, file: File | undefined) {
    if (!file) return;
    setUploadingSlot(slot);
    try {
      const form = new FormData();
      form.set("slot", slot);
      form.set("type", activeType);
      form.set("file", file);
      const res = await fetch("/api/dashboard/mail/attachments", {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      toast.success(t.mail.upload);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.mail.upload);
    } finally {
      setUploadingSlot(null);
    }
  }

  async function handleDelete(slot: LogicalSlot) {
    try {
      const res = await fetch(`/api/dashboard/mail/attachments?slot=${slot}&type=${activeType}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Poisto epäonnistui");
      toast.success(t.common.delete);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.common.delete);
    }
  }

  async function handleSeedDefaults() {
    setSeedingDefaults(true);
    try {
      const res = await fetch("/api/dashboard/mail/attachments", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed-defaults", type: activeType }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? t.mail.seedingDefaults);
      toast.success(t.mail.defaultsUpdated);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.mail.seedingDefaults);
    } finally {
      setSeedingDefaults(false);
    }
  }

  async function handleSaveTemplate() {
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard/mail", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeType, subject, body }),
      });
      const data = (await res.json()) as {
        template?: { updatedAt: string | null; subject?: string; body?: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Tallennus epäonnistui");
      if (data.template?.subject) setSubject(data.template.subject);
      if (data.template?.body) setBody(data.template.body);
      setTemplateUpdatedAt(data.template?.updatedAt ?? null);
      toast.success(t.mail.saveTemplate);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.common.save);
    } finally {
      setSaving(false);
    }
  }

  async function handleRestoreDefaultTemplate() {
    setSubject(DEFAULT_MAIL_SUBJECT);
    setBody(DEFAULT_MAIL_BODY_FI);
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard/mail", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: DEFAULT_MAIL_SUBJECT,
          body: DEFAULT_MAIL_BODY_FI,
        }),
      });
      const data = (await res.json()) as {
        template?: { updatedAt: string | null; subject?: string; body?: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Tallennus epäonnistui");
      if (data.template?.subject) setSubject(data.template.subject);
      if (data.template?.body) setBody(data.template.body);
      setTemplateUpdatedAt(data.template?.updatedAt ?? null);
      toast.success("Oletuspohja tallennettu");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.common.save);
    } finally {
      setSaving(false);
    }
  }

  async function handleSend(opts: { test: boolean }) {
    if (!toEmail.trim()) {
      toast.error(t.mail.toEmail);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/dashboard/mail", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail,
          toName: toName || previewFirstName,
          company: company || previewCompany,
          subject,
          body,
          test: opts.test,
          type: activeType,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Lähetys epäonnistui");
      toast.success(`${opts.test ? t.mail.sendTest : t.mail.sendCustomer}: ${toEmail}`);
      if (!opts.test) {
        setToEmail("");
        setToName("");
        setCompany("");
      }
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.mail.sendCustomer);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">{t.common.loading}</p>;
  }

  if (error && attachments.length === 0 && emails.length === 0) {
    return (
      <div className="rounded-sm border border-destructive/30 bg-destructive/5 p-4 text-sm">
        {error}
        <p className="mt-2 text-muted-foreground">{t.mail.dbHint}</p>
      </div>
    );
  }

  const openRate = stats.sent > 0 ? Math.round((stats.opened / stats.sent) * 100) : 0;
  const uploadedCount = attachments.filter((a) => a.hasFile).length;
  const pdfReady = requireAttachments ? uploadedCount >= 2 : true;
  const canSendCustomer = !sending && pdfReady;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="dashboard-app__page-head">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c46a32]">
            {t.mail.eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-3xl tracking-tight text-[#2a2018]">{t.mail.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#5c534c]">{t.mail.subtitle}</p>
          {templateUpdatedAt ? (
            <p className="mt-1 text-xs text-[#8a7f74]">
              {fillDashboardUi(t.mail.templateSaved, {
                date: new Date(templateUpdatedAt).toLocaleString(dateLocale),
              })}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => void handleRestoreDefaultTemplate()}
            disabled={saving}
          >
            <RefreshCw className="size-4" />
            Palauta oletuspohja
          </Button>
          <Button type="button" onClick={() => void handleSaveTemplate()} disabled={saving}>
            <Save className="size-4" />
            {saving ? t.common.saving : t.mail.saveTemplate}
          </Button>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-1 rounded-2xl border border-[#e8dfd4] bg-white/70 p-1.5 shadow-sm"
        role="tablist"
        aria-label={t.mail.title}
      >
        {MAIL_TEMPLATE_IDS.map((id) => {
          const active = activeType === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveType(id)}
              className={cn(
                "rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all sm:px-4",
                active
                  ? "bg-[#432f24] text-white shadow-md"
                  : "text-[#5c534c] hover:bg-[#f3eee8] hover:text-[#2a2018]",
              )}
            >
              {tabLabels[id]}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[#5c534c]">{t.mail.tabHints[activeType]}</p>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: t.mail.statsSent, value: stats.sent },
          { label: t.mail.statsOpened, value: stats.opened },
          { label: t.mail.statsOpenRate, value: `${openRate} %` },
          { label: t.mail.statsFailed, value: stats.failed },
        ].map((card) => (
          <div key={card.label} className="dashboard-app__stat-card">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a7f74]">
              {card.label}
            </p>
            <p className="mt-2 font-serif text-3xl tabular-nums text-[#2a2018]">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-accent" />
          <h3 className="font-medium">{t.mail.attachments}</h3>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm text-foreground/70">
            {requireAttachments ? t.mail.attachmentsHintRequired : t.mail.attachmentsHintOptional}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            disabled={seedingDefaults}
            onClick={() => void handleSeedDefaults()}
          >
            <RefreshCw className={cn("size-3.5", seedingDefaults && "animate-spin")} />
            {seedingDefaults ? t.mail.seedingDefaults : t.mail.useDefaultPdfs}
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {attachments.map((att) => (
            <div key={att.slot} className="space-y-3 rounded-sm border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{slotLabels[att.slot]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {att.hasFile
                      ? `${att.filename} · ${formatBytes(att.sizeBytes)}`
                      : t.mail.noFile}
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
                    {t.common.delete}
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
                  ? t.common.loading
                  : att.hasFile
                    ? t.mail.replace
                    : t.mail.upload}
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

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="space-y-5 rounded-sm border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="subject">{t.mail.subject}</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              {t.mail.placeholdersHint} <code className="rounded bg-muted px-1">[ETUNIMI]</code> ·{" "}
              <code className="rounded bg-muted px-1">[YRITYS]</code>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">{t.mail.body}</Label>
            <Textarea
              id="body"
              rows={14}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[260px] font-serif text-[15px] leading-relaxed"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="preview-first">{t.mail.previewFirstName}</Label>
              <Input
                id="preview-first"
                value={previewFirstName}
                onChange={(e) => setPreviewFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preview-company">{t.mail.previewCompany}</Label>
              <Input
                id="preview-company"
                value={previewCompany}
                onChange={(e) => setPreviewCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-5">
            <div className="flex items-center gap-2">
              <Send className="size-4 text-accent" />
              <h3 className="font-medium">{t.mail.sendSection}</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="toEmail">{t.mail.toEmail}</Label>
                <Input
                  id="toEmail"
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  placeholder="oma@restadigi.fi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toName">{t.mail.name}</Label>
                <Input
                  id="toName"
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="Jani"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">{t.mail.company}</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Oluthuone Hannikainen"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={sending}
                onClick={() => void handleSend({ test: true })}
              >
                <Mail className="size-4" />
                {sending ? t.common.saving : t.mail.sendTest}
              </Button>
              <Button
                type="button"
                disabled={!canSendCustomer}
                onClick={() => void handleSend({ test: false })}
              >
                <Send className="size-4" />
                {t.mail.sendCustomer}
              </Button>
            </div>
            {requireAttachments && !pdfReady ? (
              <p className="text-xs text-muted-foreground">{t.mail.customerNeedsPdfs}</p>
            ) : (
              <p className="text-xs text-muted-foreground">{t.mail.visualTemplateNote}</p>
            )}
          </div>
        </section>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {t.mail.preview}
          </p>
          <MailEsikatseluPreview subject={filledSubject} bodyText={filledBody} />
          {attachments.some((a) => a.hasFile) ? (
            <p className="text-xs text-muted-foreground">
              {t.mail.attachmentsInSend}:{" "}
              {attachments
                .filter((a) => a.hasFile)
                .map((a) => a.filename)
                .join(", ")}
            </p>
          ) : null}
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Eye className="size-4 text-accent" />
          <h3 className="font-medium">
            {t.mail.sentList} · {tabLabels[activeType]}
          </h3>
        </div>
        {emails.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t.mail.emptySent}</p>
        ) : (
          <div className="overflow-x-auto rounded-sm border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">{t.mail.toEmail}</th>
                  <th className="px-3 py-2 font-medium">{t.mail.subject}</th>
                  <th className="px-3 py-2 font-medium">{t.mail.status}</th>
                  <th className="px-3 py-2 font-medium">{t.mail.opens}</th>
                  <th className="px-3 py-2 font-medium">{t.mail.sentAt}</th>
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
                    <td className="max-w-[220px] truncate px-3 py-2">{email.subject}</td>
                    <td className="px-3 py-2">
                      <span
                        className={cn(
                          "rounded-sm px-2 py-0.5 text-xs",
                          email.status === "sent"
                            ? "bg-accent/15 text-accent"
                            : "bg-destructive/10 text-destructive",
                        )}
                      >
                        {email.status === "sent" ? t.mail.statsSent : t.mail.statsFailed}
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
                              {new Date(email.lastOpenedAt).toLocaleString(dateLocale)}
                            </span>
                          ) : null}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{t.mail.notOpened}</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">
                      {new Date(email.sentAt).toLocaleString(dateLocale)}
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
