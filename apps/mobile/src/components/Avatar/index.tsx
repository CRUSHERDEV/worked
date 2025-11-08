/**
 * Avatar Component
 * User avatar component
 */

import React from "react";
import { View, Image, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, typography, borderRadius } from "@/assets/themes";

export interface AvatarProps {
  source?: { uri: string };
  name?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 40,
  style,
}) => {
  const getInitials = (): string => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
            {getInitials()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    backgroundColor: colors.primary[500],
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontFamily: typography.fontFamily.bold,
    color: colors.text.inverse,
  },
});

export default Avatar;

