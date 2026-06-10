import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import ProfileScreenWrapper from "../../components/ProfileScreenWrapper";

export default function StudentProfileScreen({ navigation }) {
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
      value: app.homework?.length || 0,
      label: "Homework",
      icon: "book-outline",
      color: COLORS.primary,
    },
    {
      value: app.exams?.length || 0,
      label: "Exams",
      icon: "calendar-outline",
      color: COLORS.warning,
    },
    {
      value: app.achievements?.length || 0,
      label: "Awards",
      icon: "ribbon-outline",
      color: COLORS.purple,
    },
    {
      value: app.doubts?.filter((d) => d.studentId === (currentUser?.studentId || 1)).length || 0,
      label: "Doubts",
      icon: "help-circle-outline",
      color: COLORS.accent,
    },
  ];

  const menu = [
    {
      title: "Digital ID",
      subtitle: "View your student digital ID",
      icon: "id-card-outline",
      route: "StudentDigitalId",
      color: COLORS.primary,
    },
    {
      title: "Timetable",
      subtitle: "View your daily timetable",
      icon: "time-outline",
      route: "StudentTimetable",
      color: COLORS.secondary,
    },
    {
      title: "Achievements",
      subtitle: "Awards and certificates",
      icon: "ribbon-outline",
      route: "StudentAchievements",
      color: COLORS.purple,
    },
    {
      title: "Fees",
      subtitle: "View fee status",
      icon: "card-outline",
      route: "StudentFees",
      color: COLORS.warning,
    },
  ];

  return (
    <ProfileScreenWrapper
      navigation={navigation}
      currentUser={currentUser}
      role="STUDENT"
      title="STUDENT Profile"
      subtitle="Manage your StudyBridge profile"
      icon="school-outline"
      color="#4F46E5"
      stats={stats}
      menu={menu}
      onLogout={logout}
      onReset={resetLocalData}
    />
  );
}
