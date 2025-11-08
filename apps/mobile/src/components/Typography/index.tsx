/**
 * Typography Component
 * Text component with typography variants
 */

import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";
import { colors, typography } from "@/assets/themes";

export interface TypographyProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label";
  color?: string;
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color,
  style,
  children,
  ...props
}) => {
  const getVariantStyle = (): TextStyle => {
    const variants = {
      h1: {
        fontSize: typography.fontSize["4xl"],
        fontFamily: typography.fontFamily.bold,
        lineHeight: typography.fontSize["4xl"] * typography.lineHeight.tight,
      },
      h2: {
        fontSize: typography.fontSize["3xl"],
        fontFamily: typography.fontFamily.bold,
        lineHeight: typography.fontSize["3xl"] * typography.lineHeight.tight,
      },
      h3: {
        fontSize: typography.fontSize["2xl"],
        fontFamily: typography.fontFamily.semiBold,
        lineHeight: typography.fontSize["2xl"] * typography.lineHeight.normal,
      },
      h4: {
        fontSize: typography.fontSize.xl,
        fontFamily: typography.fontFamily.semiBold,
        lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
      },
      body: {
        fontSize: typography.fontSize.base,
        fontFamily: typography.fontFamily.regular,
        lineHeight: typography.fontSize.base * typography.lineHeight.normal,
      },
      caption: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.regular,
        lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
      },
      label: {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.medium,
        lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
      },
    };
    return variants[variant];
  };

  return (
    <Text
      style={[
        styles.text,
        getVariantStyle(),
        { color: color || colors.text.primary },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text.primary,
  },
});

export default Typography;

