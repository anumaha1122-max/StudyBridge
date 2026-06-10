import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import NotificationScreenWrapper from "../../components/NotificationScreenWrapper";

export default function StudentNotificationsScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const roleNotifications =
    app.notifications?.filter((item) => {
      if (item.userRole !== "STUDENT") return false;

      if (!item.userId) return true;

      if ("STUDENT" === "STUDENT") {
        return item.userId === (currentUser?.studentId || currentUser?.id || 1);
      }

      if ("STUDENT" === "PARENT") {
        return item.userId === (currentUser?.parentId || currentUser?.id || 1);
      }

      if ("STUDENT" === "TEACHER") {
        return item.userId === (currentUser?.teacherId || currentUser?.id || 1);
      }

      return true;
    }) || [];

  const markRead = (id) => {
    if (app.markNotificationRead) {
      app.markNotificationRead(id);
    }
  };

  const markAllRead = () => {
    if (app.markAllNotificationsRead) {
      app.markAllNotificationsRead("STUDENT", currentUser?.id);
    } else if (app.notifications && app.setNotifications) {
      const updated = app.notifications.map((item) =>
        item.userRole === "STUDENT" ? { ...item, read: true } : item
      );
      app.setNotifications(updated);
    }
  };

  return (
    <NotificationScreenWrapper
      navigation={navigation}
      role="STUDENT"
      title="Student Notifications"
      subtitle="Homework, exams, marks, notes, diary, fees and teacher updates."
      icon="school-outline"
      color="#4F46E5"
      notifications={roleNotifications}
      onMarkRead={markRead}
      onMarkAllRead={markAllRead}
    />
  );
}
