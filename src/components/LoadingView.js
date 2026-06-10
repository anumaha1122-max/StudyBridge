import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../utils/colors";

export default function LoadingView({
  message = "Loading...",
  color = COLORS.primary,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={color} />
      </View>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export function FullScreenLoading({
  message = "Preparing your data...",
  color = COLORS.primary,
}) {
  return (
    <View style={styles.full}>
      <View style={styles.card}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={color} />
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 12,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loaderBox: {
    width: 74,
    height: 74,
    borderRadius: 26,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  message: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
});
