import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { useFieldControlContext } from "../field-control/index.js";
import { InputField } from "../input-field/index.js";
import { InputGroup, LeftAddon, Suffix } from "../input-group/index.js";
import { getValue } from "../utils/index.js";

const ID = "currency-input";

const KEY_FACTOR: Record<string, number> = {
  ArrowUp: 1,
  Enter: 0,
  ArrowDown: -1,
};

const CURRENCY: Record<
  string,
  {
    symbol: string;
    locales?: Intl.LocalesArgument;
    options?: Intl.NumberFormatOptions | undefined;
  }
> = {
  USD: {
    symbol: "$",
    locales: "en-US",
    options: { currency: "USD", minimumFractionDigits: 2 },
  },
  INR: {
    symbol: "₹",
    locales: "en-IN",
    options: { currency: "INR", minimumFractionDigits: 2 },
  },
  EUR: {
    symbol: "€",
    locales: "en-IE",
    options: { currency: "EUR", minimumFractionDigits: 2 },
  },
  GBP: {
    symbol: "₤",
    locales: "en-GB",
    options: { currency: "GBP", minimumFractionDigits: 2 },
  },
};

export type CurrencyInput = Omit<
  InputField,
  | "defaultValue"
  | "value"
  | "onChange"
  | "min"
  | "max"
  | "type"
  | "inputMode"
  | "autoComplete"
  | "autoCorrect"
  | "spellCheck"
  | "isUnstyled"
> & {
  defaultValue?: string;
  value?: string;
  onChange?: (value?: string) => void;
  currencyCode?: string;
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInput>(
  function CurrencyInput(
    {
      size = "md",
      currencyCode = "USD",
      onChange,
      onKeyDown,
      onBlur,
      className,
      ...props
    },
    forwardedRef,
  ) {
    const fieldControlContext = useFieldControlContext() ?? {
      isDisabled: false,
      isLoading: false,
      isReadOnly: false,
      isRequired: false,
      isInvalid: false,
    };

    const key = currencyCode.toUpperCase();
    const currencyProps = CURRENCY[key] ?? {
      ...CURRENCY.USD,
      symbol: key.slice(0, 3),
    };

    const formatter = new Intl.NumberFormat(
      currencyProps.locales,
      currencyProps.options,
    ).format;

    const _disabled =
      (props.disabled ??
        getValue(props.isDisabled) ??
        fieldControlContext.isDisabled) ||
      (getValue(props.isLoading) ?? fieldControlContext.isLoading);
    const _readOnly =
      props.readOnly ??
      getValue(props.isReadOnly) ??
      fieldControlContext.isReadOnly;

    return (
      <InputGroup size={size} className={className}>
        <LeftAddon>{currencyProps.symbol || "¤"}</LeftAddon>
        <InputField
          {...props}
          id={ID}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onChange={(event) => {
            const valueAsString = event.currentTarget.value.replace(
              /[^.0-9]/g,
              "",
            );

            onChange?.(valueAsString);
          }}
          onKeyDown={(event) => {
            const valueAsString = event.currentTarget.value;
            const valueAsNumber = Number(valueAsString.replace(/,/g, ""));

            if (event.key in KEY_FACTOR) {
              event.preventDefault();
              event.stopPropagation();

              const constant = KEY_FACTOR[event.key] ?? 0;
              const formattedValue = formatter(valueAsNumber + constant);

              onChange?.(formattedValue);
            } else onKeyDown?.(event);
          }}
          onBlur={(event) => {
            const valueAsString = event.currentTarget.value;
            const valueAsNumber = Number(valueAsString.replace(/,/g, ""));

            const formattedValue = formatter(valueAsNumber);

            onChange?.(formattedValue);
            onBlur?.(event);
          }}
          ref={forwardedRef}
        />
        <Suffix className="pointer-events-auto w-max">
          <div className="flex flex-col">
            <button
              type="button"
              tabIndex={-1}
              aria-label="increase"
              className="text-secondary-500 px-2 py-0.5 hover:text-black dark:hover:text-white"
              aria-controls={ID}
              onClick={() => {
                const valueAsNumber = Number(
                  (props.value ?? "0").replace(/,/g, ""),
                );
                const formattedValue = formatter(valueAsNumber + 1);

                onChange?.(formattedValue);
              }}
              disabled={_disabled || _readOnly}
            >
              <ChevronUpIcon className="size-2.5 stroke-[3]" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="decrease"
              className="text-secondary-500 px-2 py-0.5 hover:text-black dark:hover:text-white"
              aria-controls={ID}
              onClick={() => {
                const valueAsNumber = Number(
                  (props.value ?? "0").replace(/,/g, ""),
                );
                const formattedValue = formatter(valueAsNumber - 1);

                onChange?.(formattedValue);
              }}
              disabled={_disabled || _readOnly}
            >
              <ChevronDownIcon className="size-2.5 stroke-[3]" />
            </button>
          </div>
        </Suffix>
      </InputGroup>
    );
  },
);
