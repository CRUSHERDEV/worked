/**
 * Card Component
 * Generic card container component
 */

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors, borderRadius, shadows } from "@/assets/themes";

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = "default",
}) => {
  const getVariantStyle = (): ViewStyle => {
    const variants = {
      default: {
        backgroundColor: colors.background.primary,
        ...shadows.sm,
      },
      elevated: {
        backgroundColor: colors.background.primary,
        ...shadows.lg,
      },
      outlined: {
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.light,
      },
    };
    return variants[variant];
  };

  return (
    <View style={[styles.card, getVariantStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: 16,
  },
});

export default Card;

