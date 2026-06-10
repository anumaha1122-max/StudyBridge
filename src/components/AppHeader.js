import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function AppHeader({ title, navigation, showBack = true }) {
  const canGoBack = navigation?.canGoBack?.();

  return (
    <View style={styles.header}>
      {showBack && canGoBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}

      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: COLORS.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    textAlign: "center",
  },
});
