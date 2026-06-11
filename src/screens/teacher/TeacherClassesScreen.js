import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import BaseListCard from "../../components/BaseListCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function TeacherClassesScreen({ navigation }) {
  const app = useApp();
  const classes = app.classes || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="My Classes"
      subtitle="View assigned classes and class details."
      icon="school-outline"
      color={COLORS.secondary}
      data={classes}
      searchKeys={["name", "section", "classTeacher", "room"]}
      filters={["ALL", "ACTIVE"]}
      getFilterValue={(item) => item.status || "ACTIVE"}
      emptyTitle="No classes"
      emptyMessage="Assigned classes will appear here."
      searchPlaceholder="Search classes..."
      renderItem={(item) => (
        <BaseListCard
          key={item.id}
          title={(item.name || "Class") + (item.section ? " - " + item.section : "")}
          subtitle={(item.classTeacher || "Class Teacher") + " • " + (item.room || "Room not set")}
          meta="Tap to view students"
          status={item.status || "ACTIVE"}
          icon="school-outline"
          color={COLORS.secondary}
          onPress={() => navigation.navigate("StudentList", { classId: item.id })}
        />
      )}
    />
  );
}
