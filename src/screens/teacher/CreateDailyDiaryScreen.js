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

export default function CreateDailyDiaryScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    className: "Class 10",
    date: "",
    classSummary: "",
    homeworkSummary: "",
    reminders: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.date || !form.classSummary) {
      setError("Please fill date and class summary.");
      return;
    }

    if (app.createDailyDiary) {
      app.createDailyDiary({
        ...form,
        status: "DIARY",
      });
    }

    setError("");
    setSuccess("Daily diary created successfully.");
  };

  return (
    <FormScreenWrapper
      title="Daily Diary"
      subtitle="Share daily classroom summary with parents."
      icon="journal-outline"
      color={COLORS.secondary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Diary Entry"
          subtitle="Parents can acknowledge this diary update."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Class</Text>
        <ChipGroup
          value={form.className}
          onChange={(v) => update("className", v)}
          options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]}
        />

        <AppInput
          label="Date"
          value={form.date}
          onChangeText={(v) => update("date", v)}
          placeholder="Example: 2026-06-10"
        />

        <AppInput
          label="Class Summary"
          value={form.classSummary}
          onChangeText={(v) => update("classSummary", v)}
          placeholder="What was taught today?"
          multiline
        />

        <AppInput
          label="Homework Summary"
          value={form.homeworkSummary}
          onChangeText={(v) => update("homeworkSummary", v)}
          placeholder="Homework or practice tasks"
          multiline
        />

        <AppInput
          label="Reminders"
          value={form.reminders}
          onChangeText={(v) => update("reminders", v)}
          placeholder="Any reminder for parents"
          multiline
        />

        <InfoBox color={COLORS.secondary} text="This diary will be visible in parent and student portals." />

        <AppButton title="Create Diary" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Daily Diary"
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
