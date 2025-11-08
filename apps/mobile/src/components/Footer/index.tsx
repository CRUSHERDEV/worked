/**
 * Footer Component
 * App footer component
 */

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, typography, spacing } from "@/assets/themes";

export interface FooterProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const Footer: React.FC<FooterProps> = ({ children, style }) => {
  return (
    <View style={[styles.footer, style]}>
      {children || (
        <Text style={styles.text}>
          © {new Date().getFullYear()} Linked All. All rights reserved.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: "center",
  },
});

export default Footer;

