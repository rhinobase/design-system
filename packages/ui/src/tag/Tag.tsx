import { cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { classNames } from "../utils";

// Tag Component
export const tagClasses = cva("size-max font-medium select-none", {
  variants: {
    size: {
      sm: "rounded-sm px-1 py-0.5 text-xs leading-none",
      md: "rounded-base px-1.5 py-1 text-sm leading-none",
      lg: "rounded-md px-2 py-1.5 text-base leading-none",
    },
    colorScheme: {
      primary:
        "text-primary-500 dark:text-primary-300 bg-primary-200/30 dark:bg-primary-400/10",
      secondary:
        "bg-secondary-200/60 dark:bg-secondary-700/50 dark:text-secondary-100",
      error: "text-red-500 dark:text-red-300 bg-red-200/40 dark:bg-red-300/10",
      success:
        "text-green-600 dark:text-green-300 bg-green-200/40 dark:bg-green-300/10",
      warning:
        "text-amber-600 dark:text-amber-300 bg-amber-200/40 dark:bg-amber-300/10",
    },
  },
  defaultVariants: {
    size: "md",
    colorScheme: "secondary",
  },
});

export type Tag = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
  colorScheme?: "primary" | "secondary" | "error" | "success" | "warning";
};

export const Tag = forwardRef<HTMLDivElement, Tag>(
  (
    { size = "md", colorScheme = "secondary", className, ...props },
    forwardedRef,
  ) => (
    <div
      {...props}
      className={classNames(tagClasses({ size, colorScheme }), className)}
      ref={forwardedRef}
    />
  ),
);

Tag.displayName = "Tag";
