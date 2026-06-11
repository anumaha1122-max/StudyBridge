import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";

export default function StudentDigitalIdScreen({ navigation }) {
  const { currentUser } = useAuth();

  const studentId = currentUser?.studentId || currentUser?.id || 1;

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Digital Student ID"
      subtitle="Your smart school identity card."
      icon="id-card-outline"
      color={COLORS.primary}
    >
      <View style={styles.idCard}>
        <View style={styles.top}>
          <View style={styles.logo}>
            <Ionicons name="school-outline" size={34} color={COLORS.white} />
          </View>

          <View>
            <Text style={styles.school}>StudyBridge School</Text>
            <Text style={styles.cardType}>DIGITAL ID CARD</Text>
          </View>
        </View>

        <View style={styles.avatar}>
          <Ionicons name="person" size={58} color={COLORS.white} />
        </View>

        <Text style={styles.name}>{currentUser?.name || "Student Name"}</Text>
        <Text style={styles.role}>Student</Text>

        <View style={styles.infoGrid}>
          <Info label="Student ID" value={"STU-" + String(studentId).padStart(4, "0")} />
          <Info label="Class" value={currentUser?.className || "Class 10"} />
          <Info label="Email" value={currentUser?.email || "student@studybridge.com"} />
          <Info label="Phone" value={currentUser?.phone || "Not added"} />
        </View>
      </View>

      <AnalyticsSection title="ID Instructions" subtitle="Use this card for school verification.">
        <InsightBox
          title="Digital ID"
          message="This frontend card can be connected with QR code, barcode and backend verification later."
          color={COLORS.primary}
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
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.primary,
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
