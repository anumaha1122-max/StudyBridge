import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  ChipGroup,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function AttendanceScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    studentName: "",
    className: "Class 10",
    date: "",
    status: "PRESENT",
    remark: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.studentName || !form.date) {
      setError("Please fill student name and date.");
      return;
    }

    if (app.markAttendance) {
      app.markAttendance(form);
    }

    setError("");
    setSuccess("Attendance marked successfully.");
  };

  return (
    <FormScreenWrapper
      title="Mark Attendance"
      subtitle="Update daily student attendance."
      icon="calendar-outline"
      color={COLORS.success}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Attendance Details"
          subtitle="Absent alerts will be visible to parents."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Status</Text>
        <ChipGroup
          value={form.status}
          onChange={(v) => update("status", v)}
          options={["PRESENT", "ABSENT", "LATE", "LEAVE"]}
        />

        <Text style={styles.label}>Class</Text>
        <ChipGroup
          value={form.className}
          onChange={(v) => update("className", v)}
          options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]}
        />

        <AppInput
          label="Student Name"
          value={form.studentName}
          onChangeText={(v) => update("studentName", v)}
          placeholder="Enter student name"
        />

        <AppInput
          label="Date"
          value={form.date}
          onChangeText={(v) => update("date", v)}
          placeholder="Example: 2026-06-10"
        />

        <AppInput
          label="Remark"
          value={form.remark}
          onChangeText={(v) => update("remark", v)}
          placeholder="Optional remark"
          multiline
        />

        <InfoBox color={COLORS.success} text="Attendance records help parents track student consistency." />

        <AppButton title="Save Attendance" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Attendance"
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
