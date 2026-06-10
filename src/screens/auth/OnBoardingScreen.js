import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../components/AppButton";
import { COLORS } from "../../utils/colors";

const slides = [
  {
    icon: "calendar-outline",
    title: "Plan studies smartly",
    text: "Manage homework, exams, study plans, revision, daily diary, and tasks.",
  },
  {
    icon: "people-outline",
    title: "Connect everyone",
    text: "Students, teachers, parents, and school admin stay connected in real time.",
  },
  {
    icon: "trending-up-outline",
    title: "Improve performance",
    text: "Track attendance, marks, behavior, fees, achievements, and progress.",
  },
];

export default function OnBoardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.replace("RoleSelect");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Ionicons name={slide.icon} size={86} color={COLORS.primary} />

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
          ))}
        </View>

        <AppButton title={index === slides.length - 1 ? "Get Started" : "Next"} onPress={next} />
        <AppButton title="Skip" variant="outline" onPress={() => navigation.replace("RoleSelect")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 26,
    color: COLORS.text,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 24,
  },
  text: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    marginVertical: 14,
  },
  dots: {
    flexDirection: "row",
    marginVertical: 18,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 99,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
});
