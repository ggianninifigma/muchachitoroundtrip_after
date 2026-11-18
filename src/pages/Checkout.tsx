import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "../components/Button";
import { trackCheckoutCompleted } from "../analytics/events";
import "./Checkout.css";

export function Checkout() {
  const { lines, itemCount, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const orderId = `MBI-${Math.floor(100000 + Math.random() * 900000)}`;

    trackCheckoutCompleted(orderId, itemCount, total);

    // Mock payment processing.
    window.setTimeout(() => {
      clearCart();
      navigate(`/order-confirmed?order=${orderId}`, { replace: true });
    }, 600);
  }

  return (
    <section className="section">
      <div className="container checkout">
        <h1 className="checkout__title">Checkout</h1>

        <form className="checkout__layout" onSubmit={handleSubmit}>
          <div className="checkout__form">
            <fieldset className="field-group">
              <legend>Contact</legend>
              <label className="field">
                <span>Email</span>
                <input type="email" required placeholder="you@example.com" />
              </label>
            </fieldset>

            <fieldset className="field-group">
              <legend>Shipping address</legend>
              <label className="field">
                <span>Full name</span>
                <input type="text" required placeholder="Jairo Perera" />
              </label>
              <label className="field">
                <span>Address</span>
                <input type="text" required placeholder="Carrer de..." />
              </label>
              <div className="field-row">
                <label className="field">
                  <span>City</span>
                  <input type="text" required placeholder="Barcelona" />
                </label>
                <label className="field">
                  <span>Postal code</span>
                  <input type="text" required placeholder="08001" />
                </label>
              </div>
            </fieldset>

            <fieldset className="field-group">
              <legend>Payment</legend>
              <label className="field">
                <span>Card number</span>
                <input
                  type="text"
                  required
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                />
              </label>
              <div className="field-row">
                <label className="field">
                  <span>Expiry</span>
                  <input type="text" required placeholder="MM/YY" />
                </label>
                <label className="field">
                  <span>CVC</span>
                  <input type="text" required placeholder="123" />
                </label>
              </div>
            </fieldset>
          </div>

          <aside className="checkout__summary">
            <h2>Order summary</h2>
            <ul className="checkout__lines">
              {lines.map((line) => (
                <li key={line.product.id}>
                  <span>
                    {line.product.name} ×{line.quantity}
                  </span>
                  <span>€{(line.product.price * line.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout__total">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <Button size="lg" fullWidth type="submit" disabled={submitting}>
              {submitting ? "Processing…" : `Pay €${total.toFixed(2)}`}
            </Button>
            <p className="checkout__note text-muted">
              Demo checkout — no real payment is processed.
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}
