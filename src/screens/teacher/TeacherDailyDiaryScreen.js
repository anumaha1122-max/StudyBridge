import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import DailyDiaryCard from "../../components/DailyDiaryCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function TeacherDailyDiaryScreen({ navigation }) {
  const app = useApp();
  const diary = app.diary || app.dailyDiary || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Daily Diary"
      subtitle="View classroom diary entries and parent acknowledgements."
      icon="journal-outline"
      color={COLORS.secondary}
      data={diary}
      searchKeys={["date", "className", "classSummary", "homeworkSummary", "reminders"]}
      filters={["ALL", "DIARY"]}
      getFilterValue={(item) => item.status || "DIARY"}
      emptyTitle="No diary entries"
      emptyMessage="Create daily diary entries for parents and students."
      searchPlaceholder="Search diary..."
      renderItem={(item) => (
        <DailyDiaryCard
          key={item.id}
          item={item}
          acknowledged={(item.acknowledgements || []).length > 0}
          onPress={() => navigation.navigate("CreateDailyDiary")}
        />
      )}
    />
  );
}
