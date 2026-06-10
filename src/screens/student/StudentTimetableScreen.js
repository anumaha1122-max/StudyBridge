import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";
import DayScheduleCard from "../../components/DayScheduleCard";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function StudentTimetableScreen({ navigation }) {
  const app = useApp();
  const timetable = app.timetable || [];

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="My Timetable"
      subtitle="View your daily class schedule and periods."
      icon="time-outline"
      color={COLORS.primary}
    >
      <AnalyticsSection
        title="Weekly Schedule"
        subtitle="Your class timetable for this week."
      >
        {timetable.length === 0 ? (
          <InsightBox
            title="No Timetable"
            message="Your timetable will appear here after admin creates it."
            color={COLORS.muted}
          />
        ) : (
          days.map((day) => (
            <DayScheduleCard
              key={day}
              day={day}
              color={COLORS.primary}
              periods={timetable.filter((item) => item.day === day)}
            />
          ))
        )}
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
