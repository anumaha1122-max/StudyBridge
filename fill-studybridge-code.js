const fs = require("fs");
const path = require("path");

const root = process.cwd();

const write = (file, code) => {
  const fullPath = path.join(root, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, code.trimStart(), "utf8");
  console.log("updated:", file);
};

const authScreens = [
  "SplashScreen",
  "OnBoardingScreen",
  "RoleSelectScreen",
  "LoginScreen",
  "RegisterScreen",
  "ForgotPasswordScreen",
];

const studentScreens = [
  "StudentDashboardScreen",
  "StudentHomeworkScreen",
  "HomeworkDetailsScreen",
  "SubmitHomeworkScreen",
  "ExamPlannerScreen",
  "ExamDetailsScreen",
  "StudyPlanScreen",
  "DailyTasksScreen",
  "AddTaskScreen",
  "RevisionScreen",
  "MockTestScreen",
  "MockTestResultScreen",
  "StudentProgressScreen",
  "WeakTopicsScreen",
  "StudentFeedbackScreen",
  "StudentEventsScreen",
  "StudentNotesScreen",
  "AskDoubtScreen",
  "DoubtDiscussionScreen",
  "StudentChatScreen",
  "StudentNotificationsScreen",
  "StudentProfileScreen",
  "StudentTimetableScreen",
  "StudentDailyDiaryScreen",
  "StudentLeaveRequestScreen",
  "StudentBehaviorScreen",
  "StudentAchievementsScreen",
  "StudentFeesScreen",
  "StudentDigitalIdScreen",
];

const teacherScreens = [
  "TeacherDashboardScreen",
  "TeacherClassesScreen",
  "StudentListScreen",
  "AssignHomeworkScreen",
  "HomeworkSubmissionsScreen",
  "CreateExamScreen",
  "UploadMarksScreen",
  "AttendanceScreen",
  "CreateTaskScreen",
  "UploadNotesScreen",
  "TeacherFeedbackScreen",
  "TeacherEventsScreen",
  "TeacherChatScreen",
  "TeacherNotificationsScreen",
  "TeacherProfileScreen",
  "TeacherTimetableScreen",
  "TeacherDailyDiaryScreen",
  "CreateDailyDiaryScreen",
  "TeacherLeaveRequestsScreen",
  "TeacherMeetingRequestsScreen",
  "TeacherBehaviorScreen",
  "AwardAchievementScreen",
  "StudyMaterialProgressScreen",
  "TeacherDoubtBoardScreen",
];

const parentScreens = [
  "ParentDashboardScreen",
  "ChildPerformanceScreen",
  "ChildHomeworkScreen",
  "ChildAttendanceScreen",
  "ChildExamScheduleScreen",
  "ChildMarksScreen",
  "ParentFeedbackScreen",
  "ParentEventsScreen",
  "ParentChatScreen",
  "ParentMeetingRequestScreen",
  "ParentNotificationsScreen",
  "ParentProfileScreen",
  "ChildTimetableScreen",
  "ChildDailyDiaryScreen",
  "ParentLeaveRequestScreen",
  "ChildBehaviorScreen",
  "ChildAchievementsScreen",
  "ParentFeesScreen",
  "ChildDigitalIdScreen",
];

const adminScreens = [
  "AdminDashboardScreen",
  "ManageStudentsScreen",
  "ManageTeachersScreen",
  "ManageParentsScreen",
  "ManageClassesScreen",
  "ManageSubjectsScreen",
  "AssignTeacherScreen",
  "SchoolAnnouncementsScreen",
  "SchoolEventsScreen",
  "ReportsScreen",
  "AdminNotificationsScreen",
  "AdminProfileScreen",
  "ManageTimetableScreen",
  "ManageFeesScreen",
  "FeeVerificationScreen",
  "ManageLeaveRequestsScreen",
  "ManageAchievementsScreen",
  "ManageBehaviorScreen",
  "ManageDailyDiaryScreen",
  "DigitalIdManagementScreen",
  "AdminMeetingReportsScreen",
];

const toRoute = (name) => name.replace("Screen", "");

const readable = (name) =>
  name
    .replace("Screen", "")
    .replace(/([A-Z])/g, " $1")
    .trim();

write(
  "App.js",
  `
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import { AppProvider } from "./src/context/AppContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </AuthProvider>
  );
}
`
);

write(
  "src/utils/colors.js",
  `
export const COLORS = {
  primary: "#2563EB",
  secondary: "#7C3AED",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  background: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  navy: "#020617",
  darkCard: "#0F172A",
  sky: "#38BDF8",
  purple: "#A78BFA",
  white: "#FFFFFF",
  black: "#000000",
};
`
);

write(
  "src/utils/constants.js",
  `
export const APP_NAME = "StudyBridge";
export const TAGLINE = "Connect. Learn. Improve.";

export const ROLES = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PARENT: "PARENT",
  ADMIN: "ADMIN",
};
`
);

write(
  "src/utils/config.js",
  `
export const USE_DUMMY_DATA = true;

export const API_BASE_URL = "http://localhost:8080/api";

// Android Emulator:
// export const API_BASE_URL = "http://10.0.2.2:8080/api";

// Physical Mobile:
// export const API_BASE_URL = "http://YOUR_SYSTEM_IP:8080/api";
`
);

write(
  "src/utils/helpers.js",
  `
export const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString();
};

export const getStatusColor = (status) => {
  const s = String(status || "").toUpperCase();

  if (["COMPLETED", "REVIEWED", "APPROVED", "VERIFIED", "PRESENT", "ANSWERED", "SOLVED"].includes(s)) {
    return "#22C55E";
  }

  if (["PENDING", "REQUESTED", "SUBMITTED", "UPCOMING", "NEW"].includes(s)) {
    return "#F59E0B";
  }

  if (["REJECTED", "LATE", "ABSENT", "OVERDUE", "DISCIPLINE"].includes(s)) {
    return "#EF4444";
  }

  return "#2563EB";
};

export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
`
);

write(
  "src/utils/validation.js",
  `
export const isEmail = (email) => /\\S+@\\S+\\.\\S+/.test(email);

export const validateLogin = ({ email, password }) => {
  if (!email) return "Email is required";
  if (!isEmail(email)) return "Enter a valid email";
  if (!password) return "Password is required";
  return "";
};

export const validateRequired = (value, label = "Field") => {
  if (!value || String(value).trim() === "") return label + " is required";
  return "";
};
`
);

write(
  "src/data/dummyData.js",
  `
export const dummyUsers = [
  {
    id: 1,
    name: "Rahul Student",
    email: "student@studybridge.com",
    password: "student123",
    role: "STUDENT",
    className: "10th A",
    rollNumber: "STU101",
  },
  {
    id: 2,
    name: "Anitha Teacher",
    email: "teacher@studybridge.com",
    password: "teacher123",
    role: "TEACHER",
    subject: "Mathematics",
  },
  {
    id: 3,
    name: "Suresh Parent",
    email: "parent@studybridge.com",
    password: "parent123",
    role: "PARENT",
    childName: "Rahul Student",
  },
  {
    id: 4,
    name: "School Admin",
    email: "admin@studybridge.com",
    password: "admin123",
    role: "ADMIN",
  },
];

export const initialData = {
  students: [
    { id: 1, name: "Rahul Student", className: "10th A", rollNumber: "STU101", performance: 82, attendance: 94 },
    { id: 2, name: "Priya Sharma", className: "10th A", rollNumber: "STU102", performance: 88, attendance: 96 },
    { id: 3, name: "Akhil Kumar", className: "9th B", rollNumber: "STU201", performance: 74, attendance: 89 },
  ],

  teachers: [
    { id: 1, name: "Anitha Teacher", subject: "Mathematics", className: "10th A" },
    { id: 2, name: "Ravi Sir", subject: "Science", className: "9th B" },
  ],

  parents: [
    { id: 1, name: "Suresh Parent", childName: "Rahul Student" },
    { id: 2, name: "Lakshmi Parent", childName: "Priya Sharma" },
  ],

  classes: [
    { id: 1, className: "10th", section: "A", students: 32 },
    { id: 2, className: "9th", section: "B", students: 28 },
    { id: 3, className: "8th", section: "A", students: 30 },
  ],

  subjects: [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
    { id: 3, name: "English" },
    { id: 4, name: "Social" },
    { id: 5, name: "Telugu" },
  ],

  homework: [
    { id: 1, title: "Math Exercise 4.2", subject: "Mathematics", teacher: "Anitha Teacher", dueDate: "2026-06-15", status: "PENDING" },
    { id: 2, title: "Science Lab Notes", subject: "Science", teacher: "Ravi Sir", dueDate: "2026-06-16", status: "SUBMITTED" },
    { id: 3, title: "English Essay", subject: "English", teacher: "Mary Madam", dueDate: "2026-06-18", status: "REVIEWED" },
  ],

  homeworkSubmissions: [
    { id: 1, student: "Rahul Student", homework: "Science Lab Notes", status: "SUBMITTED", remark: "" },
  ],

  exams: [
    { id: 1, title: "Math Unit Test", subject: "Mathematics", date: "2026-06-20", syllabus: "Algebra, Geometry", status: "UPCOMING" },
    { id: 2, title: "Science Test", subject: "Science", date: "2026-06-24", syllabus: "Light, Sound", status: "UPCOMING" },
  ],

  marks: [
    { id: 1, subject: "Mathematics", marks: 86, total: 100, grade: "A" },
    { id: 2, subject: "Science", marks: 78, total: 100, grade: "B" },
  ],

  attendance: [
    { id: 1, date: "2026-06-10", status: "PRESENT" },
    { id: 2, date: "2026-06-09", status: "PRESENT" },
    { id: 3, date: "2026-06-08", status: "ABSENT" },
  ],

  tasks: [
    { id: 1, title: "Revise Algebra", priority: "HIGH", status: "PENDING" },
    { id: 2, title: "Read Science Chapter 2", priority: "MEDIUM", status: "COMPLETED" },
  ],

  studyPlans: [
    { id: 1, subject: "Mathematics", chapter: "Algebra", progress: 70, status: "IN_PROGRESS" },
  ],

  weakTopics: [
    { id: 1, subject: "Mathematics", topic: "Quadratic Equations", reason: "Low test score", status: "IMPROVING" },
  ],

  notes: [
    { id: 1, title: "Algebra Notes", subject: "Mathematics", type: "PDF", read: false },
    { id: 2, title: "Light Chapter", subject: "Science", type: "Video", read: true },
  ],

  events: [
    { id: 1, title: "Parent Teacher Meeting", date: "2026-06-25", status: "EVENT" },
    { id: 2, title: "Science Exhibition", date: "2026-07-02", status: "EVENT" },
  ],

  announcements: [
    { id: 1, title: "Holiday Notice", message: "School closed on Friday." },
  ],

  feedback: [
    { id: 1, teacher: "Anitha Teacher", type: "Academic", message: "Good progress in Mathematics." },
    { id: 2, teacher: "Ravi Sir", type: "Behavior", message: "Very active in class." },
  ],

  messages: [
    { id: 1, from: "Parent", to: "Teacher", message: "Can we schedule a meeting?", time: "10:30 AM" },
    { id: 2, from: "Teacher", to: "Parent", message: "Yes, tomorrow evening is fine.", time: "10:35 AM" },
  ],

  notifications: [
    { id: 1, title: "Homework Assigned", message: "New Mathematics homework assigned.", read: false },
    { id: 2, title: "Marks Uploaded", message: "Science marks are available.", read: false },
  ],

  meetingRequests: [
    { id: 1, parent: "Suresh Parent", teacher: "Anitha Teacher", reason: "Discuss math performance", status: "REQUESTED" },
  ],

  timetable: [
    { id: 1, day: "Monday", period: 1, subject: "Mathematics", teacher: "Anitha Teacher", time: "09:00 - 09:45" },
    { id: 2, day: "Monday", period: 2, subject: "Science", teacher: "Ravi Sir", time: "09:45 - 10:30" },
  ],

  diary: [
    { id: 1, date: "2026-06-10", summary: "Completed Algebra basics.", homework: "Exercise 4.2", acknowledged: false },
  ],

  leaveRequests: [
    { id: 1, reason: "Fever", fromDate: "2026-06-11", toDate: "2026-06-12", status: "REQUESTED" },
  ],

  behavior: [
    { id: 1, type: "POSITIVE", points: 5, remark: "Helped classmates." },
    { id: 2, type: "DISCIPLINE", points: -2, remark: "Late to class." },
  ],

  achievements: [
    { id: 1, title: "Homework Champion", description: "Completed all homework this week." },
    { id: 2, title: "Perfect Attendance", description: "No absence this month." },
  ],

  fees: [
    { id: 1, title: "Term Fee", amount: 12000, dueDate: "2026-06-30", status: "PENDING" },
  ],

  digitalIds: [
    { id: 1, name: "Rahul Student", className: "10th A", rollNumber: "STU101", bloodGroup: "O+", emergency: "9876543210" },
  ],

  doubts: [
    { id: 1, subject: "Mathematics", doubt: "How to solve quadratic equations?", answer: "", status: "PENDING" },
  ],
};
`
);

write(
  "src/context/AuthContext.js",
  `
import React, { createContext, useContext, useMemo, useState } from "react";
import { dummyUsers } from "../data/dummyData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const login = ({ email, password, role }) => {
    const found = dummyUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password &&
        user.role === role
    );

    if (!found) {
      return {
        success: false,
        message: "Invalid email, password, or selected role.",
      };
    }

    setCurrentUser(found);

    return {
      success: true,
      message: "Login successful",
      user: found,
    };
  };

  const register = (payload) => {
    const newUser = {
      id: Date.now(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      role: payload.role,
    };

    setCurrentUser(newUser);

    return {
      success: true,
      message: "Registered successfully",
      user: newUser,
    };
  };

  const logout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      selectedRole,
      setSelectedRole,
      isAuthenticated: !!currentUser,
      login,
      register,
      logout,
    }),
    [currentUser, selectedRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
`
);

write(
  "src/context/AppContext.js",
  `
import React, { createContext, useContext, useMemo, useState } from "react";
import { initialData } from "../data/dummyData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState(initialData);

  const addTo = (key, item) => {
    setState((prev) => ({
      ...prev,
      [key]: [{ id: Date.now(), ...item }, ...(prev[key] || [])],
    }));
  };

  const updateById = (key, id, updates) => {
    setState((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const addNotification = (notification) => {
    addTo("notifications", {
      title: notification.title || "Update",
      message: notification.message || "New update received.",
      read: false,
    });
  };

  const value = useMemo(
    () => ({
      ...state,

      addNotification,

      addHomework: (item) => {
        addTo("homework", { status: "PENDING", ...item });
        addNotification({ title: "Homework Created", message: "New homework assigned." });
      },

      submitHomework: (item) => {
        addTo("homeworkSubmissions", { status: "SUBMITTED", ...item });
        addNotification({ title: "Homework Submitted", message: "Submission sent to teacher." });
      },

      reviewHomework: (id, remark) => {
        updateById("homeworkSubmissions", id, { status: "REVIEWED", remark });
        addNotification({ title: "Homework Reviewed", message: "Teacher reviewed the homework." });
      },

      createExam: (item) => {
        addTo("exams", { status: "UPCOMING", ...item });
        addNotification({ title: "Exam Created", message: "New exam scheduled." });
      },

      uploadMarks: (item) => {
        addTo("marks", item);
        addNotification({ title: "Marks Uploaded", message: "Marks are available now." });
      },

      markAttendance: (item) => {
        addTo("attendance", item);
        addNotification({ title: "Attendance Updated", message: "Attendance has been updated." });
      },

      addTask: (item) => addTo("tasks", { status: "PENDING", ...item }),
      updateTaskStatus: (id, status) => updateById("tasks", id, { status }),
      addStudyPlan: (item) => addTo("studyPlans", item),
      addWeakTopic: (item) => addTo("weakTopics", item),
      uploadNotes: (item) => addTo("notes", item),
      markNotesAsRead: (id) => updateById("notes", id, { read: true }),
      sendFeedback: (item) => addTo("feedback", item),
      createEvent: (item) => addTo("events", item),
      sendAnnouncement: (item) => addTo("announcements", item),
      sendMessage: (item) => addTo("messages", item),
      requestMeeting: (item) => addTo("meetingRequests", { status: "REQUESTED", ...item }),
      updateMeetingStatus: (id, status) => updateById("meetingRequests", id, { status }),
      createTimetablePeriod: (item) => addTo("timetable", item),
      createDailyDiary: (item) => addTo("diary", item),
      acknowledgeDiary: (id) => updateById("diary", id, { acknowledged: true }),
      submitLeaveRequest: (item) => addTo("leaveRequests", { status: "REQUESTED", ...item }),
      updateLeaveStatus: (id, status) => updateById("leaveRequests", id, { status }),
      addBehaviorRecord: (item) => addTo("behavior", item),
      awardAchievement: (item) => addTo("achievements", item),
      createFee: (item) => addTo("fees", { status: "PENDING", ...item }),
      uploadPaymentProof: (id) => updateById("fees", id, { status: "SUBMITTED" }),
      verifyFeePayment: (id) => updateById("fees", id, { status: "VERIFIED" }),
      createDigitalId: (item) => addTo("digitalIds", item),
      askDoubt: (item) => addTo("doubts", { status: "PENDING", ...item }),
      answerDoubt: (id, answer) => updateById("doubts", id, { answer, status: "ANSWERED" }),
      markDoubtSolved: (id) => updateById("doubts", id, { status: "SOLVED" }),
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
`
);

write(
  "src/components/AppButton.js",
  `
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export default function AppButton({ title, onPress, variant = "primary", style, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variant === "outline" ? styles.outline : styles.primary,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, variant === "outline" && styles.outlineText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginVertical: 6,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },
  outlineText: {
    color: COLORS.primary,
  },
});
`
);

write(
  "src/components/AppInput.js",
  `
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export default function AppInput({ label, error, style, inputStyle, ...props }) {
  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        placeholderTextColor={COLORS.muted}
        style={[styles.input, error && styles.errorBorder, inputStyle]}
        {...props}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "800",
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 14,
    color: COLORS.text,
    fontSize: 14,
  },
  errorBorder: {
    borderColor: COLORS.danger,
  },
  error: {
    marginTop: 5,
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: "700",
  },
});
`
);

write(
  "src/components/AppHeader.js",
  `
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function AppHeader({ title, navigation, showBack = true }) {
  const canGoBack = navigation?.canGoBack?.();

  return (
    <View style={styles.header}>
      {showBack && canGoBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}

      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: COLORS.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    textAlign: "center",
  },
});
`
);

write(
  "src/components/StatusBadge.js",
  `
import React from "react";
import { Text, StyleSheet } from "react-native";
import { getStatusColor } from "../utils/helpers";

export default function StatusBadge({ status = "NEW" }) {
  const color = getStatusColor(status);

  return (
    <Text style={[styles.badge, { color, backgroundColor: color + "20" }]}>
      {status}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
  },
});
`
);

write(
  "src/components/StatCard.js",
  `
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function StatCard({ title, value, icon = "stats-chart-outline", color = COLORS.primary }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: color + "18" }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  value: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  title: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 3,
    fontWeight: "700",
  },
});
`
);

write(
  "src/components/FeatureCard.js",
  `
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function FeatureCard({ title, icon = "grid-outline", onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <Ionicons name={icon} size={24} color={COLORS.primary} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "31%",
    minHeight: 92,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    marginTop: 8,
    fontSize: 11,
    textAlign: "center",
    color: COLORS.text,
    fontWeight: "800",
  },
});
`
);

write(
  "src/components/SectionHeader.js",
  `
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export default function SectionHeader({ title, subtitle }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 18,
    marginBottom: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },
});
`
);

write(
  "src/components/EmptyState.js",
  `
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function EmptyState({ title = "No data found", subtitle = "Content will appear here." }) {
  return (
    <View style={styles.box}>
      <Ionicons name="file-tray-outline" size={42} color={COLORS.muted} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    marginTop: 10,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 13,
    textAlign: "center",
  },
});
`
);

write(
  "src/components/SuccessModal.js",
  `
import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "./AppButton";
import { COLORS } from "../utils/colors";

export default function SuccessModal({ visible, title, message, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={62} color={COLORS.success} />
          <Text style={styles.title}>{title || "Success"}</Text>
          <Text style={styles.message}>{message || "Action completed successfully."}</Text>
          <AppButton title="Done" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 10,
  },
  message: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    marginVertical: 10,
  },
});
`
);

const cardComponents = [
  "GradientHeader",
  "QuickActionCard",
  "HomeworkCard",
  "ExamCard",
  "EventCard",
  "ProgressCard",
  "AttendanceCard",
  "MarkCard",
  "NotificationCard",
  "MessageBubble",
  "NotesCard",
  "TimetableCard",
  "DailyDiaryCard",
  "LeaveRequestCard",
  "MeetingCard",
  "BehaviorCard",
  "AchievementCard",
  "FeeCard",
  "DigitalIdCard",
  "DoubtCard",
  "ReportCard",
  "LoadingView",
  "UserAvatar",
];

cardComponents.forEach((name) => {
  write(
    `src/components/${name}.js`,
    `
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import StatusBadge from "./StatusBadge";

export default function ${name}({ title = "${name}", subtitle = "Ready for backend integration", status }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {status ? <StatusBadge status={status} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 8,
  },
});
`
  );
});

write(
  "src/components/ScreenTemplate.js",
  `
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
`
);

write(
  "src/navigation/RootNavigator.js",
  `
import React from "react";
import AuthNavigator from "./AuthNavigator";
import StudentNavigator from "./StudentNavigator";
import TeacherNavigator from "./TeacherNavigator";
import ParentNavigator from "./ParentNavigator";
import AdminNavigator from "./AdminNavigator";
import { useAuth } from "../context/AuthContext";

export default function RootNavigator() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <AuthNavigator />;
  }

  if (currentUser.role === "STUDENT") {
    return <StudentNavigator />;
  }

  if (currentUser.role === "TEACHER") {
    return <TeacherNavigator />;
  }

  if (currentUser.role === "PARENT") {
    return <ParentNavigator />;
  }

  if (currentUser.role === "ADMIN") {
    return <AdminNavigator />;
  }

  return <AuthNavigator />;
}
`
);

write(
  "src/navigation/AuthNavigator.js",
  `
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/auth/SplashScreen";
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import RoleSelectScreen from "../screens/auth/RoleSelectScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
`
);

function createNavigator(role, folder, screens, tabs) {
  const imports = screens
    .map((screen) => `import ${screen} from "../screens/${folder}/${screen}";`)
    .join("\n");

  const stackScreens = screens
    .map((screen) => `      <Stack.Screen name="${toRoute(screen)}" component={${screen}} />`)
    .join("\n");

  const tabScreens = tabs
    .map(
      ([name, component, icon]) =>
        `      <Tab.Screen name="${name}" component={${component}} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="${icon}" size={size} color={color} /> }} />`
    )
    .join("\n");

  write(
    `src/navigation/${role}Navigator.js`,
    `
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

${imports}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ${role}Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 66,
          paddingTop: 7,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.white,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
        },
      }}
    >
${tabScreens}
    </Tab.Navigator>
  );
}

export default function ${role}Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="${role}Tabs" component={${role}Tabs} />
${stackScreens}
    </Stack.Navigator>
  );
}
`
  );
}

createNavigator("Student", "student", studentScreens, [
  ["Home", "StudentDashboardScreen", "home-outline"],
  ["Homework", "StudentHomeworkScreen", "book-outline"],
  ["Planner", "ExamPlannerScreen", "calendar-outline"],
  ["Progress", "StudentProgressScreen", "trending-up-outline"],
  ["Profile", "StudentProfileScreen", "person-outline"],
]);

createNavigator("Teacher", "teacher", teacherScreens, [
  ["Home", "TeacherDashboardScreen", "home-outline"],
  ["Classes", "TeacherClassesScreen", "school-outline"],
  ["Homework", "AssignHomeworkScreen", "book-outline"],
  ["Reports", "HomeworkSubmissionsScreen", "bar-chart-outline"],
  ["Profile", "TeacherProfileScreen", "person-outline"],
]);

createNavigator("Parent", "parent", parentScreens, [
  ["Home", "ParentDashboardScreen", "home-outline"],
  ["Performance", "ChildPerformanceScreen", "trending-up-outline"],
  ["Homework", "ChildHomeworkScreen", "book-outline"],
  ["Messages", "ParentChatScreen", "chatbubble-outline"],
  ["Profile", "ParentProfileScreen", "person-outline"],
]);

createNavigator("Admin", "admin", adminScreens, [
  ["Dashboard", "AdminDashboardScreen", "home-outline"],
  ["Users", "ManageStudentsScreen", "people-outline"],
  ["Classes", "ManageClassesScreen", "school-outline"],
  ["Events", "SchoolEventsScreen", "calendar-outline"],
  ["Profile", "AdminProfileScreen", "person-outline"],
]);

write(
  "src/screens/auth/SplashScreen.js",
  `
import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { APP_NAME, TAGLINE } from "../../utils/constants";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("OnBoarding");
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.logo}>
        <Ionicons name="school" size={58} color={COLORS.white} />
      </View>

      <Text style={styles.title}>{APP_NAME}</Text>
      <Text style={styles.tagline}>{TAGLINE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 118,
    height: 118,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "900",
  },
  tagline: {
    color: "#CBD5E1",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
  },
});
`
);

write(
  "src/screens/auth/OnBoardingScreen.js",
  `
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../components/AppButton";
import { COLORS } from "../../utils/colors";

const slides = [
  {
    icon: "calendar-outline",
    title: "Plan studies smartly",
    text: "Manage homework, exams, study plans, revision, daily diary, and tasks.",
  },
  {
    icon: "people-outline",
    title: "Connect everyone",
    text: "Students, teachers, parents, and school admin stay connected in real time.",
  },
  {
    icon: "trending-up-outline",
    title: "Improve performance",
    text: "Track attendance, marks, behavior, fees, achievements, and progress.",
  },
];

export default function OnBoardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.replace("RoleSelect");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Ionicons name={slide.icon} size={86} color={COLORS.primary} />

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
          ))}
        </View>

        <AppButton title={index === slides.length - 1 ? "Get Started" : "Next"} onPress={next} />
        <AppButton title="Skip" variant="outline" onPress={() => navigation.replace("RoleSelect")} />
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 26,
    color: COLORS.text,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 24,
  },
  text: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    marginVertical: 14,
  },
  dots: {
    flexDirection: "row",
    marginVertical: 18,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 99,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
});
`
);

write(
  "src/screens/auth/RoleSelectScreen.js",
  `
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
`
);

write(
  "src/screens/auth/LoginScreen.js",
  `
import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";
import { validateLogin } from "../../utils/validation";

const defaults = {
  STUDENT: ["student@studybridge.com", "student123"],
  TEACHER: ["teacher@studybridge.com", "teacher123"],
  PARENT: ["parent@studybridge.com", "parent123"],
  ADMIN: ["admin@studybridge.com", "admin123"],
};

export default function LoginScreen({ navigation, route }) {
  const selected = route.params?.role || "STUDENT";
  const { login } = useAuth();

  const [defaultEmail, defaultPassword] = useMemo(() => defaults[selected], [selected]);

  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const validation = validateLogin({ email, password });

    if (validation) {
      setError(validation);
      return;
    }

    const response = login({
      email,
      password,
      role: selected,
    });

    if (!response.success) {
      setError(response.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.title}>{selected} Login</Text>
        <Text style={styles.subtitle}>Welcome back to StudyBridge</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <AppInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AppButton title="Login" onPress={handleLogin} />

        <AppButton
          title="Create Account"
          variant="outline"
          onPress={() => navigation.navigate("Register", { role: selected })}
        />

        <AppButton
          title="Forgot Password"
          variant="outline"
          onPress={() => navigation.navigate("ForgotPassword")}
        />
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 6,
    marginBottom: 18,
  },
  error: {
    color: COLORS.danger,
    fontWeight: "800",
    marginBottom: 10,
  },
});
`
);

write(
  "src/screens/auth/RegisterScreen.js",
  `
import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../../utils/colors";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";

export default function RegisterScreen({ route }) {
  const role = route.params?.role || "STUDENT";
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const submit = () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    register({
      ...form,
      role,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Register as {role}</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppInput
            label="Full Name"
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />

          <AppInput
            label="Email"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <AppInput
            label="Phone"
            value={form.phone}
            onChangeText={(v) => setForm({ ...form, phone: v })}
            keyboardType="phone-pad"
          />

          <AppInput
            label="Password"
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
          />

          <AppInput
            label="Confirm Password"
            value={form.confirm}
            onChangeText={(v) => setForm({ ...form, confirm: v })}
            secureTextEntry
          />

          <AppButton title="Register" onPress={submit} />
        </View>
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
    padding: 20,
    justifyContent: "center",
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 16,
  },
  error: {
    color: COLORS.danger,
    fontWeight: "800",
    marginBottom: 10,
  },
});
`
);

write(
  "src/screens/auth/ForgotPasswordScreen.js",
  `
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

export default function ForgotPasswordScreen(props) {
  return <ScreenTemplate {...props} title="Forgot Password" role="STUDENT" type="form" />;
}
`
);

function screenType(name) {
  if (name.includes("Dashboard")) return "dashboard";
  if (
    name.includes("Submit") ||
    name.includes("Add") ||
    name.includes("Create") ||
    name.includes("Upload") ||
    name.includes("Assign") ||
    name.includes("Mark") ||
    name.includes("Request") ||
    name.includes("Manage") ||
    name.includes("Verification") ||
    name.includes("Award") ||
    name.includes("Announcements") ||
    name.includes("Events")
  ) {
    return "form";
  }
  return "list";
}

function createScreens(folder, role, screens) {
  screens.forEach((name) => {
    write(
      `src/screens/${folder}/${name}.js`,
      `
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

export default function ${name}(props) {
  return (
    <ScreenTemplate
      {...props}
      title="${readable(name)}"
      role="${role}"
      type="${screenType(name)}"
    />
  );
}
`
    );
  });
}

createScreens("student", "STUDENT", studentScreens);
createScreens("teacher", "TEACHER", teacherScreens);
createScreens("parent", "PARENT", parentScreens);
createScreens("admin", "ADMIN", adminScreens);

write(
  "src/services/apiClient.js",
  `
import axios from "axios";
import { API_BASE_URL } from "../utils/config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  // Later add JWT token:
  // config.headers.Authorization = "Bearer " + token;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error?.response?.data || error)
);

export default apiClient;
`
);

const serviceFiles = [
  "authApi",
  "dashboardApi",
  "homeworkApi",
  "examApi",
  "attendanceApi",
  "marksApi",
  "taskApi",
  "studyPlanApi",
  "notesApi",
  "eventApi",
  "notificationApi",
  "messageApi",
  "meetingApi",
  "timetableApi",
  "diaryApi",
  "leaveApi",
  "behaviorApi",
  "achievementApi",
  "feeApi",
  "digitalIdApi",
  "doubtApi",
];

serviceFiles.forEach((file) => {
  write(
    `src/services/${file}.js`,
    `
import apiClient from "./apiClient";

export const getAll = async (endpoint) => {
  return apiClient.get(endpoint);
};

export const getById = async (endpoint, id) => {
  return apiClient.get(\`\${endpoint}/\${id}\`);
};

export const createItem = async (endpoint, payload) => {
  return apiClient.post(endpoint, payload);
};

export const updateItem = async (endpoint, id, payload) => {
  return apiClient.put(\`\${endpoint}/\${id}\`, payload);
};

export const deleteItem = async (endpoint, id) => {
  return apiClient.delete(\`\${endpoint}/\${id}\`);
};
`
  );
});

write(
  "src/services/realtimeService.js",
  `
export const connectRealtime = (user) => {
  console.log("Realtime placeholder connected for:", user?.role);
};

export const subscribeToUserNotifications = (userId, callback) => {
  console.log("Subscribe user notifications:", userId);
};

export const subscribeToClassUpdates = (classId, callback) => {
  console.log("Subscribe class updates:", classId);
};

export const subscribeToTeacherUpdates = (teacherId, callback) => {
  console.log("Subscribe teacher updates:", teacherId);
};

export const subscribeToParentUpdates = (parentId, callback) => {
  console.log("Subscribe parent updates:", parentId);
};

export const disconnectRealtime = () => {
  console.log("Realtime disconnected");
};
`
);

console.log("\\nStudyBridge frontend files filled successfully.");
console.log("Run: npx expo start");