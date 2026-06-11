import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import MeetingCard from "../../components/MeetingCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function AdminMeetingReportsScreen({ navigation }) {
  const app = useApp();
  const meetings = app.meetings || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Meeting Reports"
      subtitle="Parent-teacher meeting request overview."
      icon="people-outline"
      color={COLORS.accent}
      data={meetings}
      searchKeys={["parentName", "teacherName", "reason", "status"]}
      filters={["ALL", "REQUESTED", "ACCEPTED", "RESCHEDULED", "REJECTED"]}
      getFilterValue={(item) => item.status || "REQUESTED"}
      emptyTitle="No meetings"
      emptyMessage="Meeting requests will appear here."
      searchPlaceholder="Search meetings..."
      renderItem={(item) => (
        <MeetingCard key={item.id} item={item} />
      )}
    />
  );
}
