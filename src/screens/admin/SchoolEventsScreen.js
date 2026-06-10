import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import EventCard from "../../components/EventCard";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  ChipGroup,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function SchoolEventsScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    title: "",
    type: "EVENT",
    date: "",
    time: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const events = app.events || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.title || !form.date || !form.description) {
      setError("Please fill title, date and description.");
      return;
    }

    if (app.createEvent) {
      app.createEvent(form);
    }

    setError("");
    setSuccess("School event created successfully.");
  };

  return (
    <FormScreenWrapper
      title="School Events"
      subtitle="Create events, holidays, meetings and exam reminders."
      icon="calendar-clear-outline"
      color={COLORS.accent}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Create Event"
          subtitle="This event will be visible for students, parents and teachers."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Event Type</Text>
        <ChipGroup
          value={form.type}
          onChange={(v) => update("type", v)}
          options={["EVENT", "HOLIDAY", "EXAM", "MEETING"]}
        />

        <AppInput
          label="Event Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Annual Day"
        />

        <AppInput
          label="Date"
          value={form.date}
          onChangeText={(v) => update("date", v)}
          placeholder="Example: 2026-06-25"
        />

        <AppInput
          label="Time"
          value={form.time}
          onChangeText={(v) => update("time", v)}
          placeholder="Example: 10:00 AM"
        />

        <AppInput
          label="Description"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          placeholder="Write event details"
          multiline
        />

        <InfoBox
          color={COLORS.accent}
          text="Event notification will be sent to all users after backend integration."
        />

        <AppButton title="Create Event" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle
          title="Recent Events"
          subtitle="Events already created."
        />

        {events.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No events created yet." />
        ) : (
          events.slice(0, 8).map((item) => (
            <EventCard key={item.id} item={item} />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Event"
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
