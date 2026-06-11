import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import BaseListCard from "../../components/BaseListCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function StudentListScreen({ navigation }) {
  const app = useApp();
  const students = app.students || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Students"
      subtitle="View students in your assigned classes."
      icon="people-outline"
      color={COLORS.primary}
      data={students}
      searchKeys={["name", "className", "email", "phone", "parentName"]}
      filters={["ALL", "ACTIVE"]}
      getFilterValue={(item) => item.status || "ACTIVE"}
      emptyTitle="No students"
      emptyMessage="Students will appear here after admin adds them."
      searchPlaceholder="Search students..."
      renderItem={(item) => (
        <BaseListCard
          key={item.id}
          title={item.name || "Student"}
          subtitle={(item.className || "Class") + " • " + (item.phone || "No phone")}
          meta={(item.parentName ? "Parent: " + item.parentName : item.email || "")}
          status={item.status || "ACTIVE"}
          icon="person-outline"
          color={COLORS.primary}
        />
      )}
    />
  );
}
