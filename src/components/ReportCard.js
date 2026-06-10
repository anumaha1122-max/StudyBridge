import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function ReportCard({
  title = "Report",
  subtitle = "Report details",
  value,
  icon = "bar-chart-outline",
  color = COLORS.primary,
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={title}
      subtitle={subtitle}
      meta={value !== undefined ? "Value: " + value : ""}
      status="REPORT"
      icon={icon}
      color={color}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
