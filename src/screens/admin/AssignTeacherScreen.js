import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import BaseListCard from "../../components/BaseListCard";
import FormScreenWrapper, { FormCard, FormSectionTitle, ChipGroup, InfoBox } from "../../components/FormScreenWrapper";

export default function AssignTeacherScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    teacherName: "",
    subject: "Mathematics",
    className: "Class 10",
    section: "A",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const assignments = app.teacherAssignments || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.teacherName) {
      setError("Please fill teacher name.");
      return;
    }

    if (app.assignTeacher) {
      app.assignTeacher({
        ...form,
        status: "ASSIGNED",
      });
    }

    setError("");
    setSuccess("Teacher assigned successfully.");
    setForm({ teacherName: "", subject: "Mathematics", className: "Class 10", section: "A" });
  };

  return (
    <FormScreenWrapper
      title="Assign Teacher"
      subtitle="Assign teachers to classes and subjects."
      icon="git-branch-outline"
      color={COLORS.primary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle title="Teacher Assignment" subtitle="Map teacher with class, section and subject." />

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

        <Text style={styles.label}>Section</Text>
        <ChipGroup
          value={form.section}
          onChange={(v) => update("section", v)}
          options={["A", "B", "C", "D"]}
        />

        <AppInput
          label="Teacher Name"
          value={form.teacherName}
          onChangeText={(v) => update("teacherName", v)}
          placeholder="Enter teacher name"
        />

        <InfoBox text="This assignment controls teacher dashboard class access later." />

        <AppButton title="Assign Teacher" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Assignments" subtitle="Recent teacher assignments." />

        {assignments.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No teacher assignments yet." />
        ) : (
          assignments.slice(0, 12).map((item) => (
            <BaseListCard
              key={item.id}
              title={item.teacherName || "Teacher"}
              subtitle={(item.className || "Class") + " " + (item.section || "") + " • " + (item.subject || "Subject")}
              meta="Teacher assignment"
              status={item.status || "ASSIGNED"}
              icon="git-branch-outline"
              color={COLORS.primary}
            />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Teacher Assigned"
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
