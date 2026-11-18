// url=https://www.figma.com/design/oO5TfFAXgsNDcNQUL9B53D/GG-Roundtrip_E-commerce?node-id=8-2
// source=src/components/Button.tsx
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const variant = instance.getEnum("Style", {
  Primary: "primary",
  Secondary: "secondary",
  Ghost: "ghost",
});
const size = instance.getEnum("Size", {
  Md: "md",
  Lg: "lg",
});
const disabled = instance.getEnum("State", {
  Default: false,
  Hover: false,
  Disabled: true,
});

export default {
  example: figma.code`<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}>${label}</Button>`,
  imports: ['import { Button } from "./Button"'],
  id: "button",
  metadata: { nestable: true },
};
