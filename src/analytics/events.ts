import { track } from "./amplitude";
import type { Product } from "../data/products";

/**
 * Typed custom events for the storefront funnel.
 * Page Views + Frustration Analytics are handled by autocapture.
 */

function productProps(product: Product) {
  return {
    product_id: product.id,
    product_name: product.name,
    product_type: product.type,
    price: product.price,
    currency: "EUR",
  };
}

export function trackProductViewed(product: Product): void {
  track("Product Viewed", productProps(product));
}

export function trackProductClicked(product: Product, location: string): void {
  track("Product Clicked", { ...productProps(product), location });
}

export function trackAddedToCart(product: Product, quantity: number): void {
  track("Added to Cart", { ...productProps(product), quantity });
}

export function trackRemovedFromCart(product: Product, quantity: number): void {
  track("Remove from Cart", { ...productProps(product), quantity });
}

export function trackCheckoutStarted(
  itemCount: number,
  cartValue: number,
): void {
  track("Checkout Started", {
    item_count: itemCount,
    cart_value: cartValue,
    currency: "EUR",
  });
}

export function trackCheckoutCompleted(
  orderId: string,
  itemCount: number,
  cartValue: number,
): void {
  track("Checkout Completed", {
    order_id: orderId,
    item_count: itemCount,
    cart_value: cartValue,
    currency: "EUR",
  });
}
