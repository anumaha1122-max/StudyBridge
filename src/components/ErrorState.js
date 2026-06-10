import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import AppButton from "./AppButton";

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  actionTitle = "Try Again",
  onAction,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name="alert-circle-outline" size={44} color={COLORS.danger} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {onAction ? (
        <AppButton
          title={actionTitle}
          onPress={onAction}
          style={styles.button}
        />
      ) : null}
    </View>
  );
}

export function InlineError({ message }) {
  if (!message) return null;

  return (
    <View style={styles.inline}>
      <Ionicons name="alert-circle-outline" size={19} color={COLORS.danger} />
      <Text style={styles.inlineText}>{message}</Text>
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
    borderColor: COLORS.dangerLight,
    marginVertical: 12,
  },
  iconBox: {
    width: 86,
    height: 86,
    borderRadius: 30,
    backgroundColor: COLORS.dangerLight,
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
    backgroundColor: COLORS.danger,
  },
  inline: {
    backgroundColor: COLORS.dangerLight,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 14,
  },
  inlineText: {
    flex: 1,
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 18,
  },
});
