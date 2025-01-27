"use client";
import { type SizeType, createContext } from "../utils/index.js";

export const [SelectProvider, useSelectContext] = createContext<SelectContext>({
  name: "SelectContext",
  hookName: "useSelectContext",
  providerName: "<Select />",
});

export interface SelectContext {
  readonly size: SizeType;
}
