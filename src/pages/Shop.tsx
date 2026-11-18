import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import "./Shop.css";

export function Shop() {
  return (
    <section className="section shop">
      <div className="container">
        <div className="shop__head">
          <p className="eyebrow">Official store</p>
          <h1 className="shop__title">Featured Products</h1>
          <p className="text-muted shop__sub">
            Vinyl, albums and merch — shipped worldwide.
          </p>
        </div>

        <div className="shop__grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} location="shop-grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
