import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function AnnouncementCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || "Announcement"}
      subtitle={item.message || item.description || "School announcement"}
      meta={(item.date || "") + (item.audience ? " • " + item.audience : "")}
      status={item.priority || item.status || "NOTICE"}
      icon="megaphone-outline"
      color={COLORS.warning}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
