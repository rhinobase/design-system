"use client";
import {
  SegmentGroup,
  type SegmentGroupItemProps,
  type SegmentGroupRootProps,
} from "@ark-ui/react";
import { cva } from "class-variance-authority";
import { type ElementRef, forwardRef } from "react";
import { useFieldControlContext } from "../field-control/index.js";
import type { ValueOrFunction } from "../types/index.js";
import { classNames, getValue } from "../utils/index.js";
import {
  type SegmentedControlContext,
  SegmentedControlProvider,
  useSegmentedControlContext,
} from "./context.js";

export const segmentedControlClasses = cva(
  "flex data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-l border-secondary-300 dark:border-secondary-700 data-[disabled]:opacity-70",
  {
    variants: {
      size: {
        sm: "data-[orientation=horizontal]:gap-2 data-[orientation=vertical]:gap-1",
        md: "data-[orientation=horizontal]:gap-3 data-[orientation=vertical]:gap-2",
        lg: "data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:gap-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type SegmentedControl = Omit<
  SegmentGroupRootProps,
  "value" | "defaultValue" | "onValueChange"
> & {
  isDisabled?: ValueOrFunction;
  isLoading?: ValueOrFunction;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value?: string) => void;
} & Partial<SegmentedControlContext>;

export const SegmentedControl = forwardRef<
  ElementRef<typeof SegmentGroup.Root>,
  SegmentedControl
>(function SegmentedControl(
  {
    className,
    children,
    isDisabled,
    isReadOnly,
    isLoading,
    size = "md",
    orientation = "horizontal",
    onValueChange,
    ...props
  },
  forwaredRef
) {
  const fieldControlContext = useFieldControlContext() ?? {
    isDisabled: false,
    isLoading: false,
    isReadOnly: false,
    isRequired: false,
    isInvalid: false,
  };

  const _disabled =
    (props.disabled ??
      getValue(isDisabled) ??
      fieldControlContext.isDisabled) ||
    (getValue(isLoading) ?? fieldControlContext.isLoading);
  const _readOnly =
    props.readOnly ?? getValue(isReadOnly) ?? fieldControlContext.isReadOnly;

  return (
    <SegmentedControlProvider value={{ isReadOnly: _readOnly ?? false, size }}>
      <SegmentGroup.Root
        {...props}
        orientation={orientation}
        disabled={_disabled}
        readOnly={_readOnly}
        className={classNames(segmentedControlClasses({ size }), className)}
        onValueChange={({ value }) => onValueChange?.(value)}
        ref={forwaredRef}
      >
        {children}
        <SegmentGroup.Indicator className="border-primary-500 dark:border-primary-300 transform data-[orientation=horizontal]:bottom-0 data-[orientation=vertical]:left-0 data-[orientation=vertical]:h-[var(--height)] data-[orientation=horizontal]:w-[var(--width)] data-[orientation=horizontal]:translate-y-px data-[orientation=vertical]:-translate-x-px data-[orientation=horizontal]:border-b-2 data-[orientation=vertical]:border-l-2" />
      </SegmentGroup.Root>
    </SegmentedControlProvider>
  );
});

export const segmentedControlItemClasses = cva(
  "data-[disabled]:cursor-not-allowed text-secondary-500 select-none dark:text-secondary-400 font-medium data-[state=checked]:dark:text-white data-[state=checked]:text-black",
  {
    variants: {
      readonly: {
        true: "cursor-default",
        false:
          "cursor-pointer data-[hover]:text-secondary-800 data-[hover]:dark:text-secondary-200 transition-all duration-200",
      },
      size: {
        sm: "text-sm data-[orientation=horizontal]:px-1 data-[orientation=horizontal]:py-2 data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-1",
        md: "text-base data-[orientation=horizontal]:px-1.5 data-[orientation=horizontal]:py-2.5 data-[orientation=vertical]:px-2.5 data-[orientation=vertical]:py-1.5",
        lg: "text-lg data-[orientation=horizontal]:px-2 data-[orientation=horizontal]:py-3 data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-2",
      },
    },
    defaultVariants: {
      readonly: false,
      size: "md",
    },
  }
);

export type SegmentedControlItem = SegmentGroupItemProps;

export const SegmentedControlItem = forwardRef<
  ElementRef<typeof SegmentGroup.Item>,
  SegmentedControlItem
>(function SegmentedControlItem(
  { className, children, ...props },
  forwaredRef
) {
  const { isReadOnly, size } = useSegmentedControlContext();

  return (
    <SegmentGroup.Item
      {...props}
      className={classNames(
        segmentedControlItemClasses({ readonly: isReadOnly, size }),
        className
      )}
      ref={forwaredRef}
    >
      <SegmentGroup.ItemText>{children}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  );
});
