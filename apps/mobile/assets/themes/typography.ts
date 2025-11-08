/**
 * Typography System
 * Linked All mobile app typography
 */

export const typography = {
  fontFamily: {
    // Primary fonts (from design system)
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
    bold: "Inter-Bold",
    poppins: {
      regular: "Poppins-Regular",
      medium: "Poppins-Medium",
      semiBold: "Poppins-SemiBold", // From design system
      bold: "Poppins-Bold",
    },
    mono: {
      regular: "JetBrainsMono-Regular", // From design system
      medium: "JetBrainsMono-Medium",
      semiBold: "JetBrainsMono-SemiBold",
      bold: "JetBrainsMono-Bold",
    },
    urbanist: {
      regular: "Urbanist-Regular",
      medium: "Urbanist-Medium",
      semiBold: "Urbanist-SemiBold",
      bold: "Urbanist-Bold",
    },
    outfit: {
      regular: "Outfit-Regular",
      medium: "Outfit-Medium",
      semiBold: "Outfit-SemiBold",
      bold: "Outfit-Bold",
    },
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  fontWeight: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },

  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
} as const;

export type Typography = typeof typography;

