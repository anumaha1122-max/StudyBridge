import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function FeeCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || "Fee"}
      subtitle={
        "₹" +
        (item.amount || 0) +
        (item.paymentProof ? " • Proof: " + item.paymentProof : "")
      }
      meta={item.dueDate ? "Due: " + item.dueDate : ""}
      status={item.status || "PENDING"}
      icon="card-outline"
      color={COLORS.warning}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
