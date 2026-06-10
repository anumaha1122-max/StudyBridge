import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils/colors";

export default function ProgressCard({
  title = "Progress",
  value = 0,
  subtitle = "",
  color = COLORS.primary,
}) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        <Text style={[styles.value, { color }]}>{safeValue}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: safeValue + "%", backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "900",
  },
  track: {
    height: 10,
    backgroundColor: COLORS.background2,
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
