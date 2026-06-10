import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import ListScreenWrapper from "../../components/ListScreenWrapper";
import BaseListCard from "../../components/BaseListCard";

export default function ParentFeedbackScreen({ navigation }) {
  const app = useApp();
  const feedback = app.feedback || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Child Feedback"
      subtitle="Teacher feedback and improvement messages for your child."
      icon="chatbubble-ellipses-outline"
      color={COLORS.accent}
      data={feedback}
      searchKeys={["studentName", "type", "message"]}
      filters={["ALL", "ACADEMIC", "BEHAVIOR", "IMPROVEMENT", "APPRECIATION"]}
      getFilterValue={(item) => item.type || "ACADEMIC"}
      emptyTitle="No feedback"
      emptyMessage="Teacher feedback for your child will appear here."
      searchPlaceholder="Search feedback..."
      renderItem={(item) => (
        <BaseListCard
          key={item.id}
          title={item.studentName || item.type || "Feedback"}
          subtitle={item.message || "Feedback details"}
          meta={item.createdBy || "Teacher"}
          status={item.status || "NEW"}
          icon="chatbubble-ellipses-outline"
          color={COLORS.accent}
        />
      )}
    />
  );
}
