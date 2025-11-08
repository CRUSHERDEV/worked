/**
 * Design System - Linked All Brand Guidelines
 * Colors, typography, and design tokens
 */

// Brand Colors (from design system guide)
export const colors = {
  primary: "#0066FF", // Primary blue
  secondary: "#FFD600", // Secondary yellow
  accent: "#00C2A8", // Accent teal (optional)
  dark: "#0A00A0", // Dark blue (from design system)
  
  // Primary color scale
  primary50: "#E6F2FF",
  primary100: "#CCE5FF",
  primary200: "#99CCFF",
  primary300: "#66B2FF",
  primary400: "#3399FF",
  primary500: "#0066FF",
  primary600: "#0052CC",
  primary700: "#003D99",
  primary800: "#002966",
  primary900: "#001433",
  
  // Secondary color scale
  secondary50: "#FFFEF0",
  secondary100: "#FFFDE0",
  secondary200: "#FFFBC1",
  secondary300: "#FFF9A2",
  secondary400: "#FFF783",
  secondary500: "#FFD600",
  secondary600: "#CCAB00",
  secondary700: "#998000",
  secondary800: "#665600",
  secondary900: "#332B00",
  
  // Neutral grays
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  
  // Semantic colors
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  
  // Background colors
  background: {
    white: "#FFFFFF",
    light: "#F9FAFB",
    dark: "#0A00A0",
  },
  
  // Text colors
  text: {
    primary: "#0A00A0",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
  },
};

// Typography (from design system guide)
export const typography = {
  fontFamily: {
    // Display font (from design system)
    display: "Poppins", // Poppins SemiBold for headings
    // Body font (from design system)
    body: "Inter", // Inter Regular for body text
    // Mono font (from design system)
    mono: "JetBrains Mono", // JetBrains Mono for code/data
  },
  
  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
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
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Spacing scale
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

// Border radius
export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  base: "0.5rem", // 8px
  md: "0.75rem", // 12px
  lg: "1rem", // 16px
  xl: "1.5rem", // 24px
  "2xl": "2rem", // 32px
  full: "9999px",
};

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Export theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
};

export default theme;
