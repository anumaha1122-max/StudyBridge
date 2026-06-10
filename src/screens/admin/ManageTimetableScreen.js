import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import TimetableCard from "../../components/TimetableCard";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  ChipGroup,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function ManageTimetableScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    day: "Monday",
    className: "Class 10",
    period: "",
    subject: "",
    teacher: "",
    time: "",
    room: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const timetable = app.timetable || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.period || !form.subject || !form.time) {
      setError("Please fill period, subject and time.");
      return;
    }

    if (app.addTimetable) {
      app.addTimetable(form);
    }

    setError("");
    setSuccess("Timetable period added successfully.");
  };

  return (
    <FormScreenWrapper
      title="Manage Timetable"
      subtitle="Create and update school class schedule."
      icon="time-outline"
      color={COLORS.primary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Add Period"
          subtitle="Create class timetable period with subject and teacher."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Day</Text>
        <ChipGroup
          value={form.day}
          onChange={(v) => update("day", v)}
          options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
        />

        <Text style={styles.label}>Class</Text>
        <ChipGroup
          value={form.className}
          onChange={(v) => update("className", v)}
          options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]}
        />

        <AppInput
          label="Period Number"
          value={form.period}
          onChangeText={(v) => update("period", v)}
          placeholder="Example: 1"
          keyboardType="numeric"
        />

        <AppInput
          label="Subject"
          value={form.subject}
          onChangeText={(v) => update("subject", v)}
          placeholder="Example: Mathematics"
        />

        <AppInput
          label="Teacher"
          value={form.teacher}
          onChangeText={(v) => update("teacher", v)}
          placeholder="Example: Mr. Kumar"
        />

        <AppInput
          label="Time"
          value={form.time}
          onChangeText={(v) => update("time", v)}
          placeholder="Example: 09:00 AM - 09:45 AM"
        />

        <AppInput
          label="Room"
          value={form.room}
          onChangeText={(v) => update("room", v)}
          placeholder="Example: Room 101"
        />

        <InfoBox text="Timetable will be visible to student, teacher and parent portals." />

        <AppButton title="Add Period" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle
          title="Current Timetable"
          subtitle="Recently added periods."
        />

        {timetable.length === 0 ? (
          <InfoBox
            color={COLORS.muted}
            text="No timetable periods added yet."
          />
        ) : (
          timetable.slice(0, 8).map((item) => (
            <TimetableCard key={item.id} item={item} />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Timetable"
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
