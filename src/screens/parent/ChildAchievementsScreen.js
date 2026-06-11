import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AchievementCard from "../../components/AchievementCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ChildAchievementsScreen({ navigation }) {
  const app = useApp();
  const achievements = app.achievements || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Child Achievements"
      subtitle="View your child's awards, certificates and appreciation records."
      icon="ribbon-outline"
      color={COLORS.purple}
      data={achievements}
      searchKeys={["studentName", "title", "description", "awardedBy"]}
      filters={["ALL", "AWARDED"]}
      getFilterValue={(item) => item.status || "AWARDED"}
      emptyTitle="No achievements"
      emptyMessage="Child achievements will appear here."
      searchPlaceholder="Search achievements..."
      renderItem={(item) => (
        <AchievementCard key={item.id} item={item} />
      )}
    />
  );
}
