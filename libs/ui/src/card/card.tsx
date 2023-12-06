"use client";
import React from "react";
import { classNames, getValidChildren } from "../utils";
import { CardContext, CardProvider, useCardContext } from "./context";
import { cva } from "class-variance-authority";

// Card Component
export const cardClasses = cva("flex flex-col dark:text-white", {
  variants: {
    size: {
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-lg",
    },
    variant: {
      outline: "border dark:border-secondary-700",
      elevated: "bg-white dark:bg-secondary-800 drop-shadow-lg",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
});

export type Card = React.HTMLAttributes<HTMLDivElement> &
  Partial<CardContext> & { isUnstyled?: boolean };

export const Card = React.forwardRef<HTMLDivElement, Card>(
  (
    {
      className,
      variant = "outline",
      size = "md",
      isUnstyled = false,
      isBarebone = false,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const unstyle = isBarebone || isUnstyled;

    const validChildren = getValidChildren(children);

    const hasHeader = validChildren.some(
      (child) => child.type.displayName === CardHeader.displayName,
    );
    const hasFooter = validChildren.some(
      (child) => child.type.displayName === CardFooter.displayName,
    );

    return (
      <CardProvider
        value={{
          size,
          isBarebone,
          variant,
          has: { header: hasHeader, footer: hasFooter },
        }}
      >
        <div
          {...props}
          className={
            unstyle
              ? className
              : classNames(cardClasses({ size, variant }), className)
          }
          ref={forwardedRef}
        >
          {children}
        </div>
      </CardProvider>
    );
  },
);
Card.displayName = "Card";

// CardHeader Component
export const cardHeaderClasses = cva("", {
  variants: {
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CardHeader = React.HTMLAttributes<HTMLDivElement> & {
  isUnstyled?: boolean;
};

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeader>(
  ({ children, className, isUnstyled = false, ...props }, forwardedRef) => {
    const { isBarebone, size } = useCardContext();
    const unstyle = isBarebone || isUnstyled;

    return (
      <div
        {...props}
        className={
          unstyle
            ? className
            : classNames(cardHeaderClasses({ size }), className)
        }
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
CardHeader.displayName = "CardHeader";

// CardContent Component
export const cardContentClasses = cva("", {
  variants: {
    size: {
      sm: "px-3",
      md: "px-4",
      lg: "px-5",
    },
    hasHeader: {
      true: "",
      false: "",
    },
    hasFooter: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      size: "sm",
      hasHeader: false,
      hasFooter: true,
      className: "pt-3",
    },
    {
      size: "sm",
      hasHeader: true,
      hasFooter: false,
      className: "pb-3",
    },
    {
      size: "sm",
      hasHeader: false,
      hasFooter: false,
      className: "py-3",
    },
    {
      size: "md",
      hasHeader: false,
      hasFooter: true,
      className: "pt-4",
    },
    {
      size: "md",
      hasHeader: true,
      hasFooter: false,
      className: "pb-4",
    },
    {
      size: "md",
      hasHeader: false,
      hasFooter: false,
      className: "py-4",
    },
    {
      size: "lg",
      hasHeader: false,
      hasFooter: true,
      className: "pt-5",
    },
    {
      size: "lg",
      hasHeader: true,
      hasFooter: false,
      className: "pb-5",
    },
    {
      size: "lg",
      hasHeader: false,
      hasFooter: false,
      className: "py-5",
    },
  ],
  defaultVariants: {
    size: "md",
    hasHeader: true,
    hasFooter: true,
  },
});

export type CardContent = React.HTMLAttributes<HTMLDivElement> & {
  isUnstyled?: boolean;
};

export const CardContent = React.forwardRef<HTMLDivElement, CardContent>(
  ({ children, className, isUnstyled = false, ...props }, forwardedRef) => {
    const { isBarebone, size, has } = useCardContext();
    const unstyle = isBarebone || isUnstyled;

    return (
      <div
        {...props}
        className={
          unstyle
            ? className
            : classNames(
                cardContentClasses({
                  size,
                  hasHeader: has.header,
                  hasFooter: has.footer,
                }),
                className,
              )
        }
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
CardContent.displayName = "CardContent";

// CardFooter Component
export const cardFooterClasses = cva("", {
  variants: {
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CardFooter = React.HTMLAttributes<HTMLDivElement> & {
  isUnstyled?: boolean;
};

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooter>(
  ({ children, className, isUnstyled = false, ...props }, forwardedRef) => {
    const { isBarebone, size } = useCardContext();
    const unstyle = isUnstyled || isBarebone;

    return (
      <div
        {...props}
        className={
          unstyle
            ? className
            : classNames(cardFooterClasses({ size }), className)
        }
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
CardFooter.displayName = "CardFooter";
