import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import NotificationScreenWrapper from "../../components/NotificationScreenWrapper";

export default function ParentNotificationsScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const roleNotifications =
    app.notifications?.filter((item) => {
      if (item.userRole !== "PARENT") return false;

      if (!item.userId) return true;

      if ("PARENT" === "STUDENT") {
        return item.userId === (currentUser?.studentId || currentUser?.id || 1);
      }

      if ("PARENT" === "PARENT") {
        return item.userId === (currentUser?.parentId || currentUser?.id || 1);
      }

      if ("PARENT" === "TEACHER") {
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
      app.markAllNotificationsRead("PARENT", currentUser?.id);
    } else if (app.notifications && app.setNotifications) {
      const updated = app.notifications.map((item) =>
        item.userRole === "PARENT" ? { ...item, read: true } : item
      );
      app.setNotifications(updated);
    }
  };

  return (
    <NotificationScreenWrapper
      navigation={navigation}
      role="PARENT"
      title="Parent Notifications"
      subtitle="Child homework, attendance, fees, meetings, leave and school alerts."
      icon="people-outline"
      color="#F97316"
      notifications={roleNotifications}
      onMarkRead={markRead}
      onMarkAllRead={markAllRead}
    />
  );
}
