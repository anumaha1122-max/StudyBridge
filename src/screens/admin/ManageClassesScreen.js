import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import BaseListCard from "../../components/BaseListCard";
import FormScreenWrapper, { FormCard, FormSectionTitle, InfoBox } from "../../components/FormScreenWrapper";

export default function ManageClassesScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    name: "",
    section: "",
    classTeacher: "",
    room: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const classes = app.classes || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.name || !form.section) {
      setError("Please fill class name and section.");
      return;
    }

    if (app.addClass) {
      app.addClass({
        ...form,
        status: "ACTIVE",
      });
    }

    setError("");
    setSuccess("Class added successfully.");
    setForm({ name: "", section: "", classTeacher: "", room: "" });
  };

  return (
    <FormScreenWrapper
      title="Manage Classes"
      subtitle="Create classes, sections and class teachers."
      icon="business-outline"
      color={COLORS.purple}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle title="Add Class" subtitle="Create a new school class or section." />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="Class Name"
          value={form.name}
          onChangeText={(v) => update("name", v)}
          placeholder="Example: Class 10"
        />

        <AppInput
          label="Section"
          value={form.section}
          onChangeText={(v) => update("section", v)}
          placeholder="Example: A"
        />

        <AppInput
          label="Class Teacher"
          value={form.classTeacher}
          onChangeText={(v) => update("classTeacher", v)}
          placeholder="Example: Mr. Kumar"
        />

        <AppInput
          label="Room"
          value={form.room}
          onChangeText={(v) => update("room", v)}
          placeholder="Example: Room 101"
        />

        <InfoBox color={COLORS.purple} text="Classes are used for homework, attendance, timetable and reports." />

        <AppButton title="Add Class" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Classes List" subtitle="Created school classes." />

        {classes.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No classes added yet." />
        ) : (
          classes.slice(0, 12).map((item) => (
            <BaseListCard
              key={item.id}
              title={(item.name || "Class") + (item.section ? " - " + item.section : "")}
              subtitle={(item.classTeacher || "No teacher") + " • " + (item.room || "No room")}
              meta="Class management"
              status={item.status || "ACTIVE"}
              icon="business-outline"
              color={COLORS.purple}
            />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Class"
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
