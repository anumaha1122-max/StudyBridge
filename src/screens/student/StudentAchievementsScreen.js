import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AchievementCard from "../../components/AchievementCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function StudentAchievementsScreen({ navigation }) {
  const app = useApp();
  const achievements = app.achievements || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Achievements"
      subtitle="View your awards, badges and certificates."
      icon="ribbon-outline"
      color={COLORS.purple}
      data={achievements}
      searchKeys={["studentName", "title", "description", "awardedBy"]}
      filters={["ALL", "AWARDED"]}
      getFilterValue={(item) => item.status || "AWARDED"}
      emptyTitle="No achievements"
      emptyMessage="Your achievements will appear here."
      searchPlaceholder="Search achievements..."
      renderItem={(item) => (
        <AchievementCard key={item.id} item={item} />
      )}
    />
  );
}
