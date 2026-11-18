import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../data/products";
import { Button } from "../components/Button";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { trackProductViewed } from "../analytics/events";
import "./Product.css";

export function Product() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) trackProductViewed(product);
  }, [product]);

  if (!product) {
    return (
      <section className="section container">
        <h1>Product not found</h1>
        <Link to="/shop" className="featured__all">
          ← Back to shop
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <Link to="/shop" className="product-page__back">
          ← Back to shop
        </Link>

        <div className="product-page">
          <div className="product-page__media">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-page__info">
            <p className="eyebrow">{product.type}</p>
            <h1 className="product-page__title">{product.name}</h1>
            <p className="product-page__price">{product.priceLabel}</p>
            {product.onSale && <p className="product-page__sale">On sale</p>}

            <p className="product-page__desc">{product.description}</p>

            <ul className="product-page__details">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            <div className="product-page__actions">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  addToCart(product);
                  showToast(`Added “${product.name}” to cart`);
                }}
              >
                Add to cart
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
              >
                Go to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
