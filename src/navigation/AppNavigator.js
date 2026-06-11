import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import AdminNavigator from "./AdminNavigator";
import TeacherNavigator from "./TeacherNavigator";
import StudentNavigator from "./StudentNavigator";
import ParentNavigator from "./ParentNavigator";

export default function AppNavigator() {
  const { currentUser } = useAuth();

  const role = currentUser?.role;

  return (
    <NavigationContainer>
      {!currentUser ? (
        <AuthNavigator />
      ) : role === "ADMIN" ? (
        <AdminNavigator />
      ) : role === "TEACHER" ? (
        <TeacherNavigator />
      ) : role === "PARENT" ? (
        <ParentNavigator />
      ) : (
        <StudentNavigator />
      )}
    </NavigationContainer>
  );
}
