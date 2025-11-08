/**
 * Toast Component
 * Toast notification component
 */

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, typography, spacing, borderRadius } from "@/assets/themes";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  style?: ViewStyle;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  style,
}) => {
  const getTypeStyle = (): ViewStyle => {
    const types = {
      success: { backgroundColor: colors.success[500] },
      error: { backgroundColor: colors.error[500] },
      warning: { backgroundColor: colors.warning[500] },
      info: { backgroundColor: colors.info[500] },
    };
    return types[type];
  };

  return (
    <View style={[styles.toast, getTypeStyle(), style]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.md,
    marginHorizontal: spacing[4],
    marginVertical: spacing[2],
  },
  message: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.inverse,
  },
});

export default Toast;

