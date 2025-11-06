/**
 * Design system theme configuration for Linked All
 */

export const colors = {
  // Brand colors
  primary: {
    DEFAULT: "#0066FF",
    50: "#E6F0FF",
    100: "#CCE0FF",
    200: "#99C2FF",
    300: "#66A3FF",
    400: "#3385FF",
    500: "#0066FF",
    600: "#0052CC",
    700: "#003D99",
    800: "#002966",
    900: "#001433",
  },
  secondary: {
    DEFAULT: "#F5B800",
    50: "#FEF8E6",
    100: "#FDF1CC",
    200: "#FBE399",
    300: "#F9D666",
    400: "#F7C833",
    500: "#F5B800",
    600: "#C49300",
    700: "#936E00",
    800: "#624A00",
    900: "#312500",
  },
  accent: {
    DEFAULT: "#00C2A8",
    50: "#E6F9F6",
    100: "#CCF3ED",
    200: "#99E7DA",
    300: "#66DBC8",
    400: "#33CEB5",
    500: "#00C2A8",
    600: "#009B86",
    700: "#007465",
    800: "#004E43",
    900: "#002722",
  },

  // Neutral colors
  dark: "#0D0D0D",
  background: "#F9FAFB",
  white: "#FFFFFF",

  // Grayscale
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

  // Semantic colors
  success: {
    DEFAULT: "#10B981",
    light: "#D1FAE5",
    dark: "#065F46",
  },
  warning: {
    DEFAULT: "#F59E0B",
    light: "#FEF3C7",
    dark: "#92400E",
  },
  error: {
    DEFAULT: "#EF4444",
    light: "#FEE2E2",
    dark: "#991B1B",
  },
  info: {
    DEFAULT: "#3B82F6",
    light: "#DBEAFE",
    dark: "#1E40AF",
  },
};

export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    display: ["Poppins", "Inter", "system-ui", "sans-serif"],
    mono: ["Fira Code", "monospace"],
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
};

export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
};

export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slower: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
};
