import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "../components/Button";
import { trackCheckoutStarted } from "../analytics/events";
import "./Cart.css";

export function Cart() {
  const { lines, itemCount, total, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (lines.length === 0) {
    return (
      <section className="section container cart-empty">
        <h1>Your cart is empty</h1>
        <p className="text-muted">Nothing here yet — go find something loud.</p>
        <Link to="/shop">
          <Button size="lg">Browse the store</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container cart">
        <h1 className="cart__title">Your cart</h1>

        <div className="cart__layout">
          <ul className="cart__lines">
            {lines.map((line) => (
              <li key={line.product.id} className="cart-line">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="cart-line__img"
                />
                <div className="cart-line__info">
                  <strong>{line.product.name}</strong>
                  <span className="text-muted">{line.product.type}</span>
                  <button
                    className="cart-line__remove"
                    onClick={() => removeFromCart(line.product.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-line__qty">×{line.quantity}</div>
                <div className="cart-line__price">
                  €{(line.product.price * line.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <aside className="cart__summary">
            <h2>Summary</h2>
            <div className="cart__row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="cart__row">
              <span>Shipping</span>
              <span className="text-muted">Calculated at checkout</span>
            </div>
            <div className="cart__row cart__row--total">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <Button
              size="lg"
              fullWidth
              onClick={() => {
                trackCheckoutStarted(itemCount, total);
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
}
