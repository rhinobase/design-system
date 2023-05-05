import { forwardRef } from "react";
import { Button } from "../button";
import { useFieldControlContext } from "../field";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { InputField } from "../input-field";
import { useMemo, useState } from "react";

type InitialState = boolean | (() => boolean);

export function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState);
  const callbacks = useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((prev) => !prev),
    }),
    []
  );
  return [value, callbacks] as const;
}

// PasswordField Component
export type PasswordField = Omit<JSX.IntrinsicElements["input"], "size"> & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "solid" | "ghost";
};
export const PasswordField = forwardRef<HTMLInputElement, PasswordField>(
  ({ size = "md", variant = "outline", ...props }, forwardedRef) => {
    const [showPassword, { toggle }] = useBoolean();
    const controls = useFieldControlContext();

    return (
      <div className="relative flex w-full items-center">
        <InputField
          {...props}
          size={size}
          variant={variant}
          type={showPassword ? "text" : "password"}
          ref={forwardedRef}
          {...controls}
        />
        <Button
          size="icon"
          aria-label="show and hide password"
          variant="ghost"
          className="absolute right-1 z-[2] m-1"
          onClick={toggle}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-4 w-4 stroke-2" />
          ) : (
            <EyeIcon className="h-4 w-4 stroke-2" />
          )}
        </Button>
      </div>
    );
  }
);
PasswordField.displayName = "PasswordField";
