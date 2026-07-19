import { useMessages } from "@/i18n";

/** Mini webshop-layout puhelimen näytölle — espresso ostoskoriin */
export function PhoneShopPreview({ image }: { image: string }) {
  const { websites } = useMessages();
  const s = websites.hero.phoneShop;

  return (
    <div className="page-hero__phone-shop">
      <div className="page-hero__phone-shop-photo">
        <img src={image} alt="" />
      </div>
      <div className="page-hero__phone-shop-panel">
        <p className="page-hero__phone-shop-brand">{s.brand}</p>
        <p className="page-hero__phone-shop-product">{s.product}</p>
        <div className="page-hero__phone-shop-row">
          <span className="page-hero__phone-shop-price">{s.price}</span>
          <span className="page-hero__phone-shop-cta">{s.addToCart}</span>
        </div>
      </div>
    </div>
  );
}
