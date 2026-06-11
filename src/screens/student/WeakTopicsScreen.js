import React from "react";
import { COLORS } from "../../utils/colors";
import BaseListCard from "../../components/BaseListCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

const topics = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Quadratic Equations",
    difficulty: "HIGH",
    suggestion: "Practice 10 problems daily.",
  },
  {
    id: 2,
    subject: "Science",
    title: "Electricity",
    difficulty: "MEDIUM",
    suggestion: "Revise formulas and circuits.",
  },
  {
    id: 3,
    subject: "Social",
    title: "Indian Constitution",
    difficulty: "MEDIUM",
    suggestion: "Read short notes and attempt quiz.",
  },
];

export default function WeakTopicsScreen({ navigation }) {
  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Weak Topics"
      subtitle="Focus on areas where you need improvement."
      icon="warning-outline"
      color={COLORS.warning}
      data={topics}
      searchKeys={["subject", "title", "difficulty", "suggestion"]}
      filters={["ALL", "HIGH", "MEDIUM", "LOW"]}
      getFilterValue={(item) => item.difficulty}
      emptyTitle="No weak topics"
      emptyMessage="Weak topics will appear after analyzing your tests."
      searchPlaceholder="Search weak topics..."
      renderItem={(item) => (
        <BaseListCard
          key={item.id}
          title={item.title}
          subtitle={item.suggestion}
          meta={item.subject}
          status={item.difficulty}
          icon="warning-outline"
          color={item.difficulty === "HIGH" ? COLORS.danger : COLORS.warning}
        />
      )}
    />
  );
}
