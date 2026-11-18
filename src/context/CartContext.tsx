import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";
import { trackAddedToCart, trackRemovedFromCart } from "../analytics/events";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
    const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

    return {
      lines,
      itemCount,
      total,
      addToCart: (product, quantity = 1) => {
        setLines((prev) => {
          const existing = prev.find((l) => l.product.id === product.id);
          if (existing) {
            return prev.map((l) =>
              l.product.id === product.id
                ? { ...l, quantity: l.quantity + quantity }
                : l,
            );
          }
          return [...prev, { product, quantity }];
        });
        trackAddedToCart(product, quantity);
      },
      removeFromCart: (productId) =>
        setLines((prev) => {
          const line = prev.find((l) => l.product.id === productId);
          if (line) trackRemovedFromCart(line.product, line.quantity);
          return prev.filter((l) => l.product.id !== productId);
        }),
      clearCart: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
