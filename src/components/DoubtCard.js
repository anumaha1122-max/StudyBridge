import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function DoubtCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.subject || "Student Doubt"}
      subtitle={item.doubtText || item.answerText || "Doubt details"}
      meta={item.studentName || item.attachmentName || ""}
      status={item.status || "PENDING"}
      icon="help-circle-outline"
      color={COLORS.accent}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
