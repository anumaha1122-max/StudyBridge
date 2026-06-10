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

export default function AskDoubtScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    subject: "Mathematics",
    doubtText: "",
    attachmentName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.doubtText) {
      setError("Please type your doubt.");
      return;
    }

    if (app.askDoubt) {
      app.askDoubt({
        ...form,
        studentId: currentUser?.studentId || 1,
        studentName: currentUser?.name || "Student",
        status: "PENDING",
      });
    }

    setError("");
    setSuccess("Your doubt has been sent to the teacher.");
  };

  return (
    <FormScreenWrapper
      title="Ask Doubt"
      subtitle="Ask your teacher and track the answer."
      icon="help-circle-outline"
      color={COLORS.accent}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Doubt Details"
          subtitle="Write clearly so your teacher can answer quickly."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Subject</Text>
        <ChipGroup
          value={form.subject}
          onChange={(v) => update("subject", v)}
          options={["Mathematics", "Science", "English", "Social", "Computer"]}
        />

        <AppInput
          label="Your Doubt"
          value={form.doubtText}
          onChangeText={(v) => update("doubtText", v)}
          placeholder="Type your question here"
          multiline
        />

        <AppInput
          label="Attachment Name"
          value={form.attachmentName}
          onChangeText={(v) => update("attachmentName", v)}
          placeholder="Optional: image/file name"
        />

        <InfoBox color={COLORS.accent} text="Teacher answer will appear in your doubt discussion screen." />

        <AppButton title="Submit Doubt" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Doubt Submitted"
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
