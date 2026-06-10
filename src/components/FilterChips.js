import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils/colors";

export default function FilterChips({
  options = [],
  value,
  onChange,
  color = COLORS.primary,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((item) => {
        const label = item.label || item;
        const itemValue = item.value || item;
        const active = value === itemValue;

        return (
          <TouchableOpacity
            key={itemValue}
            activeOpacity={0.85}
            style={[
              styles.chip,
              active && {
                backgroundColor: color,
                borderColor: color,
              },
            ]}
            onPress={() => onChange(itemValue)}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
  },
  activeText: {
    color: COLORS.white,
  },
});
