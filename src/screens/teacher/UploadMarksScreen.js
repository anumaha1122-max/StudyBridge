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

export default function UploadMarksScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    studentName: "",
    subject: "Mathematics",
    examTitle: "",
    marksObtained: "",
    totalMarks: "",
    remark: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.studentName || !form.examTitle || !form.marksObtained || !form.totalMarks) {
      setError("Please fill student, exam and marks details.");
      return;
    }

    if (app.uploadMarks) {
      app.uploadMarks({
        ...form,
        status: "RESULT",
      });
    }

    setError("");
    setSuccess("Marks uploaded successfully.");
  };

  return (
    <FormScreenWrapper
      title="Upload Marks"
      subtitle="Add exam marks and teacher remarks."
      icon="bar-chart-outline"
      color={COLORS.purple}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Marks Entry"
          subtitle="Parents and students can immediately see the result."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Subject</Text>
        <ChipGroup
          value={form.subject}
          onChange={(v) => update("subject", v)}
          options={["Mathematics", "Science", "English", "Social", "Computer"]}
        />

        <AppInput
          label="Student Name"
          value={form.studentName}
          onChangeText={(v) => update("studentName", v)}
          placeholder="Enter student name"
        />

        <AppInput
          label="Exam Title"
          value={form.examTitle}
          onChangeText={(v) => update("examTitle", v)}
          placeholder="Example: Unit Test 1"
        />

        <AppInput
          label="Marks Obtained"
          value={form.marksObtained}
          onChangeText={(v) => update("marksObtained", v)}
          placeholder="Example: 85"
          keyboardType="numeric"
        />

        <AppInput
          label="Total Marks"
          value={form.totalMarks}
          onChangeText={(v) => update("totalMarks", v)}
          placeholder="Example: 100"
          keyboardType="numeric"
        />

        <AppInput
          label="Remark"
          value={form.remark}
          onChangeText={(v) => update("remark", v)}
          placeholder="Example: Good improvement"
          multiline
        />

        <InfoBox color={COLORS.purple} text="Marks will update student performance reports." />

        <AppButton title="Upload Marks" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Marks"
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
