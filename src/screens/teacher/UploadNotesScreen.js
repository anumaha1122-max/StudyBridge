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

export default function UploadNotesScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    className: "Class 10",
    type: "PDF",
    description: "",
    fileName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.title || !form.description) {
      setError("Please fill title and description.");
      return;
    }

    if (app.uploadNotes) {
      app.uploadNotes({
        ...form,
        status: "NEW",
      });
    }

    setError("");
    setSuccess("Study material uploaded successfully.");
  };

  return (
    <FormScreenWrapper
      title="Upload Notes"
      subtitle="Share study material with students."
      icon="document-text-outline"
      color={COLORS.secondary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Study Material"
          subtitle="Add notes, links, PDFs or video references."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Material Type</Text>
        <ChipGroup
          value={form.type}
          onChange={(v) => update("type", v)}
          options={["PDF", "VIDEO", "LINK", "IMAGE", "TEXT"]}
        />

        <Text style={styles.label}>Subject</Text>
        <ChipGroup
          value={form.subject}
          onChange={(v) => update("subject", v)}
          options={["Mathematics", "Science", "English", "Social", "Computer"]}
        />

        <AppInput
          label="Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Chapter 1 notes"
        />

        <AppInput
          label="File / Link Name"
          value={form.fileName}
          onChangeText={(v) => update("fileName", v)}
          placeholder="Example: algebra-notes.pdf"
        />

        <AppInput
          label="Description"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          placeholder="Explain what this material contains"
          multiline
        />

        <InfoBox color={COLORS.secondary} text="Students can mark this material as read after learning." />

        <AppButton title="Upload Notes" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Study Material"
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
