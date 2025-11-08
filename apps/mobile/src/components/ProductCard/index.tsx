/**
 * ProductCard Component
 * Product card component for marketplace
 */

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { colors, typography, spacing, borderRadius, shadows } from "@/assets/themes";
import { Badge } from "../Badge";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  discount?: number;
  rating?: number;
  onPress?: (id: string) => void;
  style?: ViewStyle;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  discount,
  rating,
  onPress,
  style,
}) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);

  const discountedPrice = discount
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(price * (1 - discount / 100))
    : null;

  return (
    <TouchableOpacity
      style={[styles.card, shadows.sm, style]}
      onPress={() => onPress?.(id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]} />
        )}
        {discount && (
          <Badge variant="error" style={styles.discountBadge}>
            -{discount}%
          </Badge>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{discountedPrice || formattedPrice}</Text>
          {discountedPrice && (
            <Text style={styles.originalPrice}>{formattedPrice}</Text>
          )}
        </View>
        {rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    marginBottom: spacing[4],
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    backgroundColor: colors.background.secondary,
  },
  discountBadge: {
    position: "absolute",
    top: spacing[2],
    right: spacing[2],
  },
  content: {
    padding: spacing[3],
  },
  name: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
    minHeight: 40,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  price: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary[500],
    marginRight: spacing[2],
  },
  originalPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.tertiary,
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
});

export default ProductCard;

