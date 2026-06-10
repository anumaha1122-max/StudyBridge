import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import AppHeader from "../../components/AppHeader";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";

export default function AdminProfileScreen({ navigation }) {
  const app = useApp();
  const { currentUser, logout } = useAuth();

  const [success, setSuccess] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  const handleResetData = async () => {
    if (app.resetAppData) {
      await app.resetAppData();
      setSuccess("Local app data reset successfully.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Admin Profile" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>School Admin</Text>
          <Text style={styles.heroSub}>
            Manage StudyBridge school settings, local data, and admin account.
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-circle-outline" size={78} color={COLORS.primary} />
          </View>

          <Text style={styles.name}>{currentUser?.name || "School Admin"}</Text>
          <Text style={styles.role}>{currentUser?.role || "ADMIN"}</Text>
          <Text style={styles.email}>{currentUser?.email || "admin@studybridge.com"}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Admin Access</Text>

          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>Manage students, teachers and parents</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="business-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>Manage classes, subjects and timetable</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>Manage fees and payment verification</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="bar-chart-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>View reports and school activity</Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <AppButton
            title="Reset Local App Data"
            variant="outline"
            onPress={handleResetData}
          />

          <AppButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>

        <SuccessModal
          visible={!!success}
          title="Profile"
          message={success}
          onClose={() => setSuccess("")}
        />
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
    paddingBottom: 110,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
  },
  heroSub: {
    color: "#CBD5E1",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 20,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 30,
    backgroundColor: COLORS.primary + "12",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
  },
  role: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4,
  },
  email: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  infoTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 9,
  },
  infoText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "700",
  },
  actionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutButton: {
    backgroundColor: COLORS.danger,
    marginTop: 8,
  },
});