import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function ToastMessage({
  type = "success",
  message,
}) {
  if (!message) return null;

  const config =
    type === "error"
      ? {
          color: COLORS.danger,
          bg: COLORS.dangerLight,
          icon: "alert-circle-outline",
        }
      : type === "warning"
      ? {
          color: COLORS.warning,
          bg: COLORS.warningLight,
          icon: "warning-outline",
        }
      : {
          color: COLORS.success,
          bg: COLORS.successLight,
          icon: "checkmark-circle-outline",
        };

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <Ionicons name={config.icon} size={20} color={config.color} />
      <Text style={[styles.text, { color: config.color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 14,
  },
  text: {
    flex: 1,
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 18,
  },
});
