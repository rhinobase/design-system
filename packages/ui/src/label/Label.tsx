"use client";
import { type LabelHTMLAttributes, forwardRef } from "react";
import { useFieldControlContext } from "../field-control/index.js";
import type { ValueOrFunction } from "../types/index.js";
import { classNames, getValue } from "../utils/index.js";

export type Label = LabelHTMLAttributes<HTMLLabelElement> & {
  isRequired?: ValueOrFunction;
};

export const Label = forwardRef<HTMLLabelElement, Label>(function Label(
  { children, className, isRequired, htmlFor, ...props },
  forwardedRef
) {
  const { name, isRequired: isParentRequired } = useFieldControlContext() ?? {
    isDisabled: false,
    isLoading: false,
    isReadOnly: false,
    isRequired: false,
    isInvalid: false,
  };

  const required = getValue(isRequired) ?? isParentRequired;

  return (
    <label
      {...props}
      htmlFor={htmlFor ?? name}
      className={classNames(
        required &&
          "after:ml-0.5 after:text-red-500 after:content-['*'] after:dark:text-red-400",
        "text-secondary-800 dark:text-secondary-200 select-none text-sm font-medium",
        className
      )}
      ref={forwardedRef}
    >
      {children}
    </label>
  );
});
