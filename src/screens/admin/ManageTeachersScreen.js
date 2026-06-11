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

export default function ManageTeachersScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Mathematics",
    qualification: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const teachers = app.teachers || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill teacher name, email and phone.");
      return;
    }

    if (app.addTeacher) {
      app.addTeacher({
        ...form,
        status: "ACTIVE",
      });
    }

    setError("");
    setSuccess("Teacher added successfully.");
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "Mathematics",
      qualification: "",
    });
  };

  return (
    <FormScreenWrapper
      title="Manage Teachers"
      subtitle="Add teachers and assign subjects."
      icon="school-outline"
      color={COLORS.secondary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Add Teacher"
          subtitle="Create teacher profile and subject specialization."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Subject</Text>
        <ChipGroup
          value={form.subject}
          onChange={(v) => update("subject", v)}
          options={["Mathematics", "Science", "English", "Social", "Computer"]}
        />

        <AppInput
          label="Teacher Name"
          value={form.name}
          onChangeText={(v) => update("name", v)}
          placeholder="Enter teacher name"
        />

        <AppInput
          label="Teacher Email"
          value={form.email}
          onChangeText={(v) => update("email", v)}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <AppInput
          label="Teacher Phone"
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
          placeholder="Enter phone"
          keyboardType="phone-pad"
        />

        <AppInput
          label="Qualification"
          value={form.qualification}
          onChangeText={(v) => update("qualification", v)}
          placeholder="Example: M.Sc, B.Ed"
        />

        <InfoBox color={COLORS.secondary} text="Teacher can login and manage homework, attendance and marks." />

        <AppButton title="Add Teacher" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle title="Teachers List" subtitle="Recently added teachers." />

        {teachers.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No teachers added yet." />
        ) : (
          teachers.slice(0, 12).map((item) => (
            <BaseListCard
              key={item.id}
              title={item.name || "Teacher"}
              subtitle={(item.subject || "Subject") + " • " + (item.phone || "No phone")}
              meta={item.email || item.qualification || ""}
              status={item.status || "ACTIVE"}
              icon="school-outline"
              color={COLORS.secondary}
            />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Teacher"
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
