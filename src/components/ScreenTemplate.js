import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import AppHeader from "./AppHeader";
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import StatCard from "./StatCard";
import FeatureCard from "./FeatureCard";
import SectionHeader from "./SectionHeader";
import StatusBadge from "./StatusBadge";
import SuccessModal from "./SuccessModal";

const actions = {
  STUDENT: [
    ["Homework", "StudentHomework", "book-outline"],
    ["Exams", "ExamPlanner", "calendar-outline"],
    ["Tasks", "DailyTasks", "checkbox-outline"],
    ["Progress", "StudentProgress", "trending-up-outline"],
    ["Notes", "StudentNotes", "document-text-outline"],
    ["Doubts", "AskDoubt", "help-circle-outline"],
    ["Timetable", "StudentTimetable", "time-outline"],
    ["Diary", "StudentDailyDiary", "journal-outline"],
    ["Leave", "StudentLeaveRequest", "mail-outline"],
    ["Fees", "StudentFees", "card-outline"],
    ["ID Card", "StudentDigitalId", "id-card-outline"],
    ["Badges", "StudentAchievements", "ribbon-outline"],
  ],
  TEACHER: [
    ["Classes", "TeacherClasses", "school-outline"],
    ["Assign HW", "AssignHomework", "book-outline"],
    ["Submissions", "HomeworkSubmissions", "documents-outline"],
    ["Attendance", "Attendance", "calendar-outline"],
    ["Create Exam", "CreateExam", "create-outline"],
    ["Marks", "UploadMarks", "bar-chart-outline"],
    ["Notes", "UploadNotes", "cloud-upload-outline"],
    ["Diary", "CreateDailyDiary", "journal-outline"],
    ["Leaves", "TeacherLeaveRequests", "mail-outline"],
    ["Meetings", "TeacherMeetingRequests", "people-outline"],
    ["Behavior", "TeacherBehavior", "star-outline"],
    ["Doubts", "TeacherDoubtBoard", "help-circle-outline"],
  ],
  PARENT: [
    ["Performance", "ChildPerformance", "trending-up-outline"],
    ["Homework", "ChildHomework", "book-outline"],
    ["Attendance", "ChildAttendance", "calendar-outline"],
    ["Marks", "ChildMarks", "bar-chart-outline"],
    ["Chat", "ParentChat", "chatbubble-outline"],
    ["Meeting", "ParentMeetingRequest", "people-outline"],
    ["Diary", "ChildDailyDiary", "journal-outline"],
    ["Leave", "ParentLeaveRequest", "mail-outline"],
    ["Fees", "ParentFees", "card-outline"],
    ["ID Card", "ChildDigitalId", "id-card-outline"],
    ["Behavior", "ChildBehavior", "star-outline"],
    ["Badges", "ChildAchievements", "ribbon-outline"],
  ],
  ADMIN: [
    ["Students", "ManageStudents", "people-outline"],
    ["Teachers", "ManageTeachers", "school-outline"],
    ["Parents", "ManageParents", "person-outline"],
    ["Classes", "ManageClasses", "business-outline"],
    ["Subjects", "ManageSubjects", "library-outline"],
    ["Assign", "AssignTeacher", "git-branch-outline"],
    ["Fees", "ManageFees", "cash-outline"],
    ["Events", "SchoolEvents", "calendar-outline"],
    ["Reports", "Reports", "bar-chart-outline"],
    ["Timetable", "ManageTimetable", "time-outline"],
    ["Leaves", "ManageLeaveRequests", "mail-outline"],
    ["IDs", "DigitalIdManagement", "id-card-outline"],
  ],
};

export default function ScreenTemplate({ navigation, title, role, type = "list" }) {
  const { currentUser, logout } = useAuth();
  const app = useApp();

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    message: "",
    date: "",
    amount: "",
  });

  const stats = useMemo(() => {
    if (role === "STUDENT") {
      return [
        ["Homework", app.homework.length, "book-outline"],
        ["Attendance", "94%", "calendar-outline"],
        ["Performance", "82%", "trending-up-outline"],
        ["Fees", app.fees.length, "card-outline"],
      ];
    }

    if (role === "TEACHER") {
      return [
        ["Students", app.students.length, "people-outline"],
        ["Submissions", app.homeworkSubmissions.length, "documents-outline"],
        ["Leaves", app.leaveRequests.length, "mail-outline"],
        ["Doubts", app.doubts.length, "help-circle-outline"],
      ];
    }

    if (role === "PARENT") {
      return [
        ["Performance", "82%", "trending-up-outline"],
        ["Attendance", "94%", "calendar-outline"],
        ["Pending HW", app.homework.length, "book-outline"],
        ["Fees Due", app.fees.length, "card-outline"],
      ];
    }

    return [
      ["Students", app.students.length, "people-outline"],
      ["Teachers", app.teachers.length, "school-outline"],
      ["Classes", app.classes.length, "business-outline"],
      ["Fees", app.fees.length, "cash-outline"],
    ];
  }, [role, app]);

  const listItems = useMemo(() => {
    const common = [
      ...app.homework.map((x) => ({
        title: x.title,
        subtitle: (x.subject || "Subject") + " • Due " + (x.dueDate || ""),
        status: x.status || "PENDING",
      })),
      ...app.exams.map((x) => ({
        title: x.title,
        subtitle: (x.subject || "Subject") + " • " + (x.date || ""),
        status: x.status || "UPCOMING",
      })),
      ...app.events.map((x) => ({
        title: x.title,
        subtitle: x.date || "Event",
        status: "EVENT",
      })),
      ...app.notifications.map((x) => ({
        title: x.title,
        subtitle: x.message,
        status: x.read ? "READ" : "NEW",
      })),
    ];

    if (title.toLowerCase().includes("fee")) {
      return app.fees.map((x) => ({
        title: x.title,
        subtitle: "₹" + x.amount + " • Due " + x.dueDate,
        status: x.status,
      }));
    }

    if (title.toLowerCase().includes("achievement")) {
      return app.achievements.map((x) => ({
        title: x.title,
        subtitle: x.description,
        status: "AWARDED",
      }));
    }

    if (title.toLowerCase().includes("behavior")) {
      return app.behavior.map((x) => ({
        title: x.type,
        subtitle: x.remark,
        status: String(x.points),
      }));
    }

    if (title.toLowerCase().includes("timetable")) {
      return app.timetable.map((x) => ({
        title: x.subject,
        subtitle: x.day + " • " + x.time + " • " + x.teacher,
        status: "PERIOD " + x.period,
      }));
    }

    if (title.toLowerCase().includes("diary")) {
      return app.diary.map((x) => ({
        title: x.date,
        subtitle: x.summary + " • Homework: " + x.homework,
        status: x.acknowledged ? "ACKNOWLEDGED" : "PENDING",
      }));
    }

    if (title.toLowerCase().includes("doubt")) {
      return app.doubts.map((x) => ({
        title: x.subject,
        subtitle: x.doubt,
        status: x.status,
      }));
    }

    return common;
  }, [title, app]);

  const submitDemo = () => {
    app.addNotification({
      title: title + " Updated",
      message: "Dummy action completed. Connect backend API later.",
    });

    setModal(true);

    setForm({
      title: "",
      subject: "",
      message: "",
      date: "",
      amount: "",
    });
  };

  const isProfile = title.toLowerCase().includes("profile");

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title={title} navigation={navigation} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.greeting}>Hello, {currentUser?.name || role}</Text>
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.heroText}>
              StudyBridge connects students, teachers, parents, and admin in one smart education platform.
            </Text>
          </View>

          {type === "dashboard" ? (
            <>
              <SectionHeader title="Today Summary" subtitle="Role-based overview" />

              <View style={styles.statsGrid}>
                {stats.map(([label, value, icon]) => (
                  <StatCard key={label} title={label} value={value} icon={icon} />
                ))}
              </View>

              <SectionHeader title="Quick Actions" subtitle="Open important features" />

              <View style={styles.featureGrid}>
                {(actions[role] || []).map(([label, route, icon]) => (
                  <FeatureCard
                    key={route}
                    title={label}
                    icon={icon}
                    onPress={() => navigation.navigate(route)}
                  />
                ))}
              </View>
            </>
          ) : isProfile ? (
            <View style={styles.profileCard}>
              <Ionicons name="person-circle-outline" size={88} color={COLORS.primary} />

              <Text style={styles.profileName}>{currentUser?.name}</Text>
              <Text style={styles.profileRole}>{currentUser?.role}</Text>
              <Text style={styles.profileEmail}>{currentUser?.email}</Text>

              <View style={styles.profileInfo}>
                <Text style={styles.infoText}>StudyBridge Account</Text>
                <Text style={styles.infoMuted}>Backend integration ready</Text>
              </View>

              <AppButton title="Logout" onPress={logout} style={styles.logoutBtn} />
            </View>
          ) : type === "form" ? (
            <>
              <SectionHeader title="Create / Submit" subtitle="This form is ready for backend API" />

              <View style={styles.formCard}>
                <AppInput
                  label="Title"
                  value={form.title}
                  onChangeText={(v) => setForm({ ...form, title: v })}
                  placeholder="Enter title"
                />

                <AppInput
                  label="Subject / Category"
                  value={form.subject}
                  onChangeText={(v) => setForm({ ...form, subject: v })}
                  placeholder="Enter subject or category"
                />

                <AppInput
                  label="Message / Description"
                  value={form.message}
                  onChangeText={(v) => setForm({ ...form, message: v })}
                  placeholder="Enter details"
                  multiline
                  inputStyle={styles.textArea}
                />

                <AppInput
                  label="Date / Amount / Value"
                  value={form.date || form.amount}
                  onChangeText={(v) => setForm({ ...form, date: v, amount: v })}
                  placeholder="Enter value"
                />

                <AppButton title="Save" onPress={submitDemo} />
              </View>
            </>
          ) : (
            <>
              <SectionHeader title="Records" subtitle="Dummy data now, backend API later" />

              {listItems.map((item, index) => (
                <TouchableOpacity key={index} activeOpacity={0.85} style={styles.listCard}>
                  <View style={styles.listLeft}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSub}>{item.subtitle}</Text>
                  </View>

                  <StatusBadge status={item.status} />
                </TouchableOpacity>
              ))}

              <SectionHeader title="Action" subtitle="Use this to test update flow" />
              <AppButton title={"Test " + title + " Action"} onPress={submitDemo} />
            </>
          )}

          <SuccessModal
            visible={modal}
            title="Saved"
            message="Dummy action completed. Later this will call Spring Boot API and WebSocket update."
            onClose={() => setModal(false)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    borderRadius: 26,
    padding: 20,
    marginBottom: 4,
  },
  greeting: {
    color: COLORS.sky,
    fontSize: 13,
    fontWeight: "800",
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 8,
  },
  heroText: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  listLeft: {
    flex: 1,
  },
  itemTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  itemSub: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  profileRole: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 4,
  },
  profileEmail: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },
  profileInfo: {
    marginTop: 16,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 14,
    width: "100%",
  },
  infoText: {
    color: COLORS.text,
    fontWeight: "900",
  },
  infoMuted: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
  },
  logoutBtn: {
    marginTop: 18,
    width: "100%",
  },
});
