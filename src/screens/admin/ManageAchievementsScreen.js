import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import AchievementCard from "../../components/AchievementCard";
import FormScreenWrapper, { FormCard, FormSectionTitle, InfoBox } from "../../components/FormScreenWrapper";

export default function ManageAchievementsScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    studentName: "",
    title: "",
    description: "",
    awardedBy: "Admin",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const achievements = app.achievements || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.studentName || !form.title) {
      setError("Please fill student name and achievement title.");
      return;
    }

    if (app.awardAchievement) {
      app.awardAchievement({
        ...form,
        status: "AWARDED",
      });
    }

    setError("");
    setSuccess("Achievement awarded successfully.");
    setForm({ studentName: "", title: "", description: "", awardedBy: "Admin" });
  };

  return (
    <FormScreenWrapper
      title="Achievements"
      subtitle="Award certificates and achievements to students."
      icon="ribbon-outline"
      color={COLORS.purple}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle title="Award Achievement" subtitle="Add student achievement record." />

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
          placeholder="Example: Best Performer"
        />

        <AppInput
          label="Description"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          placeholder="Achievement details"
          multiline
        />

        <InfoBox color={COLORS.purple} text="Achievement will be visible to student and parent." />

        <AppButton title="Award Achievement" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Achievements List" subtitle="Recently awarded achievements." />

        {achievements.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No achievements awarded yet." />
        ) : (
          achievements.slice(0, 12).map((item) => (
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
