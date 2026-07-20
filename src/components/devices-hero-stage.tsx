import berryHero from "@/assets/freddos-v2-berry.jpg";
import platedHero from "@/assets/mock-erikoismenut.jpg";
import diningHero from "@/assets/restaurant-dining.jpg";
import terraceHero from "@/assets/success-busy-terrace.jpg";

/** Neljä laitetta: mobiili, kaksi tablettia, ulkoinen näyttö — palvelualan sivulayoutit */
export function DevicesHeroStage() {
  return (
    <div className="devices-stage" aria-hidden>
      <div className="devices-stage__row">
        {/* Mobiili — värikäs juoma */}
        <div className="devices-stage__phone">
          <div className="devices-stage__phone-bezel">
            <span className="devices-stage__phone-island" />
            <div className="devices-stage__screen devices-stage__screen--phone">
              <div className="mini-site mini-site--salon">
                <div className="mini-site__bar">
                  <span className="mini-site__brand">Freddo&apos;s</span>
                  <span className="mini-site__menu" />
                </div>
                <img
                  src={berryHero}
                  alt=""
                  width={720}
                  height={960}
                  decoding="async"
                  className="mini-site__hero mini-site__hero--phone"
                />
                <div className="mini-site__body mini-site__body--compact">
                  <p className="mini-site__kicker">Kahvila · Helsinki</p>
                  <p className="mini-site__title">Berry ice</p>
                  <span className="mini-site__cta">Tilaa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabletti — värikäs annos (kallistus vasemmalle) */}
        <div className="devices-stage__tablet devices-stage__tablet--tilt-left">
          <div className="devices-stage__tablet-bezel">
            <div className="devices-stage__screen devices-stage__screen--tablet">
              <div className="mini-site mini-site--plate">
                <div className="mini-site__nav">
                  <span className="mini-site__brand mini-site__brand--serif">Atelier</span>
                  <span className="mini-site__links">
                    <span>Menu</span>
                    <span>Book</span>
                  </span>
                </div>
                <div className="mini-site__hero-wrap">
                  <img
                    src={platedHero}
                    alt=""
                    width={1200}
                    height={900}
                    decoding="async"
                    className="mini-site__hero mini-site__hero--fill mini-site__hero--plate"
                  />
                  <div className="mini-site__hero-copy">
                    <p className="mini-site__kicker mini-site__kicker--light">Seasonal</p>
                    <p className="mini-site__title mini-site__title--hero">Chef&apos;s tasting</p>
                    <p className="mini-site__text mini-site__text--light">Book a table online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabletti — lohi / värikäs annos (kallistus oikealle) */}
        <div className="devices-stage__tablet devices-stage__tablet--cafe devices-stage__tablet--tilt-right">
          <div className="devices-stage__tablet-bezel">
            <div className="devices-stage__screen devices-stage__screen--tablet">
              <div className="mini-site mini-site--cafe">
                <div className="mini-site__nav">
                  <span className="mini-site__brand">Harbor</span>
                  <span className="mini-site__links">
                    <span>Menu</span>
                    <span>Reserve</span>
                  </span>
                </div>
                <div className="mini-site__hero-wrap">
                  <img
                    src={diningHero}
                    alt=""
                    width={1200}
                    height={900}
                    decoding="async"
                    className="mini-site__hero mini-site__hero--fill mini-site__hero--dining"
                  />
                  <div className="mini-site__hero-copy">
                    <p className="mini-site__title mini-site__title--hero">Fresh catch</p>
                    <p className="mini-site__text mini-site__text--light">
                      Lunch · dinner · online booking
                    </p>
                  </div>
                </div>
                <div className="mini-site__strip mini-site__strip--three">
                  <span>Lunch</span>
                  <span>Wine</span>
                  <span>Book</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ulkoinen näyttö — auringonlaskuterassi */}
        <div className="devices-stage__monitor">
          <div className="devices-stage__monitor-bezel">
            <div className="devices-stage__screen devices-stage__screen--monitor">
              <div className="mini-site mini-site--dining">
                <div className="mini-site__nav mini-site__nav--dark">
                  <span className="mini-site__brand mini-site__brand--serif">Garden Table</span>
                  <span className="mini-site__links">
                    <span>Menu</span>
                    <span>Terrace</span>
                    <span>Events</span>
                  </span>
                  <span className="mini-site__cta mini-site__cta--sm">Reserve</span>
                </div>
                <div className="mini-site__hero-wrap">
                  <img
                    src={terraceHero}
                    alt=""
                    width={1600}
                    height={1000}
                    decoding="async"
                    className="mini-site__hero mini-site__hero--fill mini-site__hero--terrace"
                  />
                  <div className="mini-site__hero-copy">
                    <p className="mini-site__title mini-site__title--hero">Sunset terrace</p>
                    <p className="mini-site__text mini-site__text--light">
                      Sea views · table booking online
                    </p>
                  </div>
                </div>
                <div className="mini-site__strip">
                  <span>Lunch</span>
                  <span>Dinner</span>
                  <span>Wine</span>
                  <span>Private</span>
                </div>
              </div>
            </div>
          </div>
          <div className="devices-stage__monitor-stand" />
          <div className="devices-stage__monitor-base" />
        </div>
      </div>
    </div>
  );
}
