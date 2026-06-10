import React, { useState } from "react";
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
import AppButton from "./AppButton";
import SuccessModal from "./SuccessModal";

export default function ProfileScreenWrapper({
  navigation,
  currentUser,
  role = "USER",
  title = "Profile",
  subtitle = "Manage your account",
  icon = "person-outline",
  color = COLORS.primary,
  stats = [],
  menu = [],
  onLogout,
  onReset,
}) {
  const [success, setSuccess] = useState("");

  const handleReset = async () => {
    if (onReset) {
      await onReset();
      setSuccess("Local app data reset successfully.");
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
  };

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

          <View style={styles.heroTop}>
            <View style={[styles.avatar, { backgroundColor: color }]}>
              <Ionicons name={icon} size={38} color={COLORS.white} />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.notificationBtn}
              onPress={() => {
                const route =
                  role === "ADMIN"
                    ? "AdminNotifications"
                    : role === "TEACHER"
                    ? "TeacherNotifications"
                    : role === "PARENT"
                    ? "ParentNotifications"
                    : "StudentNotifications";

                navigation.navigate(route);
              }}
            >
              <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{currentUser?.name || title}</Text>
          <Text style={styles.email}>{currentUser?.email || "studybridge@app.com"}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{role} ACCOUNT</Text>
          </View>
        </View>

        <View style={styles.statGrid}>
          {stats.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: item.color + "17" }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text numberOfLines={1} style={styles.statValue}>
                {item.value}
              </Text>
              <Text numberOfLines={2} style={styles.statLabel}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <InfoRow icon="person-outline" label="Name" value={currentUser?.name || "User"} />
          <InfoRow icon="mail-outline" label="Email" value={currentUser?.email || "-"} />
          <InfoRow icon="call-outline" label="Phone" value={currentUser?.phone || "Not added"} />
          <InfoRow icon="shield-checkmark-outline" label="Role" value={role} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          {menu.map((item, index) => (
            <MenuRow
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              color={item.color || color}
              onPress={() => navigation.navigate(item.route)}
            />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <MenuRow
            icon="notifications-outline"
            title="Notifications"
            subtitle="View latest school updates"
            color={COLORS.primary}
            onPress={() => {
              const route =
                role === "ADMIN"
                  ? "AdminNotifications"
                  : role === "TEACHER"
                  ? "TeacherNotifications"
                  : role === "PARENT"
                  ? "ParentNotifications"
                  : "StudentNotifications";

              navigation.navigate(route);
            }}
          />

          <MenuRow
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help with StudyBridge"
            color={COLORS.secondary}
            onPress={() => setSuccess("Support feature will be connected with backend later.")}
          />

          <MenuRow
            icon="information-circle-outline"
            title="About StudyBridge"
            subtitle="Connect. Learn. Improve."
            color={COLORS.accent}
            onPress={() => setSuccess("StudyBridge is a smart school management and learning app.")}
          />
        </View>

        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>App Controls</Text>
          <Text style={styles.dangerSub}>
            Use reset only while testing local frontend data.
          </Text>

          <AppButton
            title="Reset Local App Data"
            variant="outline"
            onPress={handleReset}
            style={styles.resetBtn}
          />

          <AppButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutBtn}
          />
        </View>
      </ScrollView>

      <SuccessModal
        visible={!!success}
        title="StudyBridge"
        message={success}
        onClose={() => setSuccess("")}
      />
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <View style={styles.infoIcon}>
          <Ionicons name={icon} size={20} color={COLORS.primary} />
        </View>

        <View>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>
    </View>
  );
}

function MenuRow({ icon, title, subtitle, color, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.menuRow} onPress={onPress}>
      <View style={[styles.menuIcon, { backgroundColor: color + "17" }]}>
        <Ionicons name={icon} size={21} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSub}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={COLORS.softText} />
    </TouchableOpacity>
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
    overflow: "hidden",
    justifyContent: "flex-end",
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
  heroTop: {
    position: "absolute",
    left: 22,
    right: 22,
    top: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
  },
  email: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
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
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  statCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "900",
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
    lineHeight: 17,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },
  infoRow: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 3,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },
  menuSub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 3,
  },
  dangerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.dangerLight,
    marginBottom: 14,
  },
  dangerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  dangerSub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 14,
  },
  resetBtn: {
    marginBottom: 10,
  },
  logoutBtn: {
    backgroundColor: COLORS.danger,
  },
});
