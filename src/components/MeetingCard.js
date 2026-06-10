import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function MeetingCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={
        item.teacherName
          ? "Meeting with " + item.teacherName
          : item.parentName
          ? "Meeting with " + item.parentName
          : "Meeting Request"
      }
      subtitle={item.reason || item.teacherNote || "Parent teacher meeting"}
      meta={
        (item.preferredDate || item.date || "") +
        (item.preferredTime ? " • " + item.preferredTime : "")
      }
      status={item.status || "REQUESTED"}
      icon="people-outline"
      color={COLORS.accent}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
