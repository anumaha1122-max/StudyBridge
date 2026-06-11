import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import BaseListCard from "../../components/BaseListCard";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  ChipGroup,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function ManageStudentsScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    className: "Class 10",
    parentName: "",
    parentPhone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const students = app.students || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill student name, email and phone.");
      return;
    }

    if (app.addStudent) {
      app.addStudent({
        ...form,
        status: "ACTIVE",
      });
    }

    setError("");
    setSuccess("Student added successfully.");
    setForm({
      name: "",
      email: "",
      phone: "",
      className: "Class 10",
      parentName: "",
      parentPhone: "",
    });
  };

  return (
    <FormScreenWrapper
      title="Manage Students"
      subtitle="Add and manage student profiles."
      icon="people-outline"
      color={COLORS.primary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Add Student"
          subtitle="Create student profile with parent contact details."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Class</Text>
        <ChipGroup
          value={form.className}
          onChange={(v) => update("className", v)}
          options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]}
        />

        <AppInput
          label="Student Name"
          value={form.name}
          onChangeText={(v) => update("name", v)}
          placeholder="Enter student name"
        />

        <AppInput
          label="Student Email"
          value={form.email}
          onChangeText={(v) => update("email", v)}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <AppInput
          label="Student Phone"
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
          placeholder="Enter phone"
          keyboardType="phone-pad"
        />

        <AppInput
          label="Parent Name"
          value={form.parentName}
          onChangeText={(v) => update("parentName", v)}
          placeholder="Enter parent name"
        />

        <AppInput
          label="Parent Phone"
          value={form.parentPhone}
          onChangeText={(v) => update("parentPhone", v)}
          placeholder="Enter parent phone"
          keyboardType="phone-pad"
        />

        <InfoBox text="Student login and parent linking can be connected with backend later." />

        <AppButton title="Add Student" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Students List" subtitle="Recently added students." />

        {students.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No students added yet." />
        ) : (
          students.slice(0, 12).map((item) => (
            <BaseListCard
              key={item.id}
              title={item.name || "Student"}
              subtitle={(item.className || "Class") + " • " + (item.phone || "No phone")}
              meta={item.email || ""}
              status={item.status || "ACTIVE"}
              icon="person-outline"
              color={COLORS.primary}
            />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Student"
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
