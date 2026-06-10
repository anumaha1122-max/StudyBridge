import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import ProfileScreenWrapper from "../../components/ProfileScreenWrapper";

export default function AdminProfileScreen({ navigation }) {
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
      value: app.teachers?.length || 0,
      label: "Teachers",
      icon: "school-outline",
      color: COLORS.secondary,
    },
    {
      value: app.classes?.length || 0,
      label: "Classes",
      icon: "business-outline",
      color: COLORS.purple,
    },
    {
      value: app.fees?.length || 0,
      label: "Fees",
      icon: "card-outline",
      color: COLORS.warning,
    },
  ];

  const menu = [
    {
      title: "Manage Students",
      subtitle: "Add, edit and manage student accounts",
      icon: "people-outline",
      route: "ManageStudents",
      color: COLORS.primary,
    },
    {
      title: "Manage Teachers",
      subtitle: "Teacher profiles and subject assignments",
      icon: "school-outline",
      route: "ManageTeachers",
      color: COLORS.secondary,
    },
    {
      title: "Fee Verification",
      subtitle: "Verify parent payment proofs",
      icon: "shield-checkmark-outline",
      route: "FeeVerification",
      color: COLORS.warning,
    },
    {
      title: "School Reports",
      subtitle: "View school analytics and reports",
      icon: "bar-chart-outline",
      route: "Reports",
      color: COLORS.purple,
    },
  ];

  return (
    <ProfileScreenWrapper
      navigation={navigation}
      currentUser={currentUser}
      role="ADMIN"
      title="ADMIN Profile"
      subtitle="Manage your StudyBridge profile"
      icon="shield-checkmark-outline"
      color="#7C3AED"
      stats={stats}
      menu={menu}
      onLogout={logout}
      onReset={resetLocalData}
    />
  );
}
