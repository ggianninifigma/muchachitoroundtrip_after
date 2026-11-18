import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}

/**
 * Design System — Button
 * Variants: primary (brand red), secondary (ink outline), ghost.
 * This is the component reused for the "Buy Now" CTA in the roundtrip demo.
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    fullWidth ? "ds-button--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
