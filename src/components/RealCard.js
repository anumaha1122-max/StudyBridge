import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import { getStatusColor } from "../utils/helpers";

export default function RealCard({
  title,
  subtitle,
  status,
  icon = "document-text-outline",
  onPress,
  children,
}) {
  const color = getStatusColor(status);

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.top}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={22} color={COLORS.primary} />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {status ? (
          <Text style={[styles.badge, { color, backgroundColor: color + "20" }]}>
            {status}
          </Text>
        ) : null}
      </View>

      {children ? <View style={styles.children}>{children}</View> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary + "15",
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  badge: {
    fontSize: 10,
    fontWeight: "900",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
    overflow: "hidden",
  },
  children: {
    marginTop: 12,
  },
});
