import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "@linked-all/config";

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brandTitle}>Linked All</Text>
        <Text style={styles.subtitle}>
          A pan-African digital ecosystem connecting consumers, vendors, and producers
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.features}>
        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: colors.primary[100] }]}>
            <Text style={styles.featureIconText}>🛍️</Text>
          </View>
          <Text style={styles.featureTitle}>Marketplace</Text>
          <Text style={styles.featureDescription}>
            Discover and purchase from thousands of verified vendors
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: colors.secondary[100] }]}>
            <Text style={styles.featureIconText}>💳</Text>
          </View>
          <Text style={styles.featureTitle}>LinkedPay Wallet</Text>
          <Text style={styles.featureDescription}>
            Secure payments with mobile money and LinkedCoin
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: colors.accent[100] }]}>
            <Text style={styles.featureIconText}>🚚</Text>
          </View>
          <Text style={styles.featureTitle}>Smart Logistics</Text>
          <Text style={styles.featureDescription}>
            Real-time tracking and reliable delivery
          </Text>
        </View>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Project Status: Phase 0 - MVP</Text>
        <View style={styles.statusBadges}>
          <View style={[styles.badge, styles.badgeSuccess]}>
            <Text style={styles.badgeTextSuccess}>✓ Monorepo</Text>
          </View>
          <View style={[styles.badge, styles.badgeSuccess]}>
            <Text style={styles.badgeTextSuccess}>✓ Types</Text>
          </View>
          <View style={[styles.badge, styles.badgeInfo]}>
            <Text style={styles.badgeTextInfo}>→ Mobile App</Text>
          </View>
          <View style={[styles.badge, styles.badgeGray]}>
            <Text style={styles.badgeTextGray}>Backend</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: colors.gray[600],
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.primary.DEFAULT,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary.DEFAULT,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  secondaryButtonText: {
    color: colors.primary.DEFAULT,
    fontSize: 18,
    fontWeight: "600",
  },
  features: {
    padding: 16,
    gap: 16,
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  featureIconText: {
    fontSize: 32,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.dark,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
  },
  statusCard: {
    margin: 16,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: colors.dark,
  },
  statusBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeSuccess: {
    backgroundColor: colors.success.light,
  },
  badgeTextSuccess: {
    color: colors.success.dark,
    fontSize: 12,
    fontWeight: "600",
  },
  badgeInfo: {
    backgroundColor: colors.info.light,
  },
  badgeTextInfo: {
    color: colors.info.dark,
    fontSize: 12,
    fontWeight: "600",
  },
  badgeGray: {
    backgroundColor: colors.gray[100],
  },
  badgeTextGray: {
    color: colors.gray[600],
    fontSize: 12,
    fontWeight: "600",
  },
});
