import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function EmptyState({ title = "No data found", subtitle = "Content will appear here." }) {
  return (
    <View style={styles.box}>
      <Ionicons name="file-tray-outline" size={42} color={COLORS.muted} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    marginTop: 10,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 13,
    textAlign: "center",
  },
});
