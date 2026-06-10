import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import ProfileScreenWrapper from "../../components/ProfileScreenWrapper";

export default function ParentProfileScreen({ navigation }) {
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
      value: app.fees?.length || 0,
      label: "Fees",
      icon: "card-outline",
      color: COLORS.warning,
    },
    {
      value: app.meetings?.length || 0,
      label: "Meetings",
      icon: "people-outline",
      color: COLORS.accent,
    },
    {
      value: app.leaveRequests?.length || 0,
      label: "Leaves",
      icon: "mail-outline",
      color: COLORS.danger,
    },
  ];

  const menu = [
    {
      title: "Child Digital ID",
      subtitle: "View child school identity card",
      icon: "id-card-outline",
      route: "ChildDigitalId",
      color: COLORS.primary,
    },
    {
      title: "Child Timetable",
      subtitle: "View daily class timetable",
      icon: "time-outline",
      route: "ChildTimetable",
      color: COLORS.secondary,
    },
    {
      title: "Meeting Request",
      subtitle: "Request meeting with teacher",
      icon: "people-outline",
      route: "ParentMeetingRequest",
      color: COLORS.accent,
    },
    {
      title: "Fees & Payments",
      subtitle: "Upload payment proof",
      icon: "card-outline",
      route: "ParentFees",
      color: COLORS.warning,
    },
  ];

  return (
    <ProfileScreenWrapper
      navigation={navigation}
      currentUser={currentUser}
      role="PARENT"
      title="PARENT Profile"
      subtitle="Manage your StudyBridge profile"
      icon="people-outline"
      color="#F97316"
      stats={stats}
      menu={menu}
      onLogout={logout}
      onReset={resetLocalData}
    />
  );
}
