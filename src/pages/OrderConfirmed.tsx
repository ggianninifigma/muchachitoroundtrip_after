import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import "./OrderConfirmed.css";

export function OrderConfirmed() {
  const [params] = useSearchParams();
  const orderId = params.get("order") ?? "MBI-000000";

  return (
    <section className="section container confirmed">
      <div className="confirmed__mark" aria-hidden>
        ✓
      </div>
      <p className="eyebrow">Order confirmed</p>
      <h1 className="confirmed__title">¡Vamos que nos vamos!</h1>
      <p className="confirmed__lede">
        Thanks for your order. A confirmation email is on its way.
      </p>
      <p className="confirmed__order">
        Order <strong>{orderId}</strong>
      </p>
      <Link to="/shop">
        <Button size="lg" variant="secondary">
          Keep shopping
        </Button>
      </Link>
    </section>
  );
}
