import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function StatCard({ title, value, icon = "stats-chart-outline", color = COLORS.primary }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: color + "18" }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  value: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  title: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 3,
    fontWeight: "700",
  },
});
