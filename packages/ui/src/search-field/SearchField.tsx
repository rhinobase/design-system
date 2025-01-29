"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { InputField } from "../input-field/index.js";
import { InputGroup, Prefix } from "../input-group/index.js";
import { classNames } from "../utils/index.js";

export const searchFieldIconClasses = cva(
  "stroke-secondary-400 dark:stroke-secondary-500 stroke-2",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-[18px]",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SearchField = Omit<
  InputField,
  "type" | "onChange" | "type" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const SearchField = forwardRef<HTMLInputElement, SearchField>(
  function SearchField(
    { onValueChange, size = "md", className, ...props },
    forwardedRef,
  ) {
    return (
      <InputGroup className={classNames("w-full", className)} size={size}>
        <Prefix>
          <MagnifyingGlassIcon className={searchFieldIconClasses({ size })} />
        </Prefix>
        <InputField
          {...props}
          type="search"
          onChange={(e) => onValueChange?.(e.target.value)}
          ref={forwardedRef}
        />
      </InputGroup>
    );
  },
);
