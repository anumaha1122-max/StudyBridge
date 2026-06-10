import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function SuccessModal({
  visible,
  title = "Success",
  message = "Action completed successfully.",
  buttonText = "Done",
  onClose,
  icon = "checkmark-circle",
  color = COLORS.success,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: color + "16" }]}>
            <Ionicons name={icon} size={58} color={color} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { backgroundColor: color }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function InfoModal({
  visible,
  title = "Info",
  message = "",
  buttonText = "Okay",
  onClose,
}) {
  return (
    <SuccessModal
      visible={visible}
      title={title}
      message={message}
      buttonText={buttonText}
      onClose={onClose}
      icon="information-circle"
      color={COLORS.primary}
    />
  );
}

export function ErrorModal({
  visible,
  title = "Error",
  message = "",
  buttonText = "Close",
  onClose,
}) {
  return (
    <SuccessModal
      visible={visible}
      title={title}
      message={message}
      buttonText={buttonText}
      onClose={onClose}
      icon="alert-circle"
      color={COLORS.danger}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  message: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    width: "100%",
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
  },
});
