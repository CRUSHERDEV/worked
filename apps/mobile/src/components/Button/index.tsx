/**
 * Button Component
 * Reusable button component with variants
 */

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, typography, spacing, borderRadius, shadows } from "@/assets/themes";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    };

    // Size styles
    const sizeStyles = {
      sm: { paddingHorizontal: spacing[3], paddingVertical: spacing[2], minHeight: 36 },
      md: { paddingHorizontal: spacing[4], paddingVertical: spacing[3], minHeight: 48 },
      lg: { paddingHorizontal: spacing[5], paddingVertical: spacing[4], minHeight: 56 },
    };

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: colors.primary[500],
      },
      secondary: {
        backgroundColor: colors.secondary[500],
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: colors.primary[500],
      },
      ghost: {
        backgroundColor: "transparent",
      },
      danger: {
        backgroundColor: colors.error[500],
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: "100%" }),
      ...(disabled && { opacity: 0.5 }),
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: typography.fontFamily.semiBold,
      fontWeight: typography.fontWeight.semiBold,
    };

    const sizeTextStyles = {
      sm: { fontSize: typography.fontSize.sm },
      md: { fontSize: typography.fontSize.base },
      lg: { fontSize: typography.fontSize.lg },
    };

    const variantTextStyles = {
      primary: { color: colors.text.inverse },
      secondary: { color: colors.text.primary },
      outline: { color: colors.primary[500] },
      ghost: { color: colors.primary[500] },
      danger: { color: colors.text.inverse },
    };

    return {
      ...baseStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
      ...textStyle,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), shadows.sm]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "ghost" ? colors.primary[500] : colors.text.inverse}
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

