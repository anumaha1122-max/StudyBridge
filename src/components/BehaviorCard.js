import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function BehaviorCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.studentName || item.type || "Behavior"}
      subtitle={item.remark || "Behavior record"}
      meta={item.points !== undefined ? "Points: " + item.points : ""}
      status={item.type || "BEHAVIOR"}
      icon="star-outline"
      color={item.type === "DISCIPLINE" ? COLORS.danger : COLORS.success}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
