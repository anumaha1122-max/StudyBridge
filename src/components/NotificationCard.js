import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function NotificationCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || "Notification"}
      subtitle={item.message || "Notification details"}
      meta={item.createdAt || item.time || ""}
      status={item.read ? "READ" : "NEW"}
      icon="notifications-outline"
      color={COLORS.primary}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
