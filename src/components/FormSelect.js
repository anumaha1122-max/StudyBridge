import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export default function FormSelect({ label, options = [], value, onChange }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {options.map((option) => (
          <TouchableOpacity
            key={String(option.value)}
            activeOpacity={0.85}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
              value === option.value && styles.activeOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                value === option.value && styles.activeText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  activeOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
  },
  activeText: {
    color: COLORS.white,
  },
});
