import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import BehaviorCard from "../../components/BehaviorCard";
import FormScreenWrapper, { FormCard, FormSectionTitle, ChipGroup, InfoBox } from "../../components/FormScreenWrapper";

export default function ManageBehaviorScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    studentName: "",
    type: "POSITIVE",
    points: "",
    remark: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const records = app.behaviorRecords || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.studentName || !form.remark) {
      setError("Please fill student name and remark.");
      return;
    }

    if (app.addBehaviorRecord) {
      app.addBehaviorRecord({
        ...form,
        status: "BEHAVIOR",
      });
    }

    setError("");
    setSuccess("Behavior record added successfully.");
    setForm({ studentName: "", type: "POSITIVE", points: "", remark: "" });
  };

  return (
    <FormScreenWrapper
      title="Behavior Records"
      subtitle="Add positive or discipline behavior notes."
      icon="star-outline"
      color={COLORS.accent}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle title="Add Behavior Record" subtitle="Track student behavior and discipline." />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Type</Text>
        <ChipGroup
          value={form.type}
          onChange={(v) => update("type", v)}
          options={["POSITIVE", "DISCIPLINE", "IMPROVEMENT"]}
        />

        <AppInput
          label="Student Name"
          value={form.studentName}
          onChangeText={(v) => update("studentName", v)}
          placeholder="Enter student name"
        />

        <AppInput
          label="Points"
          value={form.points}
          onChangeText={(v) => update("points", v)}
          placeholder="Example: 5"
          keyboardType="numeric"
        />

        <AppInput
          label="Remark"
          value={form.remark}
          onChangeText={(v) => update("remark", v)}
          placeholder="Write behavior note"
          multiline
        />

        <InfoBox color={COLORS.accent} text="Behavior record will appear in student and parent performance." />

        <AppButton title="Add Record" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Behavior List" subtitle="Recent behavior records." />

        {records.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No behavior records yet." />
        ) : (
          records.slice(0, 12).map((item) => (
            <BehaviorCard key={item.id} item={item} />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Behavior"
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
