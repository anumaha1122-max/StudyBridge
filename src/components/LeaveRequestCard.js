import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function LeaveRequestCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.studentName || item.reason || "Leave Request"}
      subtitle={item.reason || item.message || "Leave request details"}
      meta={
        (item.fromDate || "") +
        (item.toDate ? " to " + item.toDate : "")
      }
      status={item.status || "REQUESTED"}
      icon="mail-outline"
      color={COLORS.danger}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
