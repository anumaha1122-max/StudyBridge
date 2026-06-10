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

export default function ManageTimetableScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");
  
  const [form, setForm] = useState({
    classId: 1,
    day: "Monday",
    period: "",
    subject: "",
    teacher: "",
    room: "",
    time: "",
  });

  const add = () => {
    if (!form.period || !form.subject || !form.time) {
      setSuccess("Please enter period, subject and time.");
      return;
    }

    app.createTimetablePeriod({
      ...form,
      period: Number(form.period),
    });

    setForm({ classId: 1, day: "Monday", period: "", subject: "", teacher: "", room: "", time: "" });
    setSuccess("Timetable period added.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Manage Timetable" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Timetable</Text>
          <Text style={styles.heroSub}>Create period-wise timetable for classes.</Text>
        </View>

        <View style={styles.form}>
          <AppInput label="Day" value={form.day} onChangeText={(v) => setForm({ ...form, day: v })} />
          <AppInput label="Period Number" value={form.period} onChangeText={(v) => setForm({ ...form, period: v })} keyboardType="numeric" />
          <AppInput label="Subject" value={form.subject} onChangeText={(v) => setForm({ ...form, subject: v })} />
          <AppInput label="Teacher" value={form.teacher} onChangeText={(v) => setForm({ ...form, teacher: v })} />
          <AppInput label="Room" value={form.room} onChangeText={(v) => setForm({ ...form, room: v })} />
          <AppInput label="Time" value={form.time} onChangeText={(v) => setForm({ ...form, time: v })} placeholder="09:00 - 09:45" />
          <AppButton title="Add Period" onPress={add} />
        </View>

        <Text style={styles.sectionTitle}>Timetable</Text>

        {app.timetable.map((item) => (
          <AdminCard
            key={item.id}
            title={item.subject}
            subtitle={item.day + " • Period " + item.period + " • " + item.time + " • " + item.teacher}
            status={item.room || "ROOM"}
            icon="time-outline"
          />
        ))}

        <SuccessModal visible={!!success} title="Timetable" message={success} onClose={() => setSuccess("")} />
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
