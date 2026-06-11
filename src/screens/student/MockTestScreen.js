import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import AppButton from "../../components/AppButton";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";

const questions = [
  {
    id: 1,
    question: "What is 12 x 8?",
    options: ["86", "96", "108", "112"],
    answer: "96",
  },
  {
    id: 2,
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon dioxide",
  },
  {
    id: 3,
    question: "Who wrote the national anthem of India?",
    options: ["Tagore", "Gandhi", "Nehru", "Tilak"],
    answer: "Tagore",
  },
];

export default function MockTestScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const item = questions[index];

  const choose = (option) => {
    const nextScore = option === item.answer ? score + 1 : score;

    if (index < questions.length - 1) {
      setScore(nextScore);
      setIndex(index + 1);
    } else {
      navigation.replace("MockTestResult", {
        score: nextScore,
        total: questions.length,
      });
    }
  };

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Mock Test"
      subtitle="Attempt practice questions and check your score."
      icon="clipboard-outline"
      color={COLORS.primary}
    >
      <AnalyticsSection
        title={"Question " + (index + 1) + " of " + questions.length}
        subtitle="Choose the correct answer."
      >
        <View style={styles.questionBox}>
          <Text style={styles.question}>{item.question}</Text>
        </View>

        {item.options.map((option) => (
          <AppButton
            key={option}
            title={option}
            variant="outline"
            onPress={() => choose(option)}
            style={styles.optionBtn}
          />
        ))}

        <InsightBox
          title="Test Tip"
          message="Read the question carefully before selecting the answer."
          color={COLORS.primary}
        />
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}

const styles = StyleSheet.create({
  questionBox: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  question: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 26,
  },
  optionBtn: {
    marginBottom: 10,
  },
});
