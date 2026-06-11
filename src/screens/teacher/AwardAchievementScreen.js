import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import AchievementCard from "../../components/AchievementCard";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function AwardAchievementScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    studentName: "",
    title: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const achievements = app.achievements || [];

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = () => {
    if (!form.studentName || !form.title) {
      setError("Please fill student name and achievement title.");
      return;
    }

    if (app.awardAchievement) {
      app.awardAchievement({
        ...form,
        awardedBy: currentUser?.name || "Teacher",
        status: "AWARDED",
      });
    }

    setError("");
    setSuccess("Achievement awarded successfully.");
    setForm({
      studentName: "",
      title: "",
      description: "",
    });
  };

  return (
    <FormScreenWrapper
      title="Award Achievement"
      subtitle="Recognize student performance and achievements."
      icon="ribbon-outline"
      color={COLORS.purple}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Achievement Details"
          subtitle="This achievement will be visible to student and parent."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="Student Name"
          value={form.studentName}
          onChangeText={(v) => update("studentName", v)}
          placeholder="Enter student name"
        />

        <AppInput
          label="Achievement Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Best Homework Submission"
        />

        <AppInput
          label="Description"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          placeholder="Write achievement details"
          multiline
        />

        <InfoBox
          color={COLORS.purple}
          text="Awards encourage students and improve parent engagement."
        />

        <AppButton title="Award Achievement" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle
          title="Recent Achievements"
          subtitle="Latest awarded achievements."
        />

        {achievements.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No achievements awarded yet." />
        ) : (
          achievements.slice(0, 8).map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Achievement"
        message={success}
        onClose={() => setSuccess("")}
      />
    </FormScreenWrapper>
  );
}

const styles = StyleSheet.create({
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
