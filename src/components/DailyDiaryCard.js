import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function DailyDiaryCard({
  item = {},
  acknowledged = false,
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.date || "Daily Diary"}
      subtitle={item.classSummary || item.homeworkSummary || "Class diary details"}
      meta={item.reminders || ""}
      status={acknowledged ? "ACKNOWLEDGED" : item.status || "DIARY"}
      icon="journal-outline"
      color={COLORS.secondary}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
