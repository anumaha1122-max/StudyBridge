import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";

const roles = [
  {
    role: "STUDENT",
    title: "Student",
    icon: "school-outline",
    desc: "Homework, exams, tasks, progress",
  },
  {
    role: "TEACHER",
    title: "Teacher",
    icon: "person-outline",
    desc: "Classes, homework, marks, diary",
  },
  {
    role: "PARENT",
    title: "Parent",
    icon: "people-outline",
    desc: "Child progress and communication",
  },
  {
    role: "ADMIN",
    title: "Admin",
    icon: "settings-outline",
    desc: "School users, classes, reports",
  },
];

export default function RoleSelectScreen({ navigation }) {
  const { setSelectedRole } = useAuth();

  const chooseRole = (role) => {
    setSelectedRole(role);
    navigation.navigate("Login", { role });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Login as student, teacher, parent, or admin</Text>

      <View style={styles.grid}>
        {roles.map((item) => (
          <TouchableOpacity
            key={item.role}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => chooseRole(item.role)}
          >
            <Ionicons name={item.icon} size={38} color={COLORS.primary} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    minHeight: 170,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 12,
  },
  cardText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
});
