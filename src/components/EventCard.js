import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function EventCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || "School Event"}
      subtitle={item.description || item.type || "Event details"}
      meta={(item.date || "") + (item.time ? " • " + item.time : "")}
      status={item.type || item.status || "EVENT"}
      icon="calendar-clear-outline"
      color={COLORS.accent}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
