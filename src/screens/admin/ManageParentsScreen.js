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

export default function ManageParentsScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");
  
  const [form, setForm] = useState({
    name: "",
    childId: 1,
    phone: "",
  });

  const add = () => {
    if (!form.name) {
      setSuccess("Please enter parent name.");
      return;
    }

    if (app.addParent) {
      app.addParent(form);
    }

    setForm({ name: "", childId: 1, phone: "" });
    setSuccess("Parent added and linked to child.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Manage Parents" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Parents</Text>
          <Text style={styles.heroSub}>Add parents and link them with students.</Text>
        </View>

        <View style={styles.form}>
          <AppInput label="Parent Name" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
          <AppInput label="Linked Child ID" value={String(form.childId)} onChangeText={(v) => setForm({ ...form, childId: Number(v) || 1 })} keyboardType="numeric" />
          <AppInput label="Phone" value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} />
          <AppButton title="Add Parent" onPress={add} />
        </View>

        <Text style={styles.sectionTitle}>Parent List</Text>

        {app.parents.map((parent) => (
          <AdminCard
            key={parent.id}
            title={parent.name}
            subtitle={"Linked Child: " + (parent.childName || "Student ID " + parent.childId)}
            status="LINKED"
            icon="people-outline"
          />
        ))}

        <SuccessModal visible={!!success} title="Parents" message={success} onClose={() => setSuccess("")} />
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
