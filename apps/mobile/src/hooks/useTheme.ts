/**
 * Theme Hook
 * React hook for theme management
 */

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { lightTheme, darkTheme, Theme } from "@/assets/themes";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    // Set initial theme
    const colorScheme = Appearance.getColorScheme();
    setIsDark(colorScheme === "dark");

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

