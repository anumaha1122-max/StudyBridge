import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  onClear,
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={21} color={COLORS.muted} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.softText}
        style={styles.input}
      />

      {value ? (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.clearBtn}
          onPress={onClear || (() => onChangeText(""))}
        >
          <Ionicons name="close" size={18} color={COLORS.white} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
    outlineStyle: "none",
  },
  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.muted,
    alignItems: "center",
    justifyContent: "center",
  },
});
