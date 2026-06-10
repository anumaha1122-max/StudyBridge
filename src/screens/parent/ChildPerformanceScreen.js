import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import AnalyticsCard from "../../components/AnalyticsCard";
import AnalyticsScreenWrapper, {
  AnalyticsGrid,
  AnalyticsSection,
  InsightBox,
  ProgressRow,
} from "../../components/AnalyticsScreenWrapper";
import MarkCard from "../../components/MarkCard";

export default function ChildPerformanceScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const childId = currentUser?.childId || 1;
  const child = app.students?.find((item) => item.id === childId) || app.students?.[0];

  const marks = app.marks?.filter((item) => !item.studentId || item.studentId === childId) || [];
  const attendance = app.attendance?.filter((item) => !item.studentId || item.studentId === childId) || [];
  const achievements = app.achievements?.filter((item) => !item.studentId || item.studentId === childId) || [];
  const behavior = app.behaviorRecords?.filter((item) => !item.studentId || item.studentId === childId) || [];

  const presentCount = attendance.filter((item) => item.status === "PRESENT").length;
  const attendancePercent =
    attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : child?.attendancePercentage || 0;

  const totalMarks = marks.reduce((sum, item) => sum + Number(item.marksObtained || 0), 0);
  const totalMax = marks.reduce((sum, item) => sum + Number(item.totalMarks || 0), 0);
  const performancePercent =
    totalMax > 0 ? Math.round((totalMarks / totalMax) * 100) : child?.performancePercentage || 0;

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Child Performance"
      subtitle={"Track " + (child?.name || "child") + " marks, attendance and behavior."}
      icon="trending-up-outline"
      color={COLORS.accent}
    >
      <AnalyticsGrid>
        <AnalyticsCard
          title="Performance"
          value={performancePercent + "%"}
          subtitle="Overall score"
          icon="bar-chart-outline"
          color={COLORS.purple}
        />
        <AnalyticsCard
          title="Attendance"
          value={attendancePercent + "%"}
          subtitle="Presence report"
          icon="checkmark-circle-outline"
          color={COLORS.success}
        />
        <AnalyticsCard
          title="Achievements"
          value={achievements.length}
          subtitle="Awards received"
          icon="ribbon-outline"
          color={COLORS.warning}
        />
        <AnalyticsCard
          title="Behavior"
          value={behavior.length}
          subtitle="Behavior records"
          icon="star-outline"
          color={COLORS.accent}
        />
      </AnalyticsGrid>

      <AnalyticsSection
        title="Parent Insight"
        subtitle="Understand child progress in simple way."
      >
        <ProgressRow label="Academic Performance" value={performancePercent} color={COLORS.purple} />
        <ProgressRow label="Attendance Strength" value={attendancePercent} color={COLORS.success} />

        <InsightBox
          title="Action Suggestion"
          message={
            attendancePercent < 75
              ? "Attendance is low. Contact teacher and help your child attend regularly."
              : "Attendance is good. Continue tracking homework and exam preparation."
          }
          color={attendancePercent < 75 ? COLORS.warning : COLORS.success}
        />
      </AnalyticsSection>

      <AnalyticsSection title="Recent Marks" subtitle="Latest marks uploaded by teachers.">
        {marks.length === 0 ? (
          <InsightBox
            title="No Marks Yet"
            message="Marks will appear here after teacher uploads them."
            color={COLORS.muted}
          />
        ) : (
          marks.slice(0, 6).map((item) => <MarkCard key={item.id} item={item} />)
        )}
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
