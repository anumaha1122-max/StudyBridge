import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import EventCard from "../../components/EventCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function StudentEventsScreen({ navigation }) {
  const app = useApp();
  const events = app.events || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="School Events"
      subtitle="Upcoming school activities, holidays and celebrations."
      icon="calendar-clear-outline"
      color={COLORS.accent}
      data={events}
      searchKeys={["title", "description", "type", "date"]}
      filters={["ALL", "EVENT", "HOLIDAY", "EXAM", "MEETING"]}
      getFilterValue={(item) => item.type || "EVENT"}
      emptyTitle="No events"
      emptyMessage="School events will appear here."
      searchPlaceholder="Search events..."
      renderItem={(item) => <EventCard key={item.id} item={item} />}
    />
  );
}
