import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import ExamCard from "../../components/ExamCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ExamPlannerScreen({ navigation }) {
  const app = useApp();
  const exams = app.exams || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Exam Planner"
      subtitle="Check upcoming exams, syllabus and marks schedule."
      icon="calendar-outline"
      color={COLORS.warning}
      data={exams}
      searchKeys={["title", "subject", "syllabus"]}
      filters={["ALL", "UPCOMING", "COMPLETED"]}
      getFilterValue={(item) => item.status || "UPCOMING"}
      emptyTitle="No exams"
      emptyMessage="Exam schedule will appear here."
      searchPlaceholder="Search exams..."
      renderItem={(item) => (
        <ExamCard
          key={item.id}
          item={item}
          onPress={() => navigation.navigate("ExamDetails", { examId: item.id })}
        />
      )}
    />
  );
}
