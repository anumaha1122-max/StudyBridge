import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../utils/colors";

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
}) {
  const buttonStyle = [
    styles.button,
    variant === "outline" && styles.outline,
    variant === "ghost" && styles.ghost,
    variant === "danger" && styles.danger,
    variant === "success" && styles.success,
    disabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.text,
    variant === "outline" && styles.outlineText,
    variant === "ghost" && styles.ghostText,
    textStyle,
  ];

  const loaderColor =
    variant === "outline" || variant === "ghost" ? COLORS.primary : COLORS.white;

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <Text numberOfLines={1} style={labelStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 4,
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  outlineText: {
    color: COLORS.primary,
  },
  ghost: {
    backgroundColor: COLORS.primaryLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  ghostText: {
    color: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.danger,
    shadowColor: COLORS.danger,
  },
  success: {
    backgroundColor: COLORS.success,
    shadowColor: COLORS.success,
  },
  disabled: {
    opacity: 0.55,
  },
});
