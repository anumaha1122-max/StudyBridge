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

export default function AssignHomeworkScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    className: "Class 10",
    dueDate: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = () => {
    if (!form.title || !form.dueDate || !form.description) {
      setError("Please fill title, due date and description.");
      return;
    }

    if (app.createHomework) {
      app.createHomework({
        ...form,
        teacherId: currentUser?.teacherId || 1,
        teacherName: currentUser?.name || "Teacher",
        status: "PENDING",
      });
    }

    setError("");
    setSuccess("Homework assigned successfully.");
  };

  return (
    <FormScreenWrapper
      title="Assign Homework"
      subtitle="Create homework and send it to students and parents."
      icon="book-outline"
      color={COLORS.primary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Homework Details"
          subtitle="Choose class, subject and describe the task clearly."
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
          label="Homework Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Algebra practice problems"
        />

        <AppInput
          label="Due Date"
          value={form.dueDate}
          onChangeText={(v) => update("dueDate", v)}
          placeholder="Example: 2026-06-15"
        />

        <AppInput
          label="Description"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          placeholder="Write homework instructions"
          multiline
        />

        <InfoBox text="Students and parents will receive this homework update." />

        <AppButton title="Assign Homework" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Homework"
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
