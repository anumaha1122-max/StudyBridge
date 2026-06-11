import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import FeeCard from "../../components/FeeCard";
import FormScreenWrapper, { FormCard, FormSectionTitle, ChipGroup, InfoBox } from "../../components/FormScreenWrapper";

export default function ManageFeesScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    title: "",
    className: "Class 10",
    amount: "",
    dueDate: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fees = app.fees || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.title || !form.amount || !form.dueDate) {
      setError("Please fill fee title, amount and due date.");
      return;
    }

    if (app.createFee) {
      app.createFee({
        ...form,
        status: "PENDING",
      });
    }

    setError("");
    setSuccess("Fee created successfully.");
    setForm({ title: "", className: "Class 10", amount: "", dueDate: "" });
  };

  return (
    <FormScreenWrapper
      title="Manage Fees"
      subtitle="Create fee dues and track payments."
      icon="card-outline"
      color={COLORS.warning}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle title="Create Fee" subtitle="Generate fee due for class or students." />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Class</Text>
        <ChipGroup
          value={form.className}
          onChange={(v) => update("className", v)}
          options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "ALL"]}
        />

        <AppInput
          label="Fee Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Term 1 Fee"
        />

        <AppInput
          label="Amount"
          value={form.amount}
          onChangeText={(v) => update("amount", v)}
          placeholder="Example: 25000"
          keyboardType="numeric"
        />

        <AppInput
          label="Due Date"
          value={form.dueDate}
          onChangeText={(v) => update("dueDate", v)}
          placeholder="Example: 2026-06-30"
        />

        <InfoBox color={COLORS.warning} text="Parents can upload payment proof after fee creation." />

        <AppButton title="Create Fee" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Fees List" subtitle="Created fee records." />

        {fees.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No fees created yet." />
        ) : (
          fees.slice(0, 12).map((item) => (
            <FeeCard key={item.id} item={item} />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Fee"
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
