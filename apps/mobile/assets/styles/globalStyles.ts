/**
 * Global Styles
 * Global style definitions for Linked All mobile app
 */

import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../themes";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.regular,
  },
  heading: {
    fontSize: typography.fontSize["2xl"],
    lineHeight: typography.fontSize["2xl"] * typography.lineHeight.tight,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
  },
  subheading: {
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.text.tertiary,
    fontFamily: typography.fontFamily.regular,
  },
});

