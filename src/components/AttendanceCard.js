import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function AttendanceCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.studentName || item.name || "Attendance"}
      subtitle={item.subject || item.remark || "Attendance record"}
      meta={item.date || ""}
      status={item.status || "PRESENT"}
      icon="calendar-outline"
      color={
        item.status === "ABSENT"
          ? COLORS.danger
          : item.status === "LATE"
          ? COLORS.warning
          : COLORS.success
      }
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
