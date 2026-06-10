import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function FeatureCard({ title, icon = "grid-outline", onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <Ionicons name={icon} size={24} color={COLORS.primary} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "31%",
    minHeight: 92,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    marginTop: 8,
    fontSize: 11,
    textAlign: "center",
    color: COLORS.text,
    fontWeight: "800",
  },
});
