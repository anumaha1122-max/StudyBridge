import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";

const roles = [
  {
    key: "ADMIN",
    title: "Admin",
    subtitle: "Manage school, users, fees and reports",
    icon: "shield-checkmark-outline",
    color: "#7C3AED",
  },
  {
    key: "TEACHER",
    title: "Teacher",
    subtitle: "Homework, attendance, marks and diary",
    icon: "school-outline",
    color: "#06B6D4",
  },
  {
    key: "STUDENT",
    title: "Student",
    subtitle: "Homework, exams, progress and doubts",
    icon: "book-outline",
    color: "#4F46E5",
  },
  {
    key: "PARENT",
    title: "Parent",
    subtitle: "Track child progress, fees and meetings",
    icon: "people-outline",
    color: "#16A34A",
  },
];

export default function RoleSelectScreen({ navigation }) {
  const { selectRole } = useAuth();

  const openLogin = (role) => {
    selectRole(role);
    navigation.navigate("Login", { role });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select how you want to continue in StudyBridge.
        </Text>

        <View style={styles.grid}>
          {roles.map((item) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.88}
              style={styles.card}
              onPress={() => openLogin(item.key)}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + "16" }]}>
                <Ionicons name={item.icon} size={30} color={item.color} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Already have account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 28,
  },
  grid: {
    gap: 14,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },
  cardSub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  loginLink: {
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "900",
  },
});
