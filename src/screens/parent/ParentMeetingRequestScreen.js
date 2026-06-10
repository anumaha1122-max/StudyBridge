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
import { useAuth } from "../../context/AuthContext";
import AppHeader from "../../components/AppHeader";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";

export default function ParentMeetingRequestScreen({ navigation, route }) {
  const app = useApp();
  const { currentUser, logout } = useAuth();

  const parentId = currentUser?.parentId || 1;
  const childId = currentUser?.childId || 1;

  const parent = app.parents.find((p) => p.id === parentId);
  const child = app.students.find((s) => s.id === childId) || app.students[0];

  const [success, setSuccess] = useState("");

  
  const [form, setForm] = useState({
    teacherId: 1,
    reason: "",
    preferredDate: "",
    preferredTime: "",
  });

  const submit = () => {
    if (!form.reason || !form.preferredDate || !form.preferredTime) {
      setSuccess("Please enter reason, preferred date and time.");
      return;
    }

    app.requestMeeting({
      parentId,
      teacherId: form.teacherId,
      studentId: child?.id || 1,
      reason: form.reason,
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
    });

    setForm({
      teacherId: 1,
      reason: "",
      preferredDate: "",
      preferredTime: "",
    });

    setSuccess("Meeting request sent to teacher.");
  };

  const meetings = app.meetings.filter((m) => m.parentId === parentId);

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Meeting Request" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Request Teacher Meeting</Text>
          <Text style={styles.heroSub}>Send meeting request and track teacher response.</Text>
        </View>

        <View style={styles.form}>
          <PickerRow label="Teacher">
            {app.teachers.map((teacher) => (
              <Chip
                key={teacher.id}
                title={teacher.name}
                active={form.teacherId === teacher.id}
                onPress={() => setForm({ ...form, teacherId: teacher.id })}
              />
            ))}
          </PickerRow>

          <AppInput label="Reason" value={form.reason} onChangeText={(v) => setForm({ ...form, reason: v })} multiline />
          <AppInput label="Preferred Date" value={form.preferredDate} onChangeText={(v) => setForm({ ...form, preferredDate: v })} placeholder="2026-06-25" />
          <AppInput label="Preferred Time" value={form.preferredTime} onChangeText={(v) => setForm({ ...form, preferredTime: v })} placeholder="05:00 PM" />

          <AppButton title="Send Meeting Request" onPress={submit} />
        </View>

        <Text style={styles.sectionTitle}>Meeting History</Text>

        {meetings.length === 0 ? (
          <PCard title="No meetings" subtitle="Requested meetings will appear here." icon="people-outline" />
        ) : (
          meetings.map((m) => (
            <PCard
              key={m.id}
              title={m.teacherName}
              subtitle={
                m.reason +
                " • " +
                m.preferredDate +
                " " +
                m.preferredTime +
                (m.teacherNote ? " • Note: " + m.teacherNote : "") +
                (m.meetingLink ? " • Link: " + m.meetingLink : "")
              }
              status={m.status}
              icon="people-outline"
            />
          ))
        )}

        <SuccessModal visible={!!success} title="Meeting" message={success} onClose={() => setSuccess("")} />
      </ScrollView>
    </SafeAreaView>
  );

}

const PCard = ({ title, subtitle, status, icon = "document-text-outline", onPress, children }) => (
  <TouchableOpacity activeOpacity={onPress ? 0.85 : 1} onPress={onPress} style={styles.card}>
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
  </TouchableOpacity>
);

const PickerRow = ({ label, children }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.chipRow}>{children}</View>
  </View>
);

const Chip = ({ title, active, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={[styles.chip, active && styles.activeChip]}
  >
    <Text style={[styles.chipText, active && styles.activeChipText]}>{title}</Text>
  </TouchableOpacity>
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
    fontSize: 23,
    fontWeight: "900",
  },
  heroSub: {
    color: "#CBD5E1",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
    marginTop: 8,
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
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
  },
  activeChipText: {
    color: COLORS.white,
  },
});
