import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import HomeworkCard from "../../components/HomeworkCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function HomeworkSubmissionsScreen({ navigation }) {
  const app = useApp();
  const submissions = app.homeworkSubmissions || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Homework Reviews"
      subtitle="Review submitted homework and give feedback."
      icon="documents-outline"
      color={COLORS.purple}
      data={submissions}
      searchKeys={["studentName", "title", "subject", "answerText"]}
      filters={["ALL", "SUBMITTED", "REVIEWED"]}
      getFilterValue={(item) => item.status || "SUBMITTED"}
      emptyTitle="No submissions"
      emptyMessage="Student submitted homework will appear here."
      searchPlaceholder="Search submissions..."
      renderItem={(item) => (
        <HomeworkCard
          key={item.id}
          item={{
            ...item,
            title: item.title || item.homeworkTitle || "Homework Submission",
            description: item.answerText || item.studentName,
          }}
          onPress={() => navigation.navigate("HomeworkSubmissions", { submissionId: item.id })}
        />
      )}
    />
  );
}
