import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import MeetingCard from "../../components/MeetingCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function TeacherMeetingRequestsScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");

  const meetings = app.meetings || [];

  const accept = (id) => {
    if (app.acceptMeeting) {
      app.acceptMeeting(id);
    }
    setSuccess("Meeting request accepted.");
  };

  const reschedule = (id) => {
    if (app.rescheduleMeeting) {
      app.rescheduleMeeting(id);
    }
    setSuccess("Meeting request marked for reschedule.");
  };

  const reject = (id) => {
    if (app.rejectMeeting) {
      app.rejectMeeting(id);
    }
    setSuccess("Meeting request rejected.");
  };

  return (
    <>
      <ListScreenWrapper
        navigation={navigation}
        title="Meeting Requests"
        subtitle="Manage parent-teacher meeting requests."
        icon="people-outline"
        color={COLORS.accent}
        data={meetings}
        searchKeys={["parentName", "teacherName", "reason", "status", "preferredDate"]}
        filters={["ALL", "REQUESTED", "ACCEPTED", "RESCHEDULED", "REJECTED"]}
        getFilterValue={(item) => item.status || "REQUESTED"}
        emptyTitle="No meetings"
        emptyMessage="Parent meeting requests will appear here."
        searchPlaceholder="Search meetings..."
        renderItem={(item) => (
          <MeetingCard key={item.id} item={item}>
            <View style={styles.row}>
              <AppButton
                title="Accept"
                onPress={() => accept(item.id)}
                style={styles.btn}
              />
              <AppButton
                title="Reschedule"
                onPress={() => reschedule(item.id)}
                style={[styles.btn, styles.reschedule]}
              />
            </View>

            <AppButton
              title="Reject"
              onPress={() => reject(item.id)}
              style={styles.reject}
            />
          </MeetingCard>
        )}
      />

      <SuccessModal
        visible={!!success}
        title="Meeting Request"
        message={success}
        onClose={() => setSuccess("")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  btn: {
    flex: 1,
  },
  reschedule: {
    backgroundColor: COLORS.warning,
  },
  reject: {
    backgroundColor: COLORS.danger,
  },
});
