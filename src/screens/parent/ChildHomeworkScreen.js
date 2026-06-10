import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import HomeworkCard from "../../components/HomeworkCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ChildHomeworkScreen({ navigation }) {
  const app = useApp();
  const homework = app.homework || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Child Homework"
      subtitle="Track assigned, submitted and reviewed homework."
      icon="book-outline"
      color={COLORS.primary}
      data={homework}
      searchKeys={["title", "subject", "description", "teacherName"]}
      filters={["ALL", "PENDING", "SUBMITTED", "REVIEWED"]}
      getFilterValue={(item) => item.status || "PENDING"}
      emptyTitle="No homework"
      emptyMessage="Your child homework will appear here."
      searchPlaceholder="Search homework..."
      renderItem={(item) => (
        <HomeworkCard
          key={item.id}
          item={item}
          onPress={() => navigation.navigate("ChildHomework", { homeworkId: item.id })}
        />
      )}
    />
  );
}
