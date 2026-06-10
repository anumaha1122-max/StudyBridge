import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";
import DayScheduleCard from "../../components/DayScheduleCard";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TeacherTimetableScreen({ navigation }) {
  const app = useApp();
  const timetable = app.timetable || [];

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Teacher Timetable"
      subtitle="View assigned classes, subjects and periods."
      icon="time-outline"
      color={COLORS.secondary}
    >
      <AnalyticsSection
        title="Weekly Teaching Schedule"
        subtitle="Your class periods for the week."
      >
        {timetable.length === 0 ? (
          <InsightBox
            title="No Timetable"
            message="Your assigned timetable will appear here."
            color={COLORS.muted}
          />
        ) : (
          days.map((day) => (
            <DayScheduleCard
              key={day}
              day={day}
              color={COLORS.secondary}
              periods={timetable.filter((item) => item.day === day)}
            />
          ))
        )}
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
