import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppHeader from "../../components/AppHeader";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";

export default function AdminDashboardScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");
  
  const dashboard = app.getAdminDashboard ? app.getAdminDashboard() : {
    totalStudents: app.students?.length || 0,
    totalTeachers: app.teachers?.length || 0,
    totalParents: app.parents?.length || 0,
    totalClasses: app.classes?.length || 0,
    pendingFeeVerifications: app.fees?.filter((f) => f.status === "SUBMITTED").length || 0,
    pendingLeaveRequests: app.leaveRequests?.filter((l) => l.status === "REQUESTED").length || 0,
  };

  const quick = [
    ["Students", "ManageStudents", "people-outline"],
    ["Teachers", "ManageTeachers", "school-outline"],
    ["Parents", "ManageParents", "person-outline"],
    ["Classes", "ManageClasses", "business-outline"],
    ["Subjects", "ManageSubjects", "library-outline"],
    ["Assign Teacher", "AssignTeacher", "git-branch-outline"],
    ["Fees", "ManageFees", "cash-outline"],
    ["Fee Verify", "FeeVerification", "shield-checkmark-outline"],
    ["Events", "SchoolEvents", "calendar-outline"],
    ["Reports", "Reports", "bar-chart-outline"],
    ["Timetable", "ManageTimetable", "time-outline"],
    ["Digital ID", "DigitalIdManagement", "id-card-outline"],
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Admin Dashboard" navigation={navigation} showBack={false} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>School Admin Panel</Text>
          <Text style={styles.heroSub}>
            Manage students, teachers, parents, classes, fees, reports, events, and approvals.
          </Text>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.totalStudents}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.totalTeachers}</Text>
            <Text style={styles.statLabel}>Teachers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.totalParents}</Text>
            <Text style={styles.statLabel}>Parents</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.totalClasses}</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.pendingFeeVerifications}</Text>
            <Text style={styles.statLabel}>Fee Proofs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.pendingLeaveRequests}</Text>
            <Text style={styles.statLabel}>Leave Requests</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        {quick.map((item) => (
          <TouchableOpacity key={item[1]} onPress={() => navigation.navigate(item[1])}>
            <AdminCard title={item[0]} subtitle="Open admin module" icon={item[2]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

}

const AdminCard = ({ title, subtitle, status, icon = "document-text-outline", children }) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSub}>{subtitle}</Text> : null}
      </View>
      {status ? <Text style={styles.badge}>{status}</Text> : null}
    </View>
    {children ? <View style={{ marginTop: 12 }}>{children}</View> : null}
  </View>
);

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
    lineHeight: 19,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 12,
  },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  cardSub: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  badge: {
    backgroundColor: COLORS.primary + "18",
    color: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "900",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: "900",
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
  },
});
