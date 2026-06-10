import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "./AppButton";
import { COLORS } from "../utils/colors";

export default function SuccessModal({ visible, title, message, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={62} color={COLORS.success} />
          <Text style={styles.title}>{title || "Success"}</Text>
          <Text style={styles.message}>{message || "Action completed successfully."}</Text>
          <AppButton title="Done" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 10,
  },
  message: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    marginVertical: 10,
  },
});
