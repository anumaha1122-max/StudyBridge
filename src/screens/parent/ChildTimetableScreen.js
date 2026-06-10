import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";
import DayScheduleCard from "../../components/DayScheduleCard";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ChildTimetableScreen({ navigation }) {
  const app = useApp();
  const timetable = app.timetable || [];

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Child Timetable"
      subtitle="Track your child's daily class schedule."
      icon="time-outline"
      color={COLORS.accent}
    >
      <AnalyticsSection
        title="Weekly Class Schedule"
        subtitle="Class periods and subject timings."
      >
        {timetable.length === 0 ? (
          <InsightBox
            title="No Timetable"
            message="Your child timetable will appear here."
            color={COLORS.muted}
          />
        ) : (
          days.map((day) => (
            <DayScheduleCard
              key={day}
              day={day}
              color={COLORS.accent}
              periods={timetable.filter((item) => item.day === day)}
            />
          ))
        )}
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
