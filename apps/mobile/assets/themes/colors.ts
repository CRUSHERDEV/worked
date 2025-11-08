/**
 * Color Palette
 * Linked All mobile app color system
 */

export const colors = {
  // Primary Colors
  primary: {
    50: "#E6F2FF",
    100: "#CCE5FF",
    200: "#99CCFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#0066FF", // Main primary
    600: "#0052CC",
    700: "#003D99",
    800: "#002966",
    900: "#001433",
  },

  // Secondary Colors (Yellow)
  secondary: {
    50: "#FFFEF0",
    100: "#FFFDE0",
    200: "#FFFBC1",
    300: "#FFF9A2",
    400: "#FFF783",
    500: "#FFD600", // Main secondary (from design system)
    600: "#CCAB00",
    700: "#998000",
    800: "#665600",
    900: "#332B00",
  },

  // Accent Colors
  accent: {
    50: "#E6FCFA",
    100: "#CCF9F5",
    200: "#99F3EB",
    300: "#66EDE1",
    400: "#33E7D7",
    500: "#00C2A8", // Main accent
    600: "#009B86",
    700: "#007465",
    800: "#004E43",
    900: "#002722",
  },

  // Neutral Colors
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Semantic Colors
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },

  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    dark: "#0A00A0", // Dark from design system
  },

  // Text Colors
  text: {
    primary: "#0A00A0", // Dark from design system
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
    disabled: "#D1D5DB",
  },

  // Border Colors
  border: {
    light: "#E5E7EB",
    medium: "#D1D5DB",
    dark: "#9CA3AF",
  },
} as const;

export type ColorPalette = typeof colors;

