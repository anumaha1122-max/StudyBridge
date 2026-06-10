import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import MarkCard from "../../components/MarkCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ChildMarksScreen({ navigation }) {
  const app = useApp();
  const marks = app.marks || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Child Marks"
      subtitle="View subject wise marks and teacher remarks."
      icon="bar-chart-outline"
      color={COLORS.purple}
      data={marks}
      searchKeys={["subject", "examTitle", "studentName", "remark"]}
      filters={["ALL", "RESULT"]}
      getFilterValue={(item) => item.status || "RESULT"}
      emptyTitle="No marks"
      emptyMessage="Exam marks will appear here after teacher upload."
      searchPlaceholder="Search marks..."
      renderItem={(item) => (
        <MarkCard key={item.id} item={item} />
      )}
    />
  );
}
