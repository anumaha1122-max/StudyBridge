import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import ListScreenWrapper from "../../components/ListScreenWrapper";
import BaseListCard from "../../components/BaseListCard";

export default function StudentFeedbackScreen({ navigation }) {
  const app = useApp();
  const feedback = app.feedback || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="My Feedback"
      subtitle="Teacher feedback and improvement suggestions."
      icon="chatbubble-ellipses-outline"
      color={COLORS.secondary}
      data={feedback}
      searchKeys={["studentName", "type", "message"]}
      filters={["ALL", "ACADEMIC", "BEHAVIOR", "IMPROVEMENT", "APPRECIATION"]}
      getFilterValue={(item) => item.type || "ACADEMIC"}
      emptyTitle="No feedback"
      emptyMessage="Teacher feedback will appear here."
      searchPlaceholder="Search feedback..."
      renderItem={(item) => (
        <BaseListCard
          key={item.id}
          title={item.type || "Feedback"}
          subtitle={item.message || "Feedback details"}
          meta={item.createdBy || "Teacher"}
          status={item.status || "NEW"}
          icon="chatbubble-ellipses-outline"
          color={COLORS.secondary}
        />
      )}
    />
  );
}
