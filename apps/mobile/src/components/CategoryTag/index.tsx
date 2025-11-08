/**
 * CategoryTag Component
 * Category tag component for product categories
 */

import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, typography, spacing, borderRadius } from "@/assets/themes";

export interface CategoryTagProps {
  label: string;
  onPress?: () => void;
  isActive?: boolean;
  style?: ViewStyle;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
  label,
  onPress,
  isActive = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.tag,
        isActive && styles.activeTag,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.secondary,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  activeTag: {
    backgroundColor: colors.primary[500],
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  activeText: {
    color: colors.text.inverse,
  },
});

export default CategoryTag;

