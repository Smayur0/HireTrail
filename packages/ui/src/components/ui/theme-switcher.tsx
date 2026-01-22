import { useTheme } from "@/provider/ThemeProvider";
import React from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "./button";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      aria-label="Theme toggle"
    >
      {isDark ? (
        <MoonIcon className="size-6" />
      ) : (
        <SunIcon className="size-6" />
      )}
    </Button>
  );
};

export default ThemeSwitch;
