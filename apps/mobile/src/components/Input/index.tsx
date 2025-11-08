/**
 * Input Component
 * Reusable input component with variants
 */

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { colors, typography, spacing, borderRadius } from "@/assets/themes";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  variant?: "default" | "outlined" | "filled";
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  variant = "outlined",
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      marginBottom: spacing[4],
    };

    const variantStyles = {
      default: {},
      outlined: {
        borderWidth: 1,
        borderColor: error ? colors.error[500] : isFocused ? colors.primary[500] : colors.border.medium,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        backgroundColor: colors.background.primary,
      },
      filled: {
        backgroundColor: colors.background.secondary,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        borderWidth: 1,
        borderColor: error ? colors.error[500] : isFocused ? colors.primary[500] : "transparent",
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...containerStyle,
    };
  };

  const getInputStyle = (): TextStyle => {
    return {
      flex: 1,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.regular,
      color: colors.text.primary,
      padding: 0,
      ...inputStyle,
    };
  };

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={getInputStyle()}
          placeholderTextColor={colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    marginBottom: spacing[2],
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: spacing[2],
  },
  rightIcon: {
    marginLeft: spacing[2],
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.error[500],
    marginTop: spacing[1],
  },
  helperText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
});

export default Input;

