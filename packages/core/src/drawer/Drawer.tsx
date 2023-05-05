import * as DialogPrimitive from "@radix-ui/react-dialog";
import React, { ComponentProps, forwardRef } from "react";
import { Button } from "../button";
import { DrawerContext, DrawerProvider, useDrawerContext } from "./context";
import { classNames } from "../utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Drawer Component
export type Drawer = ComponentProps<(typeof DialogPrimitive)["Dialog"]> &
  Partial<DrawerContext>;
export const Drawer = ({
  children,
  size = "md",
  side = "right",
  ...props
}: Drawer) => (
  <DrawerProvider value={{ size, side }}>
    {/* TODO: Add reference to the below element */}
    <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
  </DrawerProvider>
);
Drawer.displayName = "Drawer";

//Drawer Overlay Component
export type DrawerOverlay = ComponentProps<
  (typeof DialogPrimitive)["DialogOverlay"]
>;
export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlay>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Overlay
        {...props}
        className={classNames(
          "animate-slide-down-fade fixed inset-0 z-40 bg-black bg-opacity-20 transition-opacity ease-in-out dark:bg-opacity-40",
          className
        )}
        ref={forwardedRef}
      />
    );
  }
);
DrawerOverlay.displayName = "DrawerOverlay";

// Drawer Content Component
export type DrawerContent = ComponentProps<
  (typeof DialogPrimitive)["DialogContent"]
>;
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContent>(
  ({ children, className, ...props }, forwardedRef) => {
    const { size, side } = useDrawerContext();
    return (
      <DialogPrimitive.Portal>
        {/*zIndex one less than Toast */}
        <DialogPrimitive.Content
          {...props}
          className={classNames(
            "dark:bg-secondary-800 dark:text-secondary-50 fixed top-0 z-50 h-screen min-w-[360px] bg-white p-6 text-left shadow-xl focus-visible:outline-none sm:w-full sm:align-middle",
            size == "full" && "w-full",
            size == "lg" && "max-w-5xl",
            size == "md" && "max-w-3xl",
            size == "sm" && "max-w-2xl",
            side == "left" && "animate-slide-right left-0",
            side == "right" && "animate-slide-left right-0",
            "overflow-y-auto overscroll-auto",
            className
          )}
          ref={forwardedRef}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

// Drawer Title Component
export type DrawerTitle = ComponentProps<
  (typeof DialogPrimitive)["DialogTitle"]
>;
export const DrawerTitle = React.forwardRef<HTMLDivElement, DrawerTitle>(
  ({ children, ...props }, forwardedRef) => {
    const { size } = useDrawerContext();

    return (
      <DialogPrimitive.Title
        {...props}
        className={classNames(
          size == "lg" && "text-xl",
          size == "md" && "text-xl",
          size == "sm" && "text-lg",
          "mb-2 font-semibold"
        )}
        ref={forwardedRef}
      >
        {children}
      </DialogPrimitive.Title>
    );
  }
);
DrawerTitle.displayName = "DrawerTitle";

// Drawer Body Component
export type DrawerBody = ComponentProps<
  (typeof DialogPrimitive)["DialogDescription"]
>;
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBody>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Description {...props} ref={forwardedRef} asChild>
        <div className={className}>{children}</div>
      </DialogPrimitive.Description>
    );
  }
);
DrawerBody.displayName = "DrawerBody";

// Drawer Close Button Component
export type DrawerCloseButton = ComponentProps<
  (typeof DialogPrimitive)["Close"]
> &
  Button;
export const DrawerCloseButton = forwardRef<
  HTMLButtonElement,
  DrawerCloseButton
>(({ variant = "ghost", size = "icon", className, ...props }, forwardedRef) => {
  return (
    <DialogPrimitive.Close ref={forwardedRef} asChild>
      : classNames("absolute top-5 right-5 rounded-full", className)
      <Button
        {...props}
        variant={variant}
        size={size}
        className={classNames("absolute top-5 right-5 rounded-full", className)}
      >
        <XMarkIcon />
      </Button>
    </DialogPrimitive.Close>
  );
});
