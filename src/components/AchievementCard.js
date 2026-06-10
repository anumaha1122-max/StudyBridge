import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function AchievementCard({
  item = {},
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || "Achievement"}
      subtitle={item.description || "Achievement details"}
      meta={item.awardedBy ? "Awarded by: " + item.awardedBy : item.studentName || ""}
      status={item.status || "AWARDED"}
      icon="ribbon-outline"
      color={COLORS.purple}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
