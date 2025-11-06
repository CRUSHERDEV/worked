import type { Config } from "tailwindcss";
import { colors, typography, spacing, borderRadius, shadows, breakpoints } from "@linked-all/config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      spacing,
      borderRadius,
      boxShadow: shadows,
      screens: breakpoints,
    },
  },
  plugins: [],
};

export default config;
