import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import ProfileScreenWrapper from "../../components/ProfileScreenWrapper";

export default function TeacherProfileScreen({ navigation }) {
  const { currentUser, logout } = useAuth();
  const app = useApp();

  const resetLocalData = async () => {
    await AsyncStorage.clear();

    if (app.resetAppData) {
      await app.resetAppData();
    }
  };

  const stats = [
    {
      value: app.students?.length || 0,
      label: "Students",
      icon: "people-outline",
      color: COLORS.primary,
    },
    {
      value: app.homework?.length || 0,
      label: "Homework",
      icon: "book-outline",
      color: COLORS.warning,
    },
    {
      value: app.doubts?.filter((d) => d.status === "PENDING").length || 0,
      label: "Doubts",
      icon: "help-circle-outline",
      color: COLORS.accent,
    },
    {
      value: app.meetings?.length || 0,
      label: "Meetings",
      icon: "people-outline",
      color: COLORS.secondary,
    },
  ];

  const menu = [
    {
      title: "My Classes",
      subtitle: "View your assigned classes",
      icon: "school-outline",
      route: "TeacherClasses",
      color: COLORS.secondary,
    },
    {
      title: "Timetable",
      subtitle: "View daily class timetable",
      icon: "time-outline",
      route: "TeacherTimetable",
      color: COLORS.primary,
    },
    {
      title: "Meeting Requests",
      subtitle: "Parent meeting requests",
      icon: "people-outline",
      route: "TeacherMeetingRequests",
      color: COLORS.accent,
    },
    {
      title: "Doubt Board",
      subtitle: "Answer student doubts",
      icon: "help-circle-outline",
      route: "TeacherDoubtBoard",
      color: COLORS.warning,
    },
  ];

  return (
    <ProfileScreenWrapper
      navigation={navigation}
      currentUser={currentUser}
      role="TEACHER"
      title="TEACHER Profile"
      subtitle="Manage your StudyBridge profile"
      icon="library-outline"
      color="#06B6D4"
      stats={stats}
      menu={menu}
      onLogout={logout}
      onReset={resetLocalData}
    />
  );
}
