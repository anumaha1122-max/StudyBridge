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
