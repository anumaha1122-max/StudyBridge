import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function DayScheduleCard({
  day = "Monday",
  periods = [],
  color = COLORS.primary,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.dayIcon, { backgroundColor: color + "17" }]}>
          <Ionicons name="calendar-outline" size={22} color={color} />
        </View>

        <View>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.sub}>{periods.length} periods scheduled</Text>
        </View>
      </View>

      {periods.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No periods added.</Text>
        </View>
      ) : (
        periods.map((item, index) => (
          <View key={item.id || index} style={styles.periodRow}>
            <View style={[styles.periodNo, { backgroundColor: color + "14" }]}>
              <Text style={[styles.periodNoText, { color }]}>
                {item.period || index + 1}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.subject}>{item.subject || "Subject"}</Text>
              <Text style={styles.meta}>
                {(item.time || "Time not set") +
                  (item.teacher ? " • " + item.teacher : "") +
                  (item.room ? " • " + item.room : "")}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  dayIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },
  sub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },
  periodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  periodNo: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  periodNoText: {
    fontSize: 13,
    fontWeight: "900",
  },
  subject: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },
  meta: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    lineHeight: 17,
  },
  empty: {
    backgroundColor: COLORS.background2,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
  },
});
