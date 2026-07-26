import zenBerry from "@/assets/freddos-zen-berry-matcha.png";
import sweetVanilla from "@/assets/freddos-sweet-vanilla-cloud.png";
import iceCaramel from "@/assets/freddos-ice-golden-caramel.png";
import tiramisu from "@/assets/freddos-tiramisu.png";
import freddosLogo from "@/assets/freddos-logo-web.png";
import freddosMobileHero from "@/assets/freddos-mobile-hero.png";
import { BarberMobilePreview } from "@/components/barber-mobile-preview";

const HOME_IMAGES = [
  { label: "Freddo Tiramisu", image: tiramisu },
  { label: "Zen Berry Matcha", image: zenBerry },
  { label: "Sweet Vanilla Cloud", image: sweetVanilla },
  { label: "Ice Golden Caramel", image: iceCaramel },
] as const;

/** Apple-tyylinen MacBook + iPhone -kooste: Freddos näkyy molemmissa näytöissä. */
export function FreddosDevicesStage() {
  return (
    <div
      className="freddos-stage relative mx-auto w-full max-w-[34rem] select-none pb-2 pl-1 pt-1 sm:pb-3 sm:pl-2 lg:max-w-none"
      aria-hidden
    >
      {/* MacBook */}
      <div className="freddos-stage__laptop relative z-[1] ml-auto w-[88%] origin-bottom sm:w-[86%]">
        <div className="freddos-stage__lid overflow-hidden rounded-[0.65rem] bg-gradient-to-b from-[#4a4540] via-[#2a2622] to-[#141210] p-[0.45rem] shadow-[0_28px_70px_-18px_rgba(26,18,14,0.55)] ring-1 ring-black/25 sm:rounded-[0.85rem] sm:p-[0.55rem]">
          <span className="absolute left-1/2 top-[0.28rem] z-[2] h-[0.22rem] w-[0.22rem] -translate-x-1/2 rounded-full bg-[#0a0908] ring-1 ring-white/10 sm:top-[0.35rem]" />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.28rem] bg-[#1a1512] sm:rounded-[0.35rem]">
            <FreddosDesktopScreen />
          </div>
        </div>
        <div className="freddos-stage__base relative mx-[-2%] h-[0.55rem] rounded-b-[0.55rem] bg-gradient-to-b from-[#3a3530] to-[#1c1916] shadow-[0_10px_24px_-8px_rgba(26,18,14,0.45)] sm:h-[0.7rem] sm:rounded-b-[0.7rem]">
          <span className="absolute inset-x-[28%] top-0 h-px bg-white/15" />
          <span className="absolute left-1/2 top-[0.12rem] h-[0.28rem] w-[18%] -translate-x-1/2 rounded-sm bg-[#12100e]/80 sm:h-[0.35rem]" />
        </div>
      </div>

      {/* iPhone — limittäin läppärin eteen, kokonaan kehyksen sisällä */}
      <div className="freddos-stage__phone absolute bottom-0 left-0 z-[2] w-[28%] sm:w-[26%]">
        <div className="relative overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-[#4a4540] via-[#2a2622] to-[#0e0c0b] p-[0.22rem] shadow-[0_22px_50px_-14px_rgba(26,18,14,0.7)] ring-1 ring-white/10 sm:rounded-[1.35rem] sm:p-[0.26rem]">
          <span className="absolute left-1/2 top-[0.36rem] z-[3] h-[0.55rem] w-[28%] -translate-x-1/2 rounded-full bg-[#050403] sm:top-[0.42rem] sm:h-[0.62rem]" />
          <div className="relative aspect-[9/19.2] overflow-hidden rounded-[0.95rem] bg-[#f7f3ee] sm:rounded-[1.1rem]">
            <BarberMobilePreview image={freddosMobileHero} />
          </div>
          <span className="absolute bottom-[0.28rem] left-1/2 z-[3] h-[0.12rem] w-[28%] -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

/** Mini-mock: https://freddos.es/ — ruskea hero ylhäällä, kuvat alla */
function FreddosDesktopScreen() {
  return (
    <div className="flex size-full flex-col overflow-hidden bg-[#fffdfd] text-[#3f2c26]">
      {/* Selainpalkki */}
      <div className="flex shrink-0 items-center gap-2 border-b border-black/10 bg-[#f0ebe4] px-2.5 py-1.5 sm:px-3 sm:py-2">
        <div className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#d4726a] sm:size-2" />
          <span className="size-1.5 rounded-full bg-[#e0b45c] sm:size-2" />
          <span className="size-1.5 rounded-full bg-[#6faf7a] sm:size-2" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-full bg-white/85 px-2.5 py-0.5 text-center text-[0.4rem] tracking-wide text-[#5c534c] ring-1 ring-black/8 sm:text-[0.46rem]">
          freddos.es
        </div>
      </div>

      {/* Sivuston yläpalkki */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-black/5 bg-white px-2.5 py-1 sm:px-3.5 sm:py-1.5">
        <img src={freddosLogo} alt="" className="h-3 w-auto object-contain sm:h-3.5" />
        <div className="hidden items-center gap-2.5 text-[0.36rem] font-semibold uppercase tracking-[0.12em] text-[#3f2c26]/55 sm:flex sm:text-[0.4rem]">
          <span>Inicio</span>
          <span>Menú</span>
          <span>Tienda</span>
          <span>Contacto</span>
        </div>
      </div>

      {/* Ruskea hero — kuten freddos.es etusivu */}
      <div className="relative flex shrink-0 flex-col items-center justify-center gap-1 bg-[#3f2c26] px-3 py-2.5 text-center sm:gap-1.5 sm:py-3.5">
        <p className="max-w-[36ch] text-[0.34rem] leading-snug text-white/75 sm:text-[0.4rem]">
          &ldquo;Más que café, un movimiento. Freddo&apos;s: sabor, cultura y estilo.&rdquo;
        </p>
        <img
          src={freddosLogo}
          alt=""
          className="h-5 w-auto brightness-0 invert sm:h-6"
        />
        <p className="text-[0.42rem] font-semibold tracking-tight text-white sm:text-[0.5rem]">
          Not the typical, It&apos;s Freddo&apos;s
        </p>
      </div>

      {/* Kuvat alla */}
      <div className="grid min-h-0 flex-1 grid-cols-4 gap-px bg-[#3f2c26]/10">
        {HOME_IMAGES.map((item) => (
          <div key={item.label} className="relative min-h-0 overflow-hidden bg-[#f6f1ea]">
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 size-full object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
