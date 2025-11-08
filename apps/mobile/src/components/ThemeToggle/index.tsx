/**
 * ThemeToggle Component
 * Theme toggle switch component
 */

import React from "react";
import { Switch, View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, typography, spacing } from "@/assets/themes";

export interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (value: boolean) => void;
  style?: ViewStyle;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Dark Mode</Text>
      <Switch
        value={isDark}
        onValueChange={onToggle}
        trackColor={{ false: colors.gray[300], true: colors.primary[500] }}
        thumbColor={colors.background.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing[2],
  },
  label: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
});

export default ThemeToggle;

