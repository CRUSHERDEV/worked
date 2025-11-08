/**
 * Badge Component
 * Badge component for labels and tags
 */

import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors, typography, spacing, borderRadius } from "@/assets/themes";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  style,
  textStyle,
}) => {
  const getVariantStyle = (): ViewStyle => {
    const variants = {
      primary: { backgroundColor: colors.primary[100], borderColor: colors.primary[500] },
      secondary: { backgroundColor: colors.secondary[100], borderColor: colors.secondary[500] },
      success: { backgroundColor: colors.success[100], borderColor: colors.success[500] },
      error: { backgroundColor: colors.error[100], borderColor: colors.error[500] },
      warning: { backgroundColor: colors.warning[100], borderColor: colors.warning[500] },
      info: { backgroundColor: colors.info[100], borderColor: colors.info[500] },
    };
    return variants[variant];
  };

  const getTextColor = (): string => {
    const colors = {
      primary: "#0066FF",
      secondary: "#F5B800",
      success: "#22C55E",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#3B82F6",
    };
    return colors[variant];
  };

  const getSizeStyle = (): ViewStyle => {
    const sizes = {
      sm: { paddingHorizontal: spacing[2], paddingVertical: spacing[1] },
      md: { paddingHorizontal: spacing[3], paddingVertical: spacing[2] },
      lg: { paddingHorizontal: spacing[4], paddingVertical: spacing[3] },
    };
    return sizes[size];
  };

  const getTextSize = (): number => {
    const sizes = {
      sm: typography.fontSize.xs,
      md: typography.fontSize.sm,
      lg: typography.fontSize.base,
    };
    return sizes[size];
  };

  return (
    <View
      style={[
        styles.badge,
        getVariantStyle(),
        getSizeStyle(),
        { borderRadius: borderRadius.full },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { fontSize: getTextSize(), color: getTextColor() },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
  },
  text: {
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
  },
});

export default Badge;

