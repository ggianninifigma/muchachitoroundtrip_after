// url=https://www.figma.com/design/oO5TfFAXgsNDcNQUL9B53D/GG-Roundtrip_E-commerce?node-id=10-3
// source=src/components/ProductCard.tsx
// component=ProductCard
import figma from "figma";

// The React ProductCard takes a whole `product` object (not individual
// title/price props), so the connected snippet shows real usage.
export default {
  example: figma.code`<ProductCard product={product} />`,
  imports: ['import { ProductCard } from "./ProductCard"'],
  id: "product-card",
  metadata: { nestable: false },
};
