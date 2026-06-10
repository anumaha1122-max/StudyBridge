import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function StatCard({
  title,
  value,
  icon = "analytics-outline",
  tone = "primary",
}) {
  const tones = {
    primary: [COLORS.primary, COLORS.primaryLight],
    success: [COLORS.success, COLORS.successLight],
    warning: [COLORS.warning, COLORS.warningLight],
    danger: [COLORS.danger, COLORS.dangerLight],
    purple: [COLORS.purple, COLORS.purpleLight],
    secondary: [COLORS.secondary, COLORS.secondaryLight],
    accent: [COLORS.accent, COLORS.accentLight],
  };

  const [color, bg] = tones[tone] || tones.primary;

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>

      <Text numberOfLines={1} style={styles.value}>{value}</Text>
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  value: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "900",
  },
  title: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
    lineHeight: 17,
  },
});
