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

export default function AddTaskScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    date: "",
    description: "",
    status: "PENDING",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = () => {
    if (!form.title || !form.date) {
      setError("Please fill task title and date.");
      return;
    }

    if (app.addTask) {
      app.addTask(form);
    }

    setError("");
    setSuccess("Daily task added successfully.");
    setForm({
      title: "",
      subject: "Mathematics",
      date: "",
      description: "",
      status: "PENDING",
    });
  };

  return (
    <FormScreenWrapper
      title="Add Daily Task"
      subtitle="Create your personal study task."
      icon="add-circle-outline"
      color={COLORS.success}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Task Details"
          subtitle="Add small daily goals to improve consistency."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Subject</Text>
        <ChipGroup
          value={form.subject}
          onChange={(v) => update("subject", v)}
          options={["Mathematics", "Science", "English", "Social", "Computer", "General"]}
        />

        <AppInput
          label="Task Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Revise algebra formulas"
        />

        <AppInput
          label="Date"
          value={form.date}
          onChangeText={(v) => update("date", v)}
          placeholder="Example: 2026-06-12"
        />

        <AppInput
          label="Description"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          placeholder="Task notes"
          multiline
        />

        <InfoBox
          color={COLORS.success}
          text="Daily tasks help you build a strong study routine."
        />

        <AppButton title="Add Task" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Daily Task"
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
