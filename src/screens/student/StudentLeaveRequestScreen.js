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

export default function StudentLeaveRequestScreen({ navigation }) {
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
        studentId: currentUser?.studentId || 1,
        studentName: currentUser?.name || "Student",
        requestedBy: "STUDENT",
        status: "REQUESTED",
      });
    }

    setError("");
    setSuccess("Leave request submitted successfully.");
  };

  return (
    <FormScreenWrapper
      title="Leave Request"
      subtitle="Send leave request to teacher and admin."
      icon="mail-outline"
      color={COLORS.danger}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Leave Details"
          subtitle="Mention exact dates and reason for leave."
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
          placeholder="Enter leave reason"
          multiline
        />

        <InfoBox color={COLORS.danger} text="You can track approval status in notifications." />

        <AppButton title="Submit Leave Request" onPress={submit} />
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
