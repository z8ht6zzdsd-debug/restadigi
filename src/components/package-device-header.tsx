type PackageDeviceHeaderProps = {
  image: string;
  /** Pieni vaihtelu asettelussa pakettien välillä */
  variant?: number;
};

function DeviceScreen({ image, className = "" }: { image: string; className?: string }) {
  return (
    <div className={"pkg-device__screen " + className}>
      <img src={image} alt="" aria-hidden className="pkg-device__shot" />
    </div>
  );
}

/** Neljä laitetta (puhelin, tabletti, läppäri, ulkoinen näyttö) + graafinen tausta pakettikorteille */
export function PackageDeviceHeader({ image, variant = 0 }: PackageDeviceHeaderProps) {
  const tilt = variant % 4;

  return (
    <div className={"pkg-device-header pkg-device-header--v" + tilt}>
      <div className="pkg-device-header__bg" aria-hidden>
        <div className="pkg-device-header__wash" />
        <div className="pkg-device-header__grid" />
        <span className="pkg-device-header__orb pkg-device-header__orb--a" />
        <span className="pkg-device-header__orb pkg-device-header__orb--b" />
        <span className="pkg-device-header__orb pkg-device-header__orb--c" />
        <span className="pkg-device-header__spark pkg-device-header__spark--1" />
        <span className="pkg-device-header__spark pkg-device-header__spark--2" />
        <span className="pkg-device-header__spark pkg-device-header__spark--3" />
      </div>

      <div className="pkg-device-header__stage" aria-hidden>
        <div className="pkg-device pkg-device--phone">
          <div className="pkg-device__bezel pkg-device__bezel--phone">
            <span className="pkg-device__island" />
            <DeviceScreen image={image} className="pkg-device__screen--phone" />
          </div>
        </div>

        <div className="pkg-device pkg-device--tablet">
          <div className="pkg-device__bezel pkg-device__bezel--tablet">
            <DeviceScreen image={image} className="pkg-device__screen--tablet" />
          </div>
        </div>

        <div className="pkg-device pkg-device--laptop">
          <div className="pkg-device__lid">
            <div className="pkg-device__bezel pkg-device__bezel--laptop">
              <DeviceScreen image={image} className="pkg-device__screen--laptop" />
            </div>
          </div>
          <div className="pkg-device__keyboard" />
        </div>

        <div className="pkg-device pkg-device--monitor">
          <div className="pkg-device__bezel pkg-device__bezel--monitor">
            <DeviceScreen image={image} className="pkg-device__screen--monitor" />
          </div>
          <div className="pkg-device__neck" />
          <div className="pkg-device__foot" />
        </div>
      </div>
    </div>
  );
}
