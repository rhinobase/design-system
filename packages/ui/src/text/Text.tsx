import { type HTMLAttributes, forwardRef } from "react";
import type { ValueOrFunction } from "../types/index.js";
import { classNames, getValue } from "../utils/index.js";

export type Text = HTMLAttributes<HTMLParagraphElement> & {
  isMuted?: ValueOrFunction;
};

export const Text = forwardRef<HTMLParagraphElement, Text>(function Text(
  { className, isMuted, ...props },
  forwardedRef
) {
  const muted = getValue(isMuted);

  return (
    <p
      {...props}
      className={classNames(muted && "opacity-60", className)}
      ref={forwardedRef}
    />
  );
});
