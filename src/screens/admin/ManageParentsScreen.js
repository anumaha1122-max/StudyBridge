import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import BaseListCard from "../../components/BaseListCard";
import FormScreenWrapper, { FormCard, FormSectionTitle, InfoBox } from "../../components/FormScreenWrapper";

export default function ManageParentsScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    childName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const parents = app.parents || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill parent name, email and phone.");
      return;
    }

    if (app.addParent) {
      app.addParent({
        ...form,
        status: "ACTIVE",
      });
    }

    setError("");
    setSuccess("Parent added successfully.");
    setForm({ name: "", email: "", phone: "", childName: "" });
  };

  return (
    <FormScreenWrapper
      title="Manage Parents"
      subtitle="Add parent accounts and child linking."
      icon="people-circle-outline"
      color={COLORS.accent}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Add Parent"
          subtitle="Create parent profile for child tracking."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="Parent Name"
          value={form.name}
          onChangeText={(v) => update("name", v)}
          placeholder="Enter parent name"
        />

        <AppInput
          label="Parent Email"
          value={form.email}
          onChangeText={(v) => update("email", v)}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <AppInput
          label="Parent Phone"
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
          placeholder="Enter phone"
          keyboardType="phone-pad"
        />

        <AppInput
          label="Child Name"
          value={form.childName}
          onChangeText={(v) => update("childName", v)}
          placeholder="Enter child name"
        />

        <InfoBox color={COLORS.accent} text="Parent can track homework, attendance, fees and meetings." />

        <AppButton title="Add Parent" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Parents List" subtitle="Recently added parents." />

        {parents.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No parents added yet." />
        ) : (
          parents.slice(0, 12).map((item) => (
            <BaseListCard
              key={item.id}
              title={item.name || "Parent"}
              subtitle={(item.childName || "Child") + " • " + (item.phone || "No phone")}
              meta={item.email || ""}
              status={item.status || "ACTIVE"}
              icon="people-outline"
              color={COLORS.accent}
            />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Parent"
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
