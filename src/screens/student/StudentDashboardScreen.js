import React, { useMemo, useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import AppHeader from "../../components/AppHeader";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";

export default function StudentDashboardScreen({ navigation, route }) {
  const app = useApp();
  const { currentUser, logout } = useAuth();
  const studentId = currentUser?.studentId || 1;
  const [success, setSuccess] = useState("");
  
  const dashboard = app.getStudentDashboard
    ? app.getStudentDashboard(studentId)
    : {
        student: app.students.find((s) => s.id === studentId),
        pendingHomeworkCount: app.homework.length,
        upcomingExamCount: app.exams.length,
        attendancePercentage: 0,
        performancePercentage: 0,
        feeDueCount: app.fees.length,
        behaviorScore: 0,
        achievementCount: app.achievements.length,
      };

  const quick = [
    ["Homework", "StudentHomework", "book-outline"],
    ["Exams", "ExamPlanner", "calendar-outline"],
    ["Tasks", "DailyTasks", "checkbox-outline"],
    ["Study Plan", "StudyPlan", "map-outline"],
    ["Progress", "StudentProgress", "trending-up-outline"],
    ["Notes", "StudentNotes", "document-text-outline"],
    ["Ask Doubt", "AskDoubt", "help-circle-outline"],
    ["Timetable", "StudentTimetable", "time-outline"],
    ["Diary", "StudentDailyDiary", "journal-outline"],
    ["Fees", "StudentFees", "card-outline"],
    ["ID Card", "StudentDigitalId", "id-card-outline"],
    ["Badges", "StudentAchievements", "ribbon-outline"],
  ];

  const notifications = app.notifications.filter(
    (n) => n.userRole === "STUDENT" && (!n.userId || n.userId === studentId)
  );

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Student Dashboard" navigation={navigation} showBack={false} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Hello, {dashboard.student?.name || currentUser?.name}</Text>
          <Text style={styles.heroSub}>
            Track homework, exams, tasks, attendance, notes, doubts, fees and progress.
          </Text>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.pendingHomeworkCount}</Text>
            <Text style={styles.statLabel}>Pending HW</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.upcomingExamCount}</Text>
            <Text style={styles.statLabel}>Exams</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.attendancePercentage}%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dashboard.performancePercentage}%</Text>
            <Text style={styles.statLabel}>Performance</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        {quick.map((item) => (
          <SCard
            key={item[1]}
            title={item[0]}
            subtitle="Open student module"
            icon={item[2]}
            onPress={() => navigation.navigate(item[1])}
          />
        ))}

        <Text style={styles.sectionTitle}>Latest Notifications</Text>

        {notifications.length === 0 ? (
          <SCard title="No notifications" subtitle="Student updates will appear here." icon="notifications-outline" />
        ) : (
          notifications.slice(0, 5).map((n) => (
            <SCard
              key={n.id}
              title={n.title}
              subtitle={n.message}
              status={n.read ? "READ" : "NEW"}
              icon="notifications-outline"
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );

}

const SCard = ({ title, subtitle, status, icon = "document-text-outline", onPress, children }) => (
  <TouchableOpacity activeOpacity={onPress ? 0.85 : 1} onPress={onPress} style={styles.card}>
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
  </TouchableOpacity>
);

const PickerRow = ({ label, children }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.chipRow}>{children}</View>
  </View>
);

const Chip = ({ title, active, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={[styles.chip, active && styles.activeChip]}
  >
    <Text style={[styles.chipText, active && styles.activeChipText]}>{title}</Text>
  </TouchableOpacity>
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
    fontSize: 23,
    fontWeight: "900",
  },
  heroSub: {
    color: "#CBD5E1",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
    marginTop: 8,
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
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
  },
  activeChipText: {
    color: COLORS.white,
  },
});
