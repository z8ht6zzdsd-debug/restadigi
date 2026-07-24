import { createFileRoute } from "@tanstack/react-router";
import { Check, Loader2, Send } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import restadigiLogo from "@/assets/restadigi-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BUDGET_OPTIONS,
  FORM_SERVICE_GROUPS,
  FORM_SERVICE_OPTIONS,
  INDUSTRY_OPTIONS,
  TIMELINE_OPTIONS,
  type FormServiceOption,
} from "@/lib/form-services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/form")({
  head: () => ({
    meta: [
      { title: "Restadigi — Palvelupyyntö" },
      {
        name: "description",
        content:
          "Kerro yrityksestäsi ja valitse Restadigin palvelut. Saat meiltä räätälöidyn ehdotuksen ja demon.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ServiceIntakeFormPage,
});

type FormState = {
  contactName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  city: string;
  websiteUrl: string;
  socialLinks: string;
  languages: string;
  preferredContact: "phone" | "email" | "whatsapp" | "any";
  serviceIds: string[];
  businessDescription: string;
  targetCustomers: string;
  desiredPages: string;
  brandNotes: string;
  hasLogo: "yes" | "no" | "need";
  openingHours: string;
  menuOrServices: string;
  domainStatus: "have" | "need" | "unsure";
  timeline: string;
  budget: string;
  extraNotes: string;
};

const INITIAL: FormState = {
  contactName: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  city: "",
  websiteUrl: "",
  socialLinks: "",
  languages: "suomi",
  preferredContact: "any",
  serviceIds: [],
  businessDescription: "",
  targetCustomers: "",
  desiredPages: "",
  brandNotes: "",
  hasLogo: "need",
  openingHours: "",
  menuOrServices: "",
  domainStatus: "unsure",
  timeline: "",
  budget: "",
  extraNotes: "",
};

function toggleService(current: string[], option: FormServiceOption) {
  const selected = new Set(current);
  const isOn = selected.has(option.id);

  if (option.exclusiveGroup) {
    for (const other of FORM_SERVICE_OPTIONS) {
      if (other.exclusiveGroup === option.exclusiveGroup) selected.delete(other.id);
    }
  }

  if (isOn) selected.delete(option.id);
  else selected.add(option.id);

  return [...selected];
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a7f74]">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-[#8a7f74]">{hint}</p> : null}
    </div>
  );
}

function Section({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#e8dfd4] bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 border-b border-[#e8dfd4] pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c46a32]">
          {step}
        </p>
        <h2 className="mt-2 font-serif text-2xl tracking-tight text-[#2a2018]">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c534c]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ServiceIntakeFormPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const selectedLabels = useMemo(() => {
    const map = new Map(FORM_SERVICE_OPTIONS.map((s) => [s.id, s.name]));
    return form.serviceIds.map((id) => map.get(id) ?? id);
  }, [form.serviceIds]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.serviceIds.length === 0) {
      setError("Valitse vähintään yksi palvelu.");
      return;
    }
    if (form.businessDescription.trim().length < 20) {
      setError("Kerro yrityksestäsi hieman tarkemmin (vähintään muutama lause).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/form/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Lähetys epäonnistui");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lähetys epäonnistui");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#f3eee8]">
        <header className="border-b border-[#e8dfd4] bg-[#2a2018] px-6 py-5">
          <img
            src={restadigiLogo}
            alt="Restadigi Finland"
            className="h-12 w-auto rounded-lg bg-white px-2 py-1"
          />
        </header>
        <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#c46a32] text-white">
            <Check className="size-7" />
          </div>
          <h1 className="mt-6 font-serif text-3xl text-[#2a2018]">Kiitos pyynnöstäsi</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#5c534c]">
            Vastaanotimme tietosi. Käymme ne läpi ja palaamme asiaan pian — usein jo saman päivän
            aikana. Tarvittaessa rakennamme sinulle demon valitsemiesi palveluiden pohjalta.
          </p>
          <a
            href="https://www.restadigi.fi"
            className="mt-8 text-sm font-semibold text-[#c46a32] underline-offset-4 hover:underline"
          >
            Palaa restadigi.fi-sivustolle
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3eee8] text-[#1a1512]">
      <header className="border-b border-white/10 bg-[#2a2018] px-6 py-6">
        <div className="mx-auto flex max-w-3xl flex-wrap items-end justify-between gap-4">
          <div>
            <img
              src={restadigiLogo}
              alt="Restadigi Finland"
              className="h-12 w-auto rounded-lg bg-white px-2 py-1 shadow-sm"
            />
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8a05a]">
              Palvelupyyntö
            </p>
            <h1 className="mt-1 font-serif text-3xl tracking-tight text-white sm:text-4xl">
              Kerro mitä tarvitset
            </h1>
          </div>
          <p className="max-w-xs text-right text-xs leading-relaxed text-white/65">
            form.restadigi.fi · tiedot menevät suoraan Restadigille demoa ja tarjousta varten
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-sm leading-relaxed text-[#5c534c]">
          Valitse palvelut ja täytä yritystiedot mahdollisimman tarkasti. Mitä enemmän kerrot, sitä
          nopeammin voimme rakentaa juuri teille sopivan demon ja toteutuksen.
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
          <Section
            step="1 · Yhteystiedot"
            title="Kuka olet ja mikä yritys"
            description="Perustiedot, joilla otamme sinuun yhteyttä ja tunnistamme yrityksesi."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Yhteyshenkilö *">
                <Input
                  required
                  value={form.contactName}
                  onChange={(e) => update("contactName", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Yritys / ravintola *">
                <Input
                  required
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Sähköposti *">
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Puhelin *">
                <Input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Toimiala *">
                <select
                  required
                  value={form.industry}
                  onChange={(e) => update("industry", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-[#e8dfd4] bg-[#fbf8f4] px-3 text-sm"
                >
                  <option value="">Valitse…</option>
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Paikkakunta">
                <Input
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Nykyinen verkkosivusto" hint="Jos on — muuten jätä tyhjäksi.">
                <Input
                  value={form.websiteUrl}
                  onChange={(e) => update("websiteUrl", e.target.value)}
                  placeholder="https://"
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Some-tilit" hint="Instagram, Facebook, Google Maps…">
                <Input
                  value={form.socialLinks}
                  onChange={(e) => update("socialLinks", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Sivuston kielet">
                <Input
                  value={form.languages}
                  onChange={(e) => update("languages", e.target.value)}
                  placeholder="esim. suomi, englanti"
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Toivottu yhteydenottotapa">
                <select
                  value={form.preferredContact}
                  onChange={(e) =>
                    update("preferredContact", e.target.value as FormState["preferredContact"])
                  }
                  className="flex h-9 w-full rounded-md border border-[#e8dfd4] bg-[#fbf8f4] px-3 text-sm"
                >
                  <option value="any">Mikä tahansa</option>
                  <option value="phone">Puhelin</option>
                  <option value="email">Sähköposti</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </Field>
            </div>
          </Section>

          <Section
            step="2 · Palvelut"
            title="Mitä haluat tilata"
            description="Valitse yksi verkkosivupaketti ja/tai lisäpalveluita. Voit valita useita kategoriasta riippuen."
          >
            <div className="space-y-8">
              {FORM_SERVICE_GROUPS.map((group) => {
                const options = FORM_SERVICE_OPTIONS.filter((s) => s.group === group.id);
                return (
                  <div key={group.id}>
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-[#432f24]">{group.title}</h3>
                      <p className="text-xs text-[#8a7f74]">{group.hint}</p>
                    </div>
                    <div className="grid gap-3">
                      {options.map((option) => {
                        const active = form.serviceIds.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              update("serviceIds", toggleService(form.serviceIds, option))
                            }
                            className={cn(
                              "rounded-xl border px-4 py-3 text-left transition",
                              active
                                ? "border-[#c46a32] bg-[#fff7f0] shadow-[inset_3px_0_0_#c46a32]"
                                : "border-[#e8dfd4] bg-[#fbf8f4] hover:border-[#c46a32]/50",
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-medium text-[#2a2018]">{option.name}</p>
                                <p className="mt-1 text-xs leading-relaxed text-[#5c534c]">
                                  {option.blurb}
                                </p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="text-sm font-semibold text-[#c46a32]">
                                  {option.price}
                                </p>
                                {active ? (
                                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#c46a32]">
                                    <Check className="size-3" /> Valittu
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedLabels.length > 0 ? (
              <p className="mt-5 rounded-lg bg-[#2a2018] px-4 py-3 text-xs text-white/85">
                Valittuna: {selectedLabels.join(" · ")}
              </p>
            ) : null}
          </Section>

          <Section
            step="3 · Demo & sisältö"
            title="Tiedot demoa ja toteutusta varten"
            description="Nämä auttavat meitä rakentamaan sivuston, botin tai varauksen suoraan teidän yrityksellenne."
          >
            <div className="space-y-5">
              <Field
                label="Kerro yrityksestäsi *"
                hint="Mitä teette, kenelle, mikä tekee teistä erityisiä?"
              >
                <Textarea
                  required
                  rows={5}
                  value={form.businessDescription}
                  onChange={(e) => update("businessDescription", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field label="Kohderyhmä">
                <Textarea
                  rows={2}
                  value={form.targetCustomers}
                  onChange={(e) => update("targetCustomers", e.target.value)}
                  placeholder="esim. paikalliset lounasasiakkaat, matkailijat…"
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field
                label="Toivotut sivut / osiot"
                hint="esim. Etusivu, Menu, Tapahtumat, Galleria, Yhteystiedot…"
              >
                <Textarea
                  rows={3}
                  value={form.desiredPages}
                  onChange={(e) => update("desiredPages", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Brändivärit / tyyli" hint="Hex-koodit tai kuvaus.">
                  <Textarea
                    rows={2}
                    value={form.brandNotes}
                    onChange={(e) => update("brandNotes", e.target.value)}
                    className="border-[#e8dfd4] bg-[#fbf8f4]"
                  />
                </Field>
                <Field label="Onko logo valmis?">
                  <select
                    value={form.hasLogo}
                    onChange={(e) => update("hasLogo", e.target.value as FormState["hasLogo"])}
                    className="flex h-9 w-full rounded-md border border-[#e8dfd4] bg-[#fbf8f4] px-3 text-sm"
                  >
                    <option value="yes">Kyllä, logo on valmis</option>
                    <option value="no">Ei logoa vielä</option>
                    <option value="need">Tarvitsen logosuunnittelun</option>
                  </select>
                </Field>
              </div>
              <Field label="Aukioloajat" hint="Tärkeä chatbotille ja varaukselle.">
                <Textarea
                  rows={2}
                  value={form.openingHours}
                  onChange={(e) => update("openingHours", e.target.value)}
                  placeholder="esim. ma–pe 11–22, la–su 12–24"
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <Field
                label="Palvelut / menu / tuotteet"
                hint="Listaa tärkeimmät — riittää lyhyesti demoa varten."
              >
                <Textarea
                  rows={4}
                  value={form.menuOrServices}
                  onChange={(e) => update("menuOrServices", e.target.value)}
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Domain">
                  <select
                    value={form.domainStatus}
                    onChange={(e) =>
                      update("domainStatus", e.target.value as FormState["domainStatus"])
                    }
                    className="flex h-9 w-full rounded-md border border-[#e8dfd4] bg-[#fbf8f4] px-3 text-sm"
                  >
                    <option value="have">Minulla on jo domain</option>
                    <option value="need">Tarvitsen domainin</option>
                    <option value="unsure">En ole varma</option>
                  </select>
                </Field>
                <Field label="Aikataulu *">
                  <select
                    required
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className="flex h-9 w-full rounded-md border border-[#e8dfd4] bg-[#fbf8f4] px-3 text-sm"
                  >
                    <option value="">Valitse…</option>
                    {TIMELINE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Budjetti *">
                  <select
                    required
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    className="flex h-9 w-full rounded-md border border-[#e8dfd4] bg-[#fbf8f4] px-3 text-sm"
                  >
                    <option value="">Valitse…</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Lisätietoja meille">
                <Textarea
                  rows={4}
                  value={form.extraNotes}
                  onChange={(e) => update("extraNotes", e.target.value)}
                  placeholder="Kilpailijat, toiveet, erikoisuudet, kuvat…"
                  className="border-[#e8dfd4] bg-[#fbf8f4]"
                />
              </Field>
            </div>
          </Section>

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 rounded-2xl border border-[#e8dfd4] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-[#5c534c]">
              Lähettämällä hyväksyt, että Restadigi ottaa sinuun yhteyttä tarjouksen ja demon
              tiimoilta. Emme myy tietojasi eteenpäin.
            </p>
            <Button
              type="submit"
              disabled={submitting}
              className="shrink-0 bg-[#c46a32] px-6 text-white hover:bg-[#b35d29]"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Lähetetään…
                </>
              ) : (
                <>
                  <Send className="size-4" /> Lähetä palvelupyyntö
                </>
              )}
            </Button>
          </div>
        </form>
      </main>

      <footer className="border-t border-[#e8dfd4] px-6 py-8 text-center text-xs text-[#8a7f74]">
        Restadigi Finland · Erkkiläntie 47, Mäntsälä · info@restadigi.fi
      </footer>
    </div>
  );
}
