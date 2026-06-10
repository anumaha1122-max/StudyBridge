import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import AnnouncementCard from "../../components/AnnouncementCard";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  ChipGroup,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function SchoolAnnouncementsScreen({ navigation }) {
  const app = useApp();

  const [form, setForm] = useState({
    title: "",
    audience: "ALL",
    priority: "NORMAL",
    message: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const announcements = app.announcements || [];

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = () => {
    if (!form.title || !form.message) {
      setError("Please fill title and announcement message.");
      return;
    }

    if (app.createAnnouncement) {
      app.createAnnouncement({
        ...form,
        date: form.date || new Date().toISOString().slice(0, 10),
      });
    }

    setError("");
    setSuccess("Announcement created successfully.");
  };

  return (
    <FormScreenWrapper
      title="Announcements"
      subtitle="Send school notices to selected users."
      icon="megaphone-outline"
      color={COLORS.warning}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Create Announcement"
          subtitle="Choose audience and send important message."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Audience</Text>
        <ChipGroup
          value={form.audience}
          onChange={(v) => update("audience", v)}
          options={["ALL", "STUDENTS", "TEACHERS", "PARENTS"]}
        />

        <Text style={styles.label}>Priority</Text>
        <ChipGroup
          value={form.priority}
          onChange={(v) => update("priority", v)}
          options={["NORMAL", "IMPORTANT", "URGENT"]}
        />

        <AppInput
          label="Title"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          placeholder="Example: Holiday Notice"
        />

        <AppInput
          label="Message"
          value={form.message}
          onChangeText={(v) => update("message", v)}
          placeholder="Write announcement message"
          multiline
        />

        <AppInput
          label="Date"
          value={form.date}
          onChangeText={(v) => update("date", v)}
          placeholder="Optional: 2026-06-10"
        />

        <InfoBox
          color={COLORS.warning}
          text="Announcement will be visible to selected user roles."
        />

        <AppButton title="Publish Announcement" onPress={submit} />
      </FormCard>

      <FormCard>
        <FormSectionTitle
          title="Recent Announcements"
          subtitle="Latest published notices."
        />

        {announcements.length === 0 ? (
          <InfoBox color={COLORS.muted} text="No announcements created yet." />
        ) : (
          announcements.slice(0, 8).map((item) => (
            <AnnouncementCard key={item.id} item={item} />
          ))
        )}
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Announcement"
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
