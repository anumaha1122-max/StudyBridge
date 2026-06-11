import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";

export default function ChildDigitalIdScreen({ navigation }) {
  const { currentUser } = useAuth();
  const app = useApp();

  const childId = currentUser?.childId || 1;
  const child =
    app.students?.find((item) => item.id === childId) ||
    app.students?.[0] ||
    {};

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Child Digital ID"
      subtitle="Smart school identity card for your child."
      icon="id-card-outline"
      color={COLORS.accent}
    >
      <View style={styles.idCard}>
        <View style={styles.top}>
          <View style={styles.logo}>
            <Ionicons name="school-outline" size={34} color={COLORS.white} />
          </View>

          <View>
            <Text style={styles.school}>StudyBridge School</Text>
            <Text style={styles.cardType}>CHILD DIGITAL ID</Text>
          </View>
        </View>

        <View style={styles.avatar}>
          <Ionicons name="person" size={58} color={COLORS.white} />
        </View>

        <Text style={styles.name}>{child?.name || currentUser?.childName || "Student Name"}</Text>
        <Text style={styles.role}>Student</Text>

        <View style={styles.infoGrid}>
          <Info label="Student ID" value={"STU-" + String(child?.id || childId).padStart(4, "0")} />
          <Info label="Class" value={child?.className || currentUser?.childClass || "Class 10"} />
          <Info label="Parent" value={currentUser?.name || "Parent"} />
          <Info label="Phone" value={currentUser?.phone || child?.phone || "Not added"} />
        </View>
      </View>

      <AnalyticsSection title="ID Instructions" subtitle="Use this card for school verification.">
        <InsightBox
          title="Digital ID"
          message="This parent view shows the child's digital school identity card. QR verification can be connected later."
          color={COLORS.accent}
        />
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}

function Info({ label, value }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text numberOfLines={1} style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  idCard: {
    backgroundColor: COLORS.navy,
    borderRadius: 34,
    padding: 22,
    overflow: "hidden",
    marginBottom: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  school: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
  },
  cardType: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "900",
    marginTop: 3,
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 38,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 28,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.22)",
  },
  name: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 16,
  },
  role: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  infoGrid: {
    backgroundColor: "rgba(255,255,255,0.09)",
    borderRadius: 24,
    padding: 14,
  },
  infoBox: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
  },
  infoLabel: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "900",
  },
  infoValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 4,
  },
});
