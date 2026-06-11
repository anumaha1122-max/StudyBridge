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
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";
import AppButton from "../../components/AppButton";

const roles = [
  {
    key: "STUDENT",
    title: "Student",
    subtitle: "Homework, exams, notes, doubts and progress",
    icon: "school-outline",
    tone: COLORS.primary,
    bg: COLORS.primaryLight,
  },
  {
    key: "TEACHER",
    title: "Teacher",
    subtitle: "Classes, attendance, marks, diary and reviews",
    icon: "library-outline",
    tone: COLORS.secondary,
    bg: COLORS.secondaryLight,
  },
  {
    key: "PARENT",
    title: "Parent",
    subtitle: "Track child progress, fees, meetings and alerts",
    icon: "people-outline",
    tone: COLORS.accent,
    bg: COLORS.accentLight,
  },
  {
    key: "ADMIN",
    title: "Admin",
    subtitle: "Manage school, users, fees, reports and events",
    icon: "shield-checkmark-outline",
    tone: COLORS.purple,
    bg: COLORS.purpleLight,
  },
];

export default function RoleSelectScreen({ navigation }) {
  const { setSelectedRole } = useAuth();
  const [role, setRole] = useState("STUDENT");

  const continueLogin = () => {
    if (setSelectedRole) {
      setSelectedRole(role);
    }

    navigation.navigate("Login", { role });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />

          <View style={styles.logo}>
            <Ionicons name="school" size={34} color={COLORS.white} />
          </View>

          <Text style={styles.heroTitle}>Choose Your Role</Text>
          <Text style={styles.heroSub}>
            Select how you want to use StudyBridge today.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Continue as</Text>

        {roles.map((item) => {
          const active = role === item.key;

          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.86}
              style={[styles.roleCard, active && styles.activeRoleCard]}
              onPress={() => setRole(item.key)}
            >
              <View style={[styles.roleIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={25} color={item.tone} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.roleTitle}>{item.title}</Text>
                <Text style={styles.roleSub}>{item.subtitle}</Text>
              </View>

              <View style={[styles.radio, active && styles.radioActive]}>
                {active ? <View style={styles.radioDot} /> : null}
              </View>
            </TouchableOpacity>
          );
        })}

        <AppButton title="Continue to Login" onPress={continueLogin} />

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register", { role })}
        >
          <Text style={styles.registerText}>
            New user? <Text style={styles.registerBold}>Create account</Text>
          </Text>
        </TouchableOpacity>
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
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 32,
    padding: 22,
    minHeight: 220,
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 22,
  },
  circleOne: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -55,
    top: -45,
    backgroundColor: "rgba(79,70,229,0.45)",
  },
  circleTwo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    left: -50,
    bottom: -50,
    backgroundColor: "rgba(6,182,212,0.22)",
  },
  logo: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "900",
  },
  heroSub: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 8,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },
  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  activeRoleCard: {
    borderColor: COLORS.primary,
    backgroundColor: "#F8FAFF",
  },
  roleIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  roleTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },
  roleSub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  registerLink: {
    alignItems: "center",
    paddingVertical: 18,
  },
  registerText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
  },
  registerBold: {
    color: COLORS.primary,
    fontWeight: "900",
  },
});
