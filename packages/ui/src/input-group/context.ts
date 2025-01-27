import { type SizeType, createContext } from "../utils/index.js";

export const [InputGroupProvider, useInputGroupContext] =
  createContext<InputGroupContext>({
    strict: false,
    name: "InputGroupContext",
    hookName: "useInputGroupContext",
    providerName: "<InputGroup />",
  });

export interface InputGroupContext {
  readonly isLeftAddon: boolean;
  readonly isRightAddon: boolean;
  readonly isPrefix: boolean;
  readonly isSuffix: boolean;
  readonly size: SizeType;
}
