import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import BaseListCard from "../../components/BaseListCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function DigitalIdManagementScreen({ navigation }) {
  const app = useApp();
  const students = app.students || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Digital ID Management"
      subtitle="View and manage student digital identity cards."
      icon="id-card-outline"
      color={COLORS.primary}
      data={students}
      searchKeys={["name", "className", "email", "phone"]}
      filters={["ALL", "ACTIVE"]}
      getFilterValue={(item) => item.status || "ACTIVE"}
      emptyTitle="No students"
      emptyMessage="Student digital IDs will appear after students are added."
      searchPlaceholder="Search student ID..."
      renderItem={(item) => (
        <BaseListCard
          key={item.id}
          title={item.name || "Student"}
          subtitle={(item.className || "Class") + " • ID: STU-" + (item.id || "000")}
          meta={item.email || item.phone || ""}
          status="DIGITAL ID"
          icon="id-card-outline"
          color={COLORS.primary}
        />
      )}
    />
  );
}
