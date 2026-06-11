import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import ExamCard from "../../components/ExamCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ChildExamScheduleScreen({ navigation }) {
  const app = useApp();
  const exams = app.exams || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Child Exam Schedule"
      subtitle="View upcoming exams, syllabus and schedule for your child."
      icon="calendar-outline"
      color={COLORS.warning}
      data={exams}
      searchKeys={["title", "subject", "syllabus", "examDate", "status"]}
      filters={["ALL", "UPCOMING", "COMPLETED"]}
      getFilterValue={(item) => item.status || "UPCOMING"}
      emptyTitle="No exams"
      emptyMessage="Child exam schedule will appear here."
      searchPlaceholder="Search exams..."
      renderItem={(item) => (
        <ExamCard key={item.id} item={item} />
      )}
    />
  );
}
