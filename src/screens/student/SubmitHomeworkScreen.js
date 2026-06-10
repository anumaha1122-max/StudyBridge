import React, { useMemo, useState } from "react";
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

export default function SubmitHomeworkScreen({ navigation, route }) {
  const app = useApp();
  const { currentUser, logout } = useAuth();
  const studentId = currentUser?.studentId || 1;
  const [success, setSuccess] = useState("");
  
  const homeworkId = route?.params?.homeworkId || app.homework[0]?.id;
  const homework = app.homework.find((h) => h.id === homeworkId);

  const [form, setForm] = useState({
    submissionText: "",
    fileName: "",
  });

  const submit = () => {
    if (!form.submissionText) {
      setSuccess("Please enter your submission details.");
      return;
    }

    const result = app.submitHomework({
      homeworkId,
      studentId,
      submissionText: form.submissionText,
      fileName: form.fileName || "notebook-photo.jpg",
    });

    if (result?.success === false) {
      setSuccess(result.message);
      return;
    }

    setSuccess("Homework submitted successfully. Teacher notified.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Submit Homework" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{homework?.title || "Submit Homework"}</Text>
          <Text style={styles.heroSub}>Add answer text and file name placeholder.</Text>
        </View>

        <View style={styles.form}>
          <AppInput
            label="Submission Text"
            value={form.submissionText}
            onChangeText={(v) => setForm({ ...form, submissionText: v })}
            multiline
            placeholder="Type what you completed"
          />

          <AppInput
            label="File Name"
            value={form.fileName}
            onChangeText={(v) => setForm({ ...form, fileName: v })}
            placeholder="homework-photo.jpg"
          />

          <AppButton title="Submit Homework" onPress={submit} />
        </View>

        <SuccessModal
          visible={!!success}
          title="Homework"
          message={success}
          onClose={() => {
            setSuccess("");
            navigation.navigate("StudentHomework");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );

}

const SCard = ({ title, subtitle, status, icon = "document-text-outline", onPress, children }) => (
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
