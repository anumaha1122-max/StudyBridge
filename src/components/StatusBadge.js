import React from "react";
import { Text, StyleSheet } from "react-native";
import { getStatusColor } from "../utils/helpers";

export default function StatusBadge({ status = "NEW" }) {
  const color = getStatusColor(status);

  return (
    <Text style={[styles.badge, { color, backgroundColor: color + "20" }]}>
      {status}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
  },
});
