import React from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils/colors";

const getColor = (status = "") => {
  const value = String(status).toUpperCase();

  if (
    [
      "APPROVED",
      "VERIFIED",
      "REVIEWED",
      "COMPLETED",
      "PRESENT",
      "ACCEPTED",
      "ACTIVE",
      "READ",
      "SOLVED",
      "PASSED",
      "LINKED",
      "AWARDED",
    ].includes(value)
  ) {
    return {
      bg: COLORS.successLight,
      color: COLORS.success,
    };
  }

  if (
    [
      "PENDING",
      "REQUESTED",
      "SUBMITTED",
      "UPCOMING",
      "NEW",
      "ASSIGNED",
      "PRACTICE",
      "WAITING",
    ].includes(value)
  ) {
    return {
      bg: COLORS.warningLight,
      color: COLORS.warning,
    };
  }

  if (
    [
      "REJECTED",
      "ABSENT",
      "DISCIPLINE",
      "FAILED",
      "ERROR",
      "DANGER",
    ].includes(value)
  ) {
    return {
      bg: COLORS.dangerLight,
      color: COLORS.danger,
    };
  }

  return {
    bg: COLORS.primaryLight,
    color: COLORS.primary,
  };
};

export default function StatusBadge({ status }) {
  const color = getColor(status);

  return (
    <Text style={[styles.badge, { backgroundColor: color.bg, color: color.color }]}>
      {status}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "900",
    overflow: "hidden",
  },
});
