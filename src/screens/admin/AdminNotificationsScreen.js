import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import NotificationScreenWrapper from "../../components/NotificationScreenWrapper";

export default function AdminNotificationsScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const roleNotifications =
    app.notifications?.filter((item) => {
      if (item.userRole !== "ADMIN") return false;

      if (!item.userId) return true;

      if ("ADMIN" === "STUDENT") {
        return item.userId === (currentUser?.studentId || currentUser?.id || 1);
      }

      if ("ADMIN" === "PARENT") {
        return item.userId === (currentUser?.parentId || currentUser?.id || 1);
      }

      if ("ADMIN" === "TEACHER") {
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
      app.markAllNotificationsRead("ADMIN", currentUser?.id);
    } else if (app.notifications && app.setNotifications) {
      const updated = app.notifications.map((item) =>
        item.userRole === "ADMIN" ? { ...item, read: true } : item
      );
      app.setNotifications(updated);
    }
  };

  return (
    <NotificationScreenWrapper
      navigation={navigation}
      role="ADMIN"
      title="Admin Notifications"
      subtitle="Fee proofs, leave requests, user updates and school activity alerts."
      icon="shield-checkmark-outline"
      color="#7C3AED"
      notifications={roleNotifications}
      onMarkRead={markRead}
      onMarkAllRead={markAllRead}
    />
  );
}
