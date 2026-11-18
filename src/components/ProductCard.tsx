import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { trackProductClicked } from "../analytics/events";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  location?: string;
}

/**
 * ProductCard — storefront grid card.
 *
 * NOTE (roundtrip demo, BEFORE state):
 * The card is clickable and navigates to the product page, but there is NO
 * "Buy Now" / "Add to Cart" CTA here. The whole demo is about adding that CTA
 * in Figma (reusing the Design System Button) and pushing it back to code to
 * reduce the Product Viewed -> Checkout drop-off seen in Amplitude.
 */
export function ProductCard({ product, location = "shop" }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      onClick={() => trackProductClicked(product, location)}
    >
      <div className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">{product.priceLabel}</p>
        {product.onSale && <p className="product-card__sale">On sale</p>}
      </div>
    </Link>
  );
}
