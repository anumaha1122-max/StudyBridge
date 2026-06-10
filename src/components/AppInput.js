import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils/colors";

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  multiline = false,
  editable = true,
  error,
  style,
}) {
  return (
    <View style={[styles.wrap, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.softText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        editable={editable}
        style={[
          styles.input,
          multiline && styles.multiline,
          !editable && styles.disabled,
          error && styles.errorInput,
        ]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },
  multiline: {
    minHeight: 98,
    paddingTop: 13,
    textAlignVertical: "top",
    lineHeight: 20,
  },
  disabled: {
    backgroundColor: COLORS.background2,
    color: COLORS.muted,
  },
  errorInput: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
  error: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
  },
});
