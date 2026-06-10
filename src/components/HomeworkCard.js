import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function HomeworkCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || item.homeworkTitle || "Homework"}
      subtitle={item.description || item.subject || "Homework details"}
      meta={
        item.dueDate
          ? "Due: " + item.dueDate + (item.teacherName ? " • " + item.teacherName : "")
          : item.teacherName || ""
      }
      status={item.status || "PENDING"}
      icon="book-outline"
      color={COLORS.primary}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
