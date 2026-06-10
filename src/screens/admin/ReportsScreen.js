import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AnalyticsCard from "../../components/AnalyticsCard";
import AnalyticsScreenWrapper, {
  AnalyticsGrid,
  AnalyticsSection,
  InsightBox,
  ProgressRow,
} from "../../components/AnalyticsScreenWrapper";
import ReportCard from "../../components/ReportCard";

export default function ReportsScreen({ navigation }) {
  const app = useApp();

  const students = app.students?.length || 0;
  const teachers = app.teachers?.length || 0;
  const parents = app.parents?.length || 0;
  const classes = app.classes?.length || 0;
  const fees = app.fees || [];
  const attendance = app.attendance || [];
  const marks = app.marks || [];
  const leaveRequests = app.leaveRequests || [];

  const verifiedFees = fees.filter((item) => item.status === "VERIFIED").length;
  const pendingFees = fees.filter((item) => item.status !== "VERIFIED").length;
  const presentCount = attendance.filter((item) => item.status === "PRESENT").length;
  const attendancePercent =
    attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;

  const totalMarks = marks.reduce((sum, item) => sum + Number(item.marksObtained || 0), 0);
  const totalMax = marks.reduce((sum, item) => sum + Number(item.totalMarks || 0), 0);
  const performancePercent = totalMax > 0 ? Math.round((totalMarks / totalMax) * 100) : 0;

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="School Reports"
      subtitle="Complete analytics for school users, attendance, fees and performance."
      icon="bar-chart-outline"
      color={COLORS.purple}
    >
      <AnalyticsGrid>
        <AnalyticsCard
          title="Students"
          value={students}
          subtitle="Active student profiles"
          icon="people-outline"
          color={COLORS.primary}
          trend="+Live"
        />
        <AnalyticsCard
          title="Teachers"
          value={teachers}
          subtitle="Teaching staff"
          icon="school-outline"
          color={COLORS.secondary}
          trend="+Live"
        />
        <AnalyticsCard
          title="Parents"
          value={parents}
          subtitle="Parent accounts"
          icon="people-circle-outline"
          color={COLORS.accent}
        />
        <AnalyticsCard
          title="Classes"
          value={classes}
          subtitle="Configured classes"
          icon="business-outline"
          color={COLORS.purple}
        />
      </AnalyticsGrid>

      <AnalyticsSection
        title="Academic Health"
        subtitle="Attendance and marks performance summary."
      >
        <ProgressRow label="Attendance Percentage" value={attendancePercent} color={COLORS.success} />
        <ProgressRow label="Performance Percentage" value={performancePercent} color={COLORS.purple} />

        <InsightBox
          title="Academic Insight"
          message={
            attendancePercent >= 75
              ? "Attendance is healthy. Continue monitoring low-attendance students."
              : "Attendance needs attention. Send alerts to parents and class teachers."
          }
          color={attendancePercent >= 75 ? COLORS.success : COLORS.warning}
        />
      </AnalyticsSection>

      <AnalyticsSection
        title="Finance Report"
        subtitle="Fee verification and pending payment status."
      >
        <ReportCard
          title="Verified Payments"
          subtitle="Payments approved by admin"
          value={verifiedFees}
          icon="shield-checkmark-outline"
          color={COLORS.success}
        />
        <ReportCard
          title="Pending Payments"
          subtitle="Proofs or dues waiting for action"
          value={pendingFees}
          icon="time-outline"
          color={COLORS.warning}
        />
      </AnalyticsSection>

      <AnalyticsSection
        title="Requests Report"
        subtitle="Leave and approval request overview."
      >
        <ReportCard
          title="Leave Requests"
          subtitle="Total leave requests from students and parents"
          value={leaveRequests.length}
          icon="mail-outline"
          color={COLORS.danger}
        />
        <ReportCard
          title="Meetings"
          subtitle="Parent-teacher meeting requests"
          value={app.meetings?.length || 0}
          icon="people-outline"
          color={COLORS.accent}
        />
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
