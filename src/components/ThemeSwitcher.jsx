import React, { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const THEME_STORAGE_KEY = "kanji-quiz-theme";

const themes = [
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
];

function getStoredTheme() {
  if (typeof window === "undefined") return "system";
  return window.localStorage.getItem(THEME_STORAGE_KEY) || "system";
}

function ThemeSwitcher() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const isDark =
        theme === "dark" || (theme === "system" && mediaQuery.matches);
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    };

    updateTheme();

    if (theme === "system") {
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme]);

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <div
      className="flex items-center justify-center gap-1"
      aria-label="Choose theme"
    >
      {themes.map(({ value, label, Icon }) => (
        <Button
          key={value}
          type="button"
          variant={theme === value ? "secondary" : "ghost"}
          size="icon-sm"
          className={cn(
            "text-muted-foreground",
            theme === value && "text-foreground shadow-xs",
          )}
          aria-label={label}
          aria-pressed={theme === value}
          title={label}
          onClick={() => handleThemeChange(value)}
        >
          <Icon />
        </Button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;
