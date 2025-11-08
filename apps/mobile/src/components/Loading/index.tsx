/**
 * Loading Component
 * Loading spinner and skeleton components
 */

import React from "react";
import { View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { colors, spacing } from "@/assets/themes";

export interface LoadingProps {
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "large",
  color = colors.primary[500],
  style,
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, style]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.primary,
  },
});

export default Loading;

