import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import AppButton from "../../components/AppButton";

const { width } = Dimensions.get("window");

const slides = [
  {
    icon: "people",
    title: "One Platform for School",
    text: "Students, teachers, parents and admins stay connected in one simple app.",
  },
  {
    icon: "book",
    title: "Homework, Exams & Marks",
    text: "Teachers assign work, students submit, parents track progress in real time.",
  },
  {
    icon: "analytics",
    title: "Improve Every Day",
    text: "Track attendance, behavior, fees, doubts, diary, achievements and performance.",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const item = slides[index];

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.replace("RoleSelect");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.top}>
        <View style={styles.circleOne} />
        <View style={styles.circleTwo} />

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.skip}
          onPress={() => navigation.replace("RoleSelect")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.iconBox}>
          <Ionicons name={item.icon} size={72} color={COLORS.white} />
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
          ))}
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>

        <AppButton title={index === slides.length - 1 ? "Get Started" : "Next"} onPress={next} />

        {index > 0 ? (
          <AppButton
            title="Back"
            variant="ghost"
            onPress={() => setIndex(index - 1)}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  top: {
    height: "52%",
    backgroundColor: COLORS.navy,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circleOne: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    right: -80,
    top: -80,
    backgroundColor: "rgba(79, 70, 229, 0.42)",
  },
  circleTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    left: -90,
    bottom: -70,
    backgroundColor: "rgba(6, 182, 212, 0.24)",
  },
  skip: {
    position: "absolute",
    top: 18,
    right: 18,
    backgroundColor: "rgba(255,255,255,0.14)",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
  },
  skipText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },
  iconBox: {
    width: width * 0.48,
    height: width * 0.48,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  bottom: {
    flex: 1,
    padding: 22,
    justifyContent: "center",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 22,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    width: 28,
    backgroundColor: COLORS.primary,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 34,
  },
  text: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 20,
  },
});
