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

export default function CreateExamScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    className: "Class 10",
    examDate: "",
    startTime: "",
    totalMarks: "",
    syllabus: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.title || !form.examDate || !form.totalMarks) {
      setError("Please fill exam title, exam date and total marks.");
      return;
    }

    if (app.createExam) {
      app.createExam({
        ...form,
        status: "UPCOMING",
      });
    }

    setError("");
    setSuccess("Exam created successfully.");
  };

  return (
    <FormScreenWrapper
      title="Create Exam"
      subtitle="Schedule exams with subject, marks and syllabus."
      icon="calendar-outline"
      color={COLORS.warning}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Exam Information"
          subtitle="Students and parents will see this exam schedule."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Subject</Text>
        <ChipGroup
          value={form.subject}
          onChange={(v) => update("subject", v)}
          options={["Mathematics", "Science", "English", "Social", "Computer"]}
        />

        <Text style={styles.label}>Class</Text>
        <ChipGroup
          value={form.className}
          onChange={(v) => update("className", v)}
          options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]}
        />

        <AppInput
          label="Exam Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Unit Test 1"
        />

        <AppInput
          label="Exam Date"
          value={form.examDate}
          onChangeText={(v) => update("examDate", v)}
          placeholder="Example: 2026-06-20"
        />

        <AppInput
          label="Start Time"
          value={form.startTime}
          onChangeText={(v) => update("startTime", v)}
          placeholder="Example: 10:00 AM"
        />

        <AppInput
          label="Total Marks"
          value={form.totalMarks}
          onChangeText={(v) => update("totalMarks", v)}
          placeholder="Example: 100"
          keyboardType="numeric"
        />

        <AppInput
          label="Syllabus"
          value={form.syllabus}
          onChangeText={(v) => update("syllabus", v)}
          placeholder="Enter exam syllabus"
          multiline
        />

        <InfoBox color={COLORS.warning} text="Exam will be visible in student and parent exam planners." />

        <AppButton title="Create Exam" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Exam"
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
