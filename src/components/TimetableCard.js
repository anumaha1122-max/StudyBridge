import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function TimetableCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.subject || "Timetable"}
      subtitle={
        (item.day || "") +
        (item.period ? " • Period " + item.period : "") +
        (item.teacher ? " • " + item.teacher : "")
      }
      meta={item.time || item.room || ""}
      status={item.room || "CLASS"}
      icon="time-outline"
      color={COLORS.primary}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
