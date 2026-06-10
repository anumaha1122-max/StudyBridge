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

export default function TeacherFeedbackScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    studentName: "",
    type: "ACADEMIC",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.studentName || !form.message) {
      setError("Please fill student name and feedback message.");
      return;
    }

    if (app.addFeedback) {
      app.addFeedback({
        ...form,
        createdBy: "TEACHER",
        status: "NEW",
      });
    }

    setError("");
    setSuccess("Feedback submitted successfully.");
  };

  return (
    <FormScreenWrapper
      navigation={navigation}
      title="Teacher Feedback"
      subtitle="Send academic or behavior feedback to student and parent."
      icon="chatbubble-ellipses-outline"
      color={COLORS.secondary}
    >
      <FormCard>
        <FormSectionTitle
          title="Feedback Details"
          subtitle="This helps students and parents understand progress."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Feedback Type</Text>
        <ChipGroup
          value={form.type}
          onChange={(v) => update("type", v)}
          options={["ACADEMIC", "BEHAVIOR", "IMPROVEMENT", "APPRECIATION"]}
        />

        <AppInput
          label="Student Name"
          value={form.studentName}
          onChangeText={(v) => update("studentName", v)}
          placeholder="Enter student name"
        />

        <AppInput
          label="Feedback Message"
          value={form.message}
          onChangeText={(v) => update("message", v)}
          placeholder="Write feedback"
          multiline
        />

        <InfoBox
          color={COLORS.secondary}
          text="Feedback will be visible to student and parent."
        />

        <AppButton title="Submit Feedback" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Feedback"
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
