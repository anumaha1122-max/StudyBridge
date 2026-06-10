import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function ScreenHeader({
  navigation,
  title,
  subtitle,
  icon = "apps-outline",
  color = COLORS.primary,
  rightIcon,
  onRightPress,
  showBack = true,
}) {
  return (
    <View style={styles.hero}>
      <View style={[styles.circleOne, { backgroundColor: color + "55" }]} />
      <View style={styles.circleTwo} />

      <View style={styles.topRow}>
        {showBack && navigation ? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.iconButton}
            onPress={onRightPress}
          >
            <Ionicons name={rightIcon} size={22} color={COLORS.white} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={[styles.mainIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={32} color={COLORS.white} />
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 32,
    padding: 22,
    minHeight: 220,
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 16,
  },
  circleOne: {
    position: "absolute",
    width: 185,
    height: 185,
    borderRadius: 92.5,
    right: -58,
    top: -52,
  },
  circleTwo: {
    position: "absolute",
    width: 155,
    height: 155,
    borderRadius: 77.5,
    left: -55,
    bottom: -55,
    backgroundColor: "rgba(6,182,212,0.22)",
  },
  topRow: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainIcon: {
    width: 68,
    height: 68,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34,
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 8,
  },
});
