import freddosHomeHero from "@/assets/freddos-home-hero-hd.jpg";
import freddosMobileHero from "@/assets/freddos-mobile-hero.png";
import { BarberMobilePreview } from "@/components/barber-mobile-preview";

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
            <img
              src={freddosHomeHero}
              alt=""
              className="absolute inset-0 size-full object-cover object-[center_15%]"
              draggable={false}
            />
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
