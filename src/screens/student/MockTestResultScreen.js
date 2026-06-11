import React from "react";
import { COLORS } from "../../utils/colors";
import AppButton from "../../components/AppButton";
import AnalyticsCard from "../../components/AnalyticsCard";
import AnalyticsScreenWrapper, {
  AnalyticsGrid,
  AnalyticsSection,
  InsightBox,
  ProgressRow,
} from "../../components/AnalyticsScreenWrapper";

export default function MockTestResultScreen({ navigation, route }) {
  const score = route?.params?.score || 0;
  const total = route?.params?.total || 1;
  const percent = Math.round((score / total) * 100);

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Test Result"
      subtitle="Review your mock test performance."
      icon="trophy-outline"
      color={COLORS.success}
    >
      <AnalyticsGrid>
        <AnalyticsCard
          title="Score"
          value={score + "/" + total}
          subtitle="Correct answers"
          icon="checkmark-circle-outline"
          color={COLORS.success}
        />

        <AnalyticsCard
          title="Percentage"
          value={percent + "%"}
          subtitle="Test performance"
          icon="bar-chart-outline"
          color={COLORS.purple}
        />
      </AnalyticsGrid>

      <AnalyticsSection title="Performance Summary" subtitle="Your current mock test score.">
        <ProgressRow
          label="Mock Test Score"
          value={percent}
          color={percent >= 70 ? COLORS.success : COLORS.warning}
        />

        <InsightBox
          title={percent >= 70 ? "Good Performance" : "Needs Improvement"}
          message={
            percent >= 70
              ? "Great job. Continue revising to maintain your score."
              : "Revise weak topics and try another mock test."
          }
          color={percent >= 70 ? COLORS.success : COLORS.warning}
        />

        <AppButton
          title="Try Again"
          onPress={() => navigation.replace("MockTest")}
        />

        <AppButton
          title="Go to Progress"
          variant="outline"
          onPress={() => navigation.navigate("StudentProgress")}
        />
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}
