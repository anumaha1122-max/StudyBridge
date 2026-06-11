import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import LeaveRequestCard from "../../components/LeaveRequestCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ManageLeaveRequestsScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");

  const requests = app.leaveRequests || [];

  const approve = (id) => {
    if (app.approveLeave) {
      app.approveLeave(id);
    }
    setSuccess("Leave request approved.");
  };

  const reject = (id) => {
    if (app.rejectLeave) {
      app.rejectLeave(id);
    }
    setSuccess("Leave request rejected.");
  };

  return (
    <>
      <ListScreenWrapper
        navigation={navigation}
        title="Leave Requests"
        subtitle="Manage student and parent leave requests."
        icon="mail-outline"
        color={COLORS.danger}
        data={requests}
        searchKeys={["studentName", "reason", "status", "requestedBy"]}
        filters={["ALL", "REQUESTED", "APPROVED", "REJECTED"]}
        getFilterValue={(item) => item.status || "REQUESTED"}
        emptyTitle="No leave requests"
        emptyMessage="Leave requests will appear here."
        searchPlaceholder="Search leave requests..."
        renderItem={(item) => (
          <LeaveRequestCard key={item.id} item={item}>
            <View style={styles.row}>
              <AppButton
                title="Approve"
                onPress={() => approve(item.id)}
                style={styles.btn}
              />
              <AppButton
                title="Reject"
                onPress={() => reject(item.id)}
                style={[styles.btn, styles.reject]}
              />
            </View>
          </LeaveRequestCard>
        )}
      />

      <SuccessModal
        visible={!!success}
        title="Leave Request"
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
  },
  btn: {
    flex: 1,
  },
  reject: {
    backgroundColor: COLORS.danger,
  },
});
