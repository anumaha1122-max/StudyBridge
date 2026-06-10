import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppHeader from "../../components/AppHeader";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";

export default function SchoolEventsScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    targetRole: "ALL",
    classId: 1,
  });

  const add = () => {
    if (!form.title || !form.eventDate) {
      setSuccess("Please enter event title and date.");
      return;
    }

    app.createEvent(form);
    setForm({ title: "", description: "", eventDate: "", targetRole: "ALL", classId: 1 });
    setSuccess("Event created successfully.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="School Events" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Events</Text>
          <Text style={styles.heroSub}>Create school events, meetings, holidays, and workshops.</Text>
        </View>

        <View style={styles.form}>
          <AppInput label="Event Title" value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} />
          <AppInput label="Description" value={form.description} onChangeText={(v) => setForm({ ...form, description: v })} multiline />
          <AppInput label="Event Date" value={form.eventDate} onChangeText={(v) => setForm({ ...form, eventDate: v })} placeholder="2026-06-25" />
          <AppInput label="Target Role" value={form.targetRole} onChangeText={(v) => setForm({ ...form, targetRole: v.toUpperCase() })} />
          <AppButton title="Create Event" onPress={add} />
        </View>

        <Text style={styles.sectionTitle}>Event List</Text>

        {app.events.map((event) => (
          <AdminCard
            key={event.id}
            title={event.title}
            subtitle={(event.description || "") + " • " + (event.eventDate || event.date || "")}
            status={event.targetRole || "ALL"}
            icon="calendar-outline"
          />
        ))}

        <SuccessModal visible={!!success} title="Event" message={success} onClose={() => setSuccess("")} />
      </ScrollView>
    </SafeAreaView>
  );

}

const AdminCard = ({ title, subtitle, status, icon = "document-text-outline", children }) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSub}>{subtitle}</Text> : null}
      </View>
      {status ? <Text style={styles.badge}>{status}</Text> : null}
    </View>
    {children ? <View style={{ marginTop: 12 }}>{children}</View> : null}
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 110,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
  },
  heroSub: {
    color: "#CBD5E1",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 12,
  },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },
  cardSub: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  badge: {
    backgroundColor: COLORS.primary + "18",
    color: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "900",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: "900",
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
  },
});
