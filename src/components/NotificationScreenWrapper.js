import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import NotificationCard from "./NotificationCard";
import EmptyState from "./EmptyState";

const filters = ["ALL", "NEW", "READ"];

export default function NotificationScreenWrapper({
  navigation,
  role = "USER",
  title = "Notifications",
  subtitle = "Latest updates and alerts",
  color = COLORS.primary,
  icon = "notifications-outline",
  notifications = [],
  onMarkAllRead,
  onMarkRead,
}) {
  const [filter, setFilter] = useState("ALL");

  const filteredNotifications = useMemo(() => {
    if (filter === "NEW") {
      return notifications.filter((item) => !item.read);
    }

    if (filter === "READ") {
      return notifications.filter((item) => item.read);
    }

    return notifications;
  }, [filter, notifications]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={[styles.circleOne, { backgroundColor: color + "55" }]} />
          <View style={styles.circleTwo} />

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={COLORS.white} />
          </TouchableOpacity>

          <View style={[styles.iconBox, { backgroundColor: color }]}>
            <Ionicons name={icon} size={34} color={COLORS.white} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{role} ALERTS</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color }]}>{notifications.length}</Text>
            <Text style={styles.summaryLabel}>Total Alerts</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.danger }]}>{unreadCount}</Text>
            <Text style={styles.summaryLabel}>Unread</Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          {filters.map((item) => {
            const active = filter === item;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.85}
                style={[
                  styles.filterChip,
                  active && {
                    backgroundColor: color,
                    borderColor: color,
                  },
                ]}
                onPress={() => setFilter(item)}
              >
                <Text style={[styles.filterText, active && styles.activeFilterText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {notifications.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.markAllBtn}
            onPress={onMarkAllRead}
          >
            <Ionicons name="checkmark-done-outline" size={20} color={color} />
            <Text style={[styles.markAllText, { color }]}>Mark all as read</Text>
          </TouchableOpacity>
        ) : null}

        {filteredNotifications.length === 0 ? (
          <EmptyState
            icon="notifications-off-outline"
            title="No notifications"
            message="You do not have notifications in this category."
          />
        ) : (
          filteredNotifications.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              onPress={() => {
                if (onMarkRead) {
                  onMarkRead(item.id);
                }
              }}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 32,
    padding: 22,
    minHeight: 250,
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 16,
  },
  circleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -60,
    top: -58,
  },
  circleTwo: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    left: -58,
    bottom: -58,
    backgroundColor: "rgba(6,182,212,0.22)",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 8,
  },
  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginTop: 14,
  },
  roleText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: "900",
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
  },
  activeFilterText: {
    color: COLORS.white,
  },
  markAllBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 12,
  },
  markAllText: {
    fontSize: 13,
    fontWeight: "900",
  },
});
