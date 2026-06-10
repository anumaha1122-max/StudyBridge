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
  ChipGroup,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function ParentMeetingRequestScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    teacherName: "Class Teacher",
    preferredDate: "",
    preferredTime: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.preferredDate || !form.preferredTime || !form.reason) {
      setError("Please fill meeting date, time and reason.");
      return;
    }

    if (app.requestMeeting) {
      app.requestMeeting({
        ...form,
        parentId: currentUser?.parentId || 1,
        parentName: currentUser?.name || "Parent",
        studentId: currentUser?.childId || 1,
        status: "REQUESTED",
      });
    }

    setError("");
    setSuccess("Meeting request submitted successfully.");
  };

  return (
    <FormScreenWrapper
      title="Meeting Request"
      subtitle="Request a parent-teacher meeting."
      icon="people-outline"
      color={COLORS.accent}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Meeting Details"
          subtitle="Teacher can accept or reschedule your request."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Teacher</Text>
        <ChipGroup
          value={form.teacherName}
          onChange={(v) => update("teacherName", v)}
          options={["Class Teacher", "Math Teacher", "Science Teacher", "English Teacher"]}
        />

        <AppInput
          label="Preferred Date"
          value={form.preferredDate}
          onChangeText={(v) => update("preferredDate", v)}
          placeholder="Example: 2026-06-18"
        />

        <AppInput
          label="Preferred Time"
          value={form.preferredTime}
          onChangeText={(v) => update("preferredTime", v)}
          placeholder="Example: 04:30 PM"
        />

        <AppInput
          label="Reason"
          value={form.reason}
          onChangeText={(v) => update("reason", v)}
          placeholder="Reason for meeting"
          multiline
        />

        <InfoBox color={COLORS.accent} text="Meeting response will be visible in notifications." />

        <AppButton title="Request Meeting" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Meeting"
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
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
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
