import React from "react";
import { COLORS } from "../utils/colors";
import BaseListCard from "./BaseListCard";

export default function NotesCard({
  item = {},
  isRead = false,
  onPress,
  children,
}) {
  return (
    <BaseListCard
      title={item.title || "Study Material"}
      subtitle={item.subject || "Notes and study material"}
      meta={item.type ? "Type: " + item.type : ""}
      status={isRead ? "READ" : item.status || "NEW"}
      icon="document-text-outline"
      color={COLORS.secondary}
      onPress={onPress}
    >
      {children}
    </BaseListCard>
  );
}
