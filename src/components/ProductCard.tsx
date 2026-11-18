import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../data/products";
import { Button } from "./Button";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { trackProductClicked, trackCheckoutStarted } from "../analytics/events";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  location?: string;
}

/**
 * ProductCard — storefront grid card.
 *
 * NOTE (roundtrip demo, AFTER state):
 * Each card now exposes an early "Buy Now" + "Add to Cart" CTA that reuses the
 * Design System Button. These were designed in Figma (respecting the DS) and
 * brought back to code via Code Connect / the Figma MCP, to reduce the
 * Product Viewed -> Checkout drop-off seen in Amplitude.
 */
export function ProductCard({ product, location = "shop" }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, itemCount, total } = useCart();
  const { showToast } = useToast();

  function handleBuyNow() {
    addToCart(product);
    // Express path straight to checkout — keep the funnel consistent.
    trackCheckoutStarted(itemCount + 1, total + product.price);
    navigate("/checkout");
  }

  function handleAddToCart() {
    addToCart(product);
    showToast(`${product.name} added to cart`);
  }

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card__link"
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

      <div className="product-card__actions">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
