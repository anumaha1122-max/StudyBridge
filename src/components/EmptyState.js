import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import AppButton from "./AppButton";

export default function EmptyState({
  icon = "file-tray-outline",
  title = "No data found",
  message = "There is nothing to show right now.",
  actionTitle,
  onAction,
  color = COLORS.primary,
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { backgroundColor: color + "16" }]}>
        <Ionicons name={icon} size={42} color={color} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {actionTitle && onAction ? (
        <AppButton
          title={actionTitle}
          onPress={onAction}
          style={styles.button}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 12,
  },
  iconBox: {
    width: 86,
    height: 86,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
  },
  message: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    marginTop: 18,
    alignSelf: "stretch",
  },
});
