import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function ParentLeaveRequestScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.fromDate || !form.toDate || !form.reason) {
      setError("Please fill leave dates and reason.");
      return;
    }

    if (app.requestLeave) {
      app.requestLeave({
        ...form,
        parentId: currentUser?.parentId || 1,
        studentId: currentUser?.childId || 1,
        studentName: currentUser?.childName || "Student",
        requestedBy: "PARENT",
        status: "REQUESTED",
      });
    }

    setError("");
    setSuccess("Leave request sent successfully.");
  };

  return (
    <FormScreenWrapper
      title="Child Leave Request"
      subtitle="Request leave for your child."
      icon="mail-outline"
      color={COLORS.danger}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Leave Information"
          subtitle="Teacher and admin can approve or reject this request."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="From Date"
          value={form.fromDate}
          onChangeText={(v) => update("fromDate", v)}
          placeholder="Example: 2026-06-12"
        />

        <AppInput
          label="To Date"
          value={form.toDate}
          onChangeText={(v) => update("toDate", v)}
          placeholder="Example: 2026-06-14"
        />

        <AppInput
          label="Reason"
          value={form.reason}
          onChangeText={(v) => update("reason", v)}
          placeholder="Enter reason"
          multiline
        />

        <InfoBox color={COLORS.danger} text="Approval updates will appear in parent notifications." />

        <AppButton title="Submit Request" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Leave Request"
        message={success}
        onClose={() => {
          setSuccess("");
          navigation.goBack();
        }}
      />
    </FormScreenWrapper>
  );
}

const styles = StyleSheet.create({
  error: {
    color: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
    padding: 12,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 14,
  },
});
