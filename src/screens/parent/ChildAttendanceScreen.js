import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AttendanceCard from "../../components/AttendanceCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ChildAttendanceScreen({ navigation }) {
  const app = useApp();
  const attendance = app.attendance || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Child Attendance"
      subtitle="Track daily attendance, late and absent records."
      icon="calendar-outline"
      color={COLORS.success}
      data={attendance}
      searchKeys={["studentName", "status", "date", "remark"]}
      filters={["ALL", "PRESENT", "ABSENT", "LATE", "LEAVE"]}
      getFilterValue={(item) => item.status || "PRESENT"}
      emptyTitle="No attendance"
      emptyMessage="Attendance records will appear here."
      searchPlaceholder="Search attendance..."
      renderItem={(item) => (
        <AttendanceCard key={item.id} item={item} />
      )}
    />
  );
}
