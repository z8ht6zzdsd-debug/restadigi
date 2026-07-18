import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Clock,
  Database,
  KeyRound,
  LineChart,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroAiService from "@/assets/hero-ai-service.jpg";
import { openSalesChatbot } from "@/components/chatbot-widget";
import { DashboardMonitorPreview } from "@/components/dashboard-monitor-preview";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI-asiakaspalvelu — Restadigi" },
      {
        name: "description",
        content:
          "Älykäs chatbot verkkosivustollesi — palvelee asiakkaita 24/7, vastaa kysymyksiin, kerää liidejä ja vapauttaa henkilökunnan.",
      },
      { property: "og:title", content: "AI-asiakaspalvelu — Restadigi" },
      {
        property: "og:description",
        content: "Chatbot verkkosivuille — ympärivuorokautinen myynti ja asiakaspalvelu.",
      },
    ],
  }),
  component: ChatbotPage,
});

const FEATURE_ICONS: LucideIcon[] = [
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Database,
  LineChart,
  KeyRound,
];

function ChatbotPage() {
  const t = useMessages();
  const cb = t.chatbot;
  const bot = cb.chatbot;
  const featureBoxes = [...bot.benefits, ...bot.monthly];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={cb.meta.title}
        description={cb.meta.description}
        ogTitle={cb.meta.ogTitle}
        ogDescription={cb.meta.ogDescription}
      />
      <SiteHeader />

      <section className="w-full bg-background px-6 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] sm:aspect-[5/3]">
              <img
                src={heroAiService}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-[#432f24]/25" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
                <div className="w-[92%] max-w-2xl rounded-3xl bg-[#432f24]/92 px-6 py-8 text-center shadow-lg sm:px-10 sm:py-10">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <span
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/35 sm:size-12"
                      aria-hidden
                    >
                      <Bot className="size-5 sm:size-6" strokeWidth={1.75} />
                    </span>
                    <h2 className="text-left text-2xl font-medium leading-[1.1] tracking-tight text-[#f7f3ee] sm:text-4xl lg:text-[2.75rem]">
                      {cb.hero.titleBefore}
                      <span className="font-serif italic text-accent">{cb.hero.titleAccent}</span>
                      {cb.hero.titleAfter}
                    </h2>
                  </div>
                  <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#f7f3ee]/85 sm:text-base">
                    {cb.hero.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-2">
            <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              <span className="block">{cb.hero.headlineLine1}</span>
              <span className="block">{cb.hero.headlineLine2}</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
              {cb.hero.subtitle}
            </p>
            <button
              type="button"
              onClick={() => openSalesChatbot()}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
            >
              {cb.hero.cta}
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <section className="border-t border-border bg-background pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 mb-14 sm:mb-20">
          <div className="mx-auto flex w-fit max-w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12">
            <div className="w-full max-w-md text-center lg:text-left">
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">
                {bot.eyebrow}
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-[2.85rem] xl:text-5xl leading-[1.05] font-medium text-balance mb-6 tracking-tight">
                {bot.titleBefore}
                <span className="font-serif italic text-accent">{bot.titleAccent}</span>
                {bot.titleAfter}
              </h2>
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed text-pretty">
                {bot.intro}
              </p>
            </div>
            <div className="w-full max-w-md shrink-0">
              <DashboardMonitorPreview />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-8 sm:pb-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureBoxes.map((item, i) => {
              const Icon = FEATURE_ICONS[i] ?? Sparkles;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-sm border border-border/80 bg-[#f7f5f2] p-6 transition-colors hover:border-accent/40"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-accent/10 transition-transform group-hover:scale-110"
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="font-serif text-2xl italic text-accent/50 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-medium tracking-tight text-balance">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/65">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h3 className="text-3xl sm:text-4xl leading-[1.1] font-medium tracking-tight text-balance">
                {bot.safeTitleBefore}
                <span className="font-serif italic">{bot.safeTitleAccent}</span>
                {bot.safeTitleAfter}
              </h3>
            </div>
            <div className="md:col-span-7">
              <p className="text-base text-foreground/70 leading-relaxed">{bot.safeBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-balance mb-8">
                {cb.cta.titleBefore}
                <span className="font-serif italic">{cb.cta.titleAccent}</span>
              </h2>
              <p className="text-base text-foreground/70 leading-relaxed max-w-2xl mb-8">
                {cb.cta.body}
              </p>
              <ul className="space-y-3 text-base text-foreground/75 max-w-2xl">
                {cb.cta.questions.map((q) => (
                  <li key={q} className="flex gap-3">
                    <span className="size-1.5 rounded-full mt-2.5 shrink-0 bg-accent" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="mb-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-serif text-4xl italic tracking-tight text-accent sm:text-5xl">
                  {cb.cta.price}
                </span>
                <span className="text-base text-foreground/55">{cb.cta.priceNote}</span>
              </p>
              <Link
                to="/yhteys"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-medium py-3 pr-4 pl-5 rounded-full hover:bg-accent transition-colors"
              >
                {cb.cta.button}
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
