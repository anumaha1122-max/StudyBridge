import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import StatusBadge from "./StatusBadge";

export default function UserAvatar({ title = "UserAvatar", subtitle = "Ready for backend integration", status }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {status ? <StatusBadge status={status} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 8,
  },
});
