/**
 * Icon Component
 * Icon wrapper component
 */

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/assets/themes";

export interface IconProps {
  component: React.ReactNode;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  component,
  size = 24,
  color = colors.text.primary,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
        style,
      ]}
    >
      {component}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Icon;

