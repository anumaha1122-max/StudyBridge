import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function ExamCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || "Exam"}
      subtitle={item.subject || item.syllabus || "Exam details"}
      meta={
        (item.examDate || item.date || "") +
        (item.startTime ? " • " + item.startTime : "")
      }
      status={item.status || "UPCOMING"}
      icon="calendar-outline"
      color={COLORS.warning}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
