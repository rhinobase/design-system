"use client";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Spinner,
  classNames,
} from "@rafty/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, TvIcon } from "@heroicons/react/24/outline";

const THEMES = {
  light: SunIcon,
  dark: MoonIcon,
  system: TvIcon,
} as const;

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (theme) setLoading(false);
  }, [theme]);

  const TriggerIcon = THEMES[theme as keyof typeof THEMES];
  return (
    <Menu>
      <MenuTrigger
        size="icon"
        variant="ghost"
        aria-label="Change Theme"
        title="Change Theme"
        className="hidden md:block"
      >
        {!isLoading ? (
          <TriggerIcon height={18} width={18} className="stroke-2" />
        ) : (
          <Spinner size="sm" />
        )}
      </MenuTrigger>
      <MenuContent className="!z-50 !gap-0.5">
        {Object.entries(THEMES).map(([name, Icon]) => (
          <MenuItem
            key={name}
            onClick={() => setTheme(name)}
            className={classNames(
              theme === name &&
                "!bg-secondary-200/70 !text-primary-500 dark:!bg-secondary-700/60 dark:!text-primary-400",
              "!capitalize",
            )}
          >
            <Icon height={18} width={18} className="stroke-2" />
            {name}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  );
}
