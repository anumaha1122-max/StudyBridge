import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon = "analytics-outline",
  color = COLORS.primary,
  trend,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: color + "17" }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>

        {trend ? (
          <View style={[styles.trendBox, { backgroundColor: color + "12" }]}>
            <Ionicons name="trending-up-outline" size={15} color={color} />
            <Text style={[styles.trendText, { color }]}>{trend}</Text>
          </View>
        ) : null}
      </View>

      <Text numberOfLines={1} style={styles.value}>{value}</Text>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>

      {subtitle ? <Text numberOfLines={2} style={styles.subtitle}>{subtitle}</Text> : null}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  trendBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },
  trendText: {
    fontSize: 10,
    fontWeight: "900",
  },
  value: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
    marginTop: 4,
  },
});
