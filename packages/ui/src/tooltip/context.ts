import { createContext } from "../utils";

export const [TooltipProvider, useTooltipContext] =
  createContext<TooltipContext>({
    name: "TooltipContext",
    hookName: "useTooltipContext",
    providerName: "<Tooltip />",
  });

export interface TooltipContext {
  readonly size: "sm" | "md" | "lg";
  readonly isDisabled: boolean;
}
