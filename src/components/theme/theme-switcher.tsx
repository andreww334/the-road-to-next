"use client";

import "@/app/globals.css";
import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <LucideSun
          className="
          h-4 w-4 rotate-0 scale-100 transition-all
          dark:-rotate-90 dark:scale-0 dark:h-0 dark:w-0
        "
        />
      ) : (
        <LucideMoon
          className="
          h-0 w-0 rotate-90 scale-0 transition-transform
          dark:rotate-0 dark:scale-100 dark:h-4 dark:w-4
        "
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ThemeSwitcher };
