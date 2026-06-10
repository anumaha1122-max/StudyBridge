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

export default function StudentProgressScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const studentId = currentUser?.studentId || 1;

  const student = app.students?.find((item) => item.id === studentId);
  const marks = app.marks?.filter((item) => !item.studentId || item.studentId === studentId) || [];
  const attendance = app.attendance?.filter((item) => !item.studentId || item.studentId === studentId) || [];
  const achievements = app.achievements?.filter((item) => !item.studentId || item.studentId === studentId) || [];
  const behavior = app.behaviorRecords?.filter((item) => !item.studentId || item.studentId === studentId) || [];

  const presentCount = attendance.filter((item) => item.status === "PRESENT").length;
  const attendancePercent =
    attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : student?.attendancePercentage || 0;

  const totalMarks = marks.reduce((sum, item) => sum + Number(item.marksObtained || 0), 0);
  const totalMax = marks.reduce((sum, item) => sum + Number(item.totalMarks || 0), 0);
  const performancePercent =
    totalMax > 0 ? Math.round((totalMarks / totalMax) * 100) : student?.performancePercentage || 0;

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="My Progress"
      subtitle="Track your marks, attendance, behavior and achievements."
      icon="trending-up-outline"
      color={COLORS.primary}
    >
      <AnalyticsGrid>
        <AnalyticsCard
          title="Performance"
          value={performancePercent + "%"}
          subtitle="Overall marks score"
          icon="bar-chart-outline"
          color={COLORS.purple}
          trend="Live"
        />
        <AnalyticsCard
          title="Attendance"
          value={attendancePercent + "%"}
          subtitle="Present percentage"
          icon="checkmark-circle-outline"
          color={COLORS.success}
          trend="Live"
        />
        <AnalyticsCard
          title="Achievements"
          value={achievements.length}
          subtitle="Awards and certificates"
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
        title="Learning Score"
        subtitle="Your current academic score overview."
      >
        <ProgressRow label="Academic Performance" value={performancePercent} color={COLORS.purple} />
        <ProgressRow label="Attendance Strength" value={attendancePercent} color={COLORS.success} />

        <InsightBox
          title="Study Insight"
          message={
            performancePercent >= 75
              ? "Great work. Keep revising weak topics to maintain your performance."
              : "Focus on revision, daily tasks and doubts to improve your performance."
          }
          color={performancePercent >= 75 ? COLORS.success : COLORS.warning}
        />
      </AnalyticsSection>

      <AnalyticsSection title="Recent Marks" subtitle="Latest uploaded marks from your teachers.">
        {marks.length === 0 ? (
          <InsightBox
            title="No Marks Yet"
            message="Your marks will appear here once teacher uploads them."
            color={COLORS.muted}
          />
        ) : (
          marks.slice(0, 6).map((item) => <MarkCard key={item.id} item={item} />)
        )}
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
