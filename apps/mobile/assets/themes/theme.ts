/**
 * Theme Configuration
 * Complete theme system for Linked All mobile app
 */

import { colors } from "./colors";
import { typography } from "./typography";
import { spacing, borderRadius } from "./spacing";
import { shadows } from "./shadows";

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

// Light theme (default)
export const lightTheme: Theme = theme;

// Dark theme
export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...colors,
    background: {
      primary: "#111827",
      secondary: "#1F2937",
      tertiary: "#374151",
      dark: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#D1D5DB",
      tertiary: "#9CA3AF",
      inverse: "#111827",
      disabled: "#6B7280",
    },
    border: {
      light: "#374151",
      medium: "#4B5563",
      dark: "#6B7280",
    },
  },
};

export default theme;

