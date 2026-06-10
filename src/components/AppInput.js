import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export default function AppInput({ label, error, style, inputStyle, ...props }) {
  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        placeholderTextColor={COLORS.muted}
        style={[styles.input, error && styles.errorBorder, inputStyle]}
        {...props}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "800",
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 14,
    color: COLORS.text,
    fontSize: 14,
  },
  errorBorder: {
    borderColor: COLORS.danger,
  },
  error: {
    marginTop: 5,
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: "700",
  },
});
