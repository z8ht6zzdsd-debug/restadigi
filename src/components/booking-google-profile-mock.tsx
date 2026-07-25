import { Globe, MapPin, Navigation, Phone, Star } from "lucide-react";

import terraceImg from "@/assets/restaurant-terrace.jpg";
import interiorImg from "@/assets/restaurant-interior.jpg";

type BookingGoogleProfileMockProps = {
  name: string;
  category: string;
  status: string;
  rating: string;
  reviews: string;
  priceLevel: string;
  blurb: string;
  reserve: string;
  call: string;
  directions: string;
  save: string;
  website: string;
};

export function BookingGoogleProfileMock(props: BookingGoogleProfileMockProps) {
  const actions = [
    { label: props.call, Icon: Phone },
    { label: props.directions, Icon: Navigation },
    { label: props.save, Icon: Star },
    { label: props.website, Icon: Globe },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-[0_12px_40px_rgba(60,64,67,0.18)]">
      <div className="grid grid-cols-2 gap-0.5 bg-[#dadce0]">
        <img src={terraceImg} alt="" className="aspect-[4/3] h-full w-full object-cover" />
        <img
          src={interiorImg}
          alt=""
          className="aspect-[4/3] h-full w-full object-cover object-[center_40%]"
        />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-[#202124]">{props.name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5f6368]">
            <span className="inline-flex items-center gap-0.5 font-medium text-[#202124]">
              {props.rating}
              <span className="inline-flex text-[#fbbc04]">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3 fill-current" />
                ))}
              </span>
            </span>
            <span>{props.reviews}</span>
            <span>·</span>
            <span>{props.priceLevel}</span>
          </p>
          <p className="mt-1 text-xs text-[#5f6368]">
            {props.category} · <span className="font-medium text-[#188038]">{props.status}</span>
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {actions.map(({ label, Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#dadce0] bg-[#f8f9fa] text-[#1a73e8]">
                <Icon className="size-3.5" strokeWidth={1.75} />
              </span>
              <span className="text-[9px] font-medium uppercase tracking-wide text-[#5f6368]">
                {label}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          tabIndex={-1}
          className="flex w-full items-center justify-center rounded-lg bg-[#1a73e8] px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm"
        >
          {props.reserve}
        </button>

        <p className="flex gap-2 text-[11px] leading-relaxed text-[#5f6368]">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#1a73e8]" />
          {props.blurb}
        </p>
      </div>
    </div>
  );
}
