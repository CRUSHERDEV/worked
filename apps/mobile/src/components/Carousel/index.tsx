/**
 * Carousel Component
 * Horizontal scrolling carousel component
 */

import React from "react";
import { ScrollView, View, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "@/assets/themes";

export interface CarouselProps {
  children: React.ReactNode[];
  style?: ViewStyle;
}

export const Carousel: React.FC<CarouselProps> = ({ children, style }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {children.map((child, index) => (
        <View key={index} style={styles.item}>
          {child}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
  },
  item: {
    marginRight: spacing[3],
  },
});

export default Carousel;

