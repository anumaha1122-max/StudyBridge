import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function MarkCard({
  item = {},
  onPress,
  children,
}) {
  const marks =
    item.marksObtained !== undefined && item.totalMarks !== undefined
      ? item.marksObtained + "/" + item.totalMarks
      : item.percentage
      ? item.percentage + "%"
      : "Marks";

  return (
    <BaseListCard
      title={item.subject || item.examTitle || "Marks"}
      subtitle={marks + (item.remark ? " • " + item.remark : "")}
      meta={item.studentName || item.examDate || ""}
      status={item.grade || item.status || "RESULT"}
      icon="bar-chart-outline"
      color={COLORS.purple}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
