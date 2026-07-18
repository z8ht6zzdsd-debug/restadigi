import { createFileRoute } from "@tanstack/react-router";
import { Server, ShieldCheck } from "lucide-react";
import heroHostingServers from "@/assets/hero-hosting-servers.png";
import heroHostingRacks from "@/assets/hero-hosting-racks.png";
import heroHostingDevices from "@/assets/hero-hosting-devices.png";
import pkgHostBasic from "@/assets/pkg-host-basic.jpg";
import pkgHostPro from "@/assets/pkg-host-pro.jpg";
import { ProductPackageCards } from "@/components/product-package-cards";
import { MarketingBand } from "@/components/marketing-band";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMeta } from "@/components/page-meta";
import { useMessages } from "@/i18n";

const HOSTING_ICONS = [Server, ShieldCheck] as const;
const HOSTING_HEADER_IMAGES = [pkgHostBasic, pkgHostPro] as const;

export const Route = createFileRoute("/yllapito")({
  head: () => ({
    meta: [
      { title: "Ylläpito — Restadigi" },
      {
        name: "description",
        content:
          "Hosting- ja ylläpitopaketit yrityksille — nopea hosting Suomessa, domain, SSL ja jatkuva tuki.",
      },
      { property: "og:title", content: "Ylläpito — Restadigi" },
      {
        property: "og:description",
        content: "Hosting- ja ylläpitopaketit: Basic ja Pro Business.",
      },
    ],
  }),
  component: YllapitoPage,
});

function YllapitoPage() {
  const t = useMessages();
  const h = t.hosting;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <PageMeta
        title={h.meta.title}
        description={h.meta.description}
        ogTitle={h.meta.ogTitle}
        ogDescription={h.meta.ogDescription}
      />
      <SiteHeader />

      <section className="relative isolate overflow-hidden bg-[#432f24] text-white">
        {/* Floating AI orbs in the background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="hosting-ai-orb hosting-ai-orb--1" />
          <span className="hosting-ai-orb hosting-ai-orb--2" />
          <span className="hosting-ai-orb hosting-ai-orb--3" />
          <span className="hosting-ai-bot hosting-ai-bot--1" />
          <span className="hosting-ai-bot hosting-ai-bot--2" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:gap-14 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:px-12 lg:py-20 xl:px-16">
          <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none lg:pl-6 xl:pl-10">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.35rem]">
              {h.hero.titleBefore}
              <span className="font-serif italic text-accent">{h.hero.titleAccent}</span>
              {h.hero.titleAfter}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base">
              {h.hero.description}
            </p>
            <ul className="mt-7 space-y-2.5 text-sm text-white/90 sm:text-[0.95rem]">
              {h.hero.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#hosting-paketit"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              {h.hero.compareCta}
            </a>
          </div>

          <div className="relative mx-auto flex w-full max-w-[22rem] items-center justify-center sm:max-w-[26rem] lg:max-w-none lg:justify-center">
            <div className="relative aspect-square w-full max-w-[22rem] sm:max-w-[24rem]">
              {/* Three smaller overlapping circles — each with own graphic */}
              <div className="hosting-ball hosting-ball--main">
                <img
                  src={heroHostingServers}
                  alt=""
                  aria-hidden
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="hosting-ball hosting-ball--top">
                <img
                  src={heroHostingRacks}
                  alt=""
                  aria-hidden
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="hosting-ball hosting-ball--bottom">
                <img
                  src={heroHostingDevices}
                  alt=""
                  aria-hidden
                  className="size-full object-cover object-center"
                />
              </div>
              <span className="hosting-ai-float hosting-ai-float--a" aria-hidden />
              <span className="hosting-ai-float hosting-ai-float--b" aria-hidden />
              <span className="hosting-ai-float hosting-ai-float--c" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <MarketingBand>
        <ProductPackageCards
          embedded
          sectionId="hosting-paketit"
          title={h.packagesTitle}
          explore={h.explore}
          popular={h.popular}
          requestQuote={h.requestQuote}
          closeLabel={t.widget.sales.closeLabel}
          packages={h.packages.map((pkg, i) => ({
            ...pkg,
            icon: HOSTING_ICONS[i],
            headerImage: HOSTING_HEADER_IMAGES[i],
          }))}
          footnote={h.footnote}
        />
      </MarketingBand>

      <section className="bg-background">
        <SiteFooter />
      </section>
    </div>
  );
}
