import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import BaseListCard from "../../components/BaseListCard";
import FormScreenWrapper, { FormCard, FormSectionTitle, ChipGroup, InfoBox } from "../../components/FormScreenWrapper";

export default function ManageSubjectsScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    name: "",
    className: "Class 10",
    teacherName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const subjects = app.subjects || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.name) {
      setError("Please fill subject name.");
      return;
    }

    if (app.addSubject) {
      app.addSubject({
        ...form,
        status: "ACTIVE",
      });
    }

    setError("");
    setSuccess("Subject added successfully.");
    setForm({ name: "", className: "Class 10", teacherName: "" });
  };

  return (
    <FormScreenWrapper
      title="Manage Subjects"
      subtitle="Create subjects and map teachers."
      icon="library-outline"
      color={COLORS.secondary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle title="Add Subject" subtitle="Create subject for selected class." />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Class</Text>
        <ChipGroup
          value={form.className}
          onChange={(v) => update("className", v)}
          options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]}
        />

        <AppInput
          label="Subject Name"
          value={form.name}
          onChangeText={(v) => update("name", v)}
          placeholder="Example: Mathematics"
        />

        <AppInput
          label="Teacher Name"
          value={form.teacherName}
          onChangeText={(v) => update("teacherName", v)}
          placeholder="Example: Mr. Kumar"
        />

        <InfoBox color={COLORS.secondary} text="Subjects are used in homework, marks, notes and exams." />

        <AppButton title="Add Subject" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Subjects List" subtitle="Recently added subjects." />

        {subjects.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No subjects added yet." />
        ) : (
          subjects.slice(0, 12).map((item) => (
            <BaseListCard
              key={item.id}
              title={item.name || "Subject"}
              subtitle={(item.className || "Class") + " • " + (item.teacherName || "No teacher")}
              meta="Subject management"
              status={item.status || "ACTIVE"}
              icon="library-outline"
              color={COLORS.secondary}
            />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Subject"
        message={success}
        onClose={() => setSuccess("")}
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
