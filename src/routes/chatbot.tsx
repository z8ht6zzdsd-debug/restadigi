import { createFileRoute, Link } from "@tanstack/react-router";
import heroAiService from "@/assets/hero-ai-service.jpg";
import { DashboardMonitorPreview } from "@/components/dashboard-monitor-preview";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI-asiakaspalvelu — Restadigi" },
      {
        name: "description",
        content:
          "Älykäs chatbot verkkosivustollesi ja AI Concierge puhelinpalvelu ravintolalle — palvelee asiakkaita 24/7, vastaanottaa varauksia ja vapauttaa henkilökunnan.",
      },
      { property: "og:title", content: "AI-asiakaspalvelu — Restadigi" },
      {
        property: "og:description",
        content:
          "Chatbot verkkosivuille ja tekoälypohjainen puhelinpalvelu — ympärivuorokautinen asiakaspalvelu ravintolalle.",
      },
    ],
  }),
  component: ChatbotPage,
});

function ChatbotPage() {
  const t = useMessages();
  const cb = t.chatbot;
  const bot = cb.chatbot;
  const concierge = cb.concierge;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={cb.meta.title}
        description={cb.meta.description}
        ogTitle={cb.meta.ogTitle}
        ogDescription={cb.meta.ogDescription}
      />
      <SiteHeader />

      <PageHero
        image={heroAiService}
        title={
          <>
            {cb.hero.titleBefore}
            <span className="font-serif italic text-accent">{cb.hero.titleAccent}</span>
            {cb.hero.titleAfter}
          </>
        }
        description={cb.hero.description}
      />

      {/* Chatbot */}
      <section className="border-t border-border bg-background pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 mb-12 sm:mb-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5 mx-auto max-w-xl text-center">
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
            <div className="lg:col-span-7 flex justify-center">
              <DashboardMonitorPreview />
            </div>
          </div>
        </div>

        <div>
          {bot.benefits.map((b, i) => (
            <div
              key={b.title}
              className={
                "w-full px-6 py-10 sm:py-12 " + (i % 2 === 1 ? "bg-secondary/50" : "bg-background")
              }
            >
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
                <h3 className="text-2xl font-medium md:w-72 shrink-0 mb-3 md:mb-0">{b.title}</h3>
                <p className="text-sm text-foreground/75 leading-relaxed flex-1">{b.body}</p>
              </div>
            </div>
          ))}
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

        <div>
          {bot.monthly.map((m, i) => (
            <div
              key={m.title}
              className={
                "w-full px-6 py-10 sm:py-12 " + (i % 2 === 1 ? "bg-secondary/50" : "bg-background")
              }
            >
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
                <h3 className="text-2xl font-medium md:w-72 shrink-0 mb-3 md:mb-0">{m.title}</h3>
                <p className="text-sm text-foreground/75 leading-relaxed flex-1">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Concierge */}
      <section className="pb-8 sm:pb-12 bg-secondary/50 pt-16 sm:pt-24">
        <div className="max-w-6xl mx-auto px-6 mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8">
            {concierge.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium text-balance max-w-[24ch] mb-8 tracking-tight">
            {concierge.titleBefore}
            <span className="font-serif italic text-accent">{concierge.titleAccent}</span>
            {concierge.titleAfter}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-foreground/70 leading-relaxed">
            {concierge.intro}
          </p>
        </div>

        <div>
          {concierge.features.map((feature, i) => (
            <div
              key={feature}
              className={
                "w-full px-6 py-6 sm:py-8 " + (i % 2 === 0 ? "bg-background" : "bg-secondary/50")
              }
            >
              <div className="max-w-6xl mx-auto flex gap-3 text-sm text-foreground/75 leading-relaxed">
                <span className="size-1.5 rounded-full mt-2 shrink-0 bg-accent" />
                {feature}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <ul className="space-y-4 max-w-3xl">
            {concierge.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-base text-foreground/75 leading-relaxed">
                <span className="text-accent shrink-0">✔</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full px-6 py-16 sm:py-24 bg-background">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
            <div className="md:w-80 shrink-0 mb-8 md:mb-0">
              <h3 className="text-3xl sm:text-4xl leading-[1.1] font-medium tracking-tight text-balance mb-6">
                {concierge.audienceTitleBefore}
                <span className="font-serif italic">{concierge.audienceTitleAccent}</span>
                {concierge.audienceTitleAfter}
              </h3>
              <p className="text-base text-foreground/70 leading-relaxed">
                {concierge.audienceBody}
              </p>
            </div>
            <ul className="flex-1 space-y-4">
              {concierge.audience.map((item) => (
                <li key={item} className="text-sm text-foreground/75">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full px-6 py-16 sm:py-24 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
            <div className="md:w-80 shrink-0 mb-8 md:mb-0">
              <p className="text-3xl font-serif mb-4">{concierge.price}</p>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                {concierge.priceBody}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary-foreground/70 mb-4">
                {concierge.priceIncludesLabel}
              </p>
              <ul className="space-y-3">
                {concierge.pricingIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-primary-foreground/85">
                    <span className="size-1.5 rounded-full mt-2 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-primary-foreground/60 mt-6 leading-relaxed">
                {concierge.pricingNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
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
