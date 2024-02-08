import { createContext } from "@rafty/shared";

export const [MenuBarProvider, useMenuBarContext] =
  createContext<MenuBarContext>({
    name: "MenuBarContext",
    hookName: "useMenuBarContext",
    providerName: "<MenuBar />",
  });

export interface MenuBarContext {
  readonly size: "sm" | "md" | "lg";
  readonly isUnstyled: boolean;
  readonly isDisabled: boolean;
}
