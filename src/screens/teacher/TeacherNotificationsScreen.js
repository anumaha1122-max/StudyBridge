import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import NotificationScreenWrapper from "../../components/NotificationScreenWrapper";

export default function TeacherNotificationsScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const roleNotifications =
    app.notifications?.filter((item) => {
      if (item.userRole !== "TEACHER") return false;

      if (!item.userId) return true;

      if ("TEACHER" === "STUDENT") {
        return item.userId === (currentUser?.studentId || currentUser?.id || 1);
      }

      if ("TEACHER" === "PARENT") {
        return item.userId === (currentUser?.parentId || currentUser?.id || 1);
      }

      if ("TEACHER" === "TEACHER") {
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
      app.markAllNotificationsRead("TEACHER", currentUser?.id);
    } else if (app.notifications && app.setNotifications) {
      const updated = app.notifications.map((item) =>
        item.userRole === "TEACHER" ? { ...item, read: true } : item
      );
      app.setNotifications(updated);
    }
  };

  return (
    <NotificationScreenWrapper
      navigation={navigation}
      role="TEACHER"
      title="Teacher Notifications"
      subtitle="Homework submissions, doubts, meetings, leave requests and class updates."
      icon="library-outline"
      color="#06B6D4"
      notifications={roleNotifications}
      onMarkRead={markRead}
      onMarkAllRead={markAllRead}
    />
  );
}
