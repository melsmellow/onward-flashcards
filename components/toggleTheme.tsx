"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? (
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] animate-fade-in" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
