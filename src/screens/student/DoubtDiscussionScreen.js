import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import DoubtCard from "../../components/DoubtCard";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";

export default function DoubtDiscussionScreen({ navigation, route }) {
  const app = useApp();
  const [success, setSuccess] = useState("");

  const doubtId = route?.params?.doubtId;
  const doubt =
    app.doubts?.find((item) => item.id === doubtId) ||
    app.doubts?.[0] ||
    null;

  const markSolved = () => {
    if (app.markDoubtSolved && doubt?.id) {
      app.markDoubtSolved(doubt.id);
    }
    setSuccess("Doubt marked as solved.");
  };

  if (!doubt) {
    return (
      <AnalyticsScreenWrapper
        navigation={navigation}
        title="Doubt Discussion"
        subtitle="Teacher answer details"
        icon="help-circle-outline"
        color={COLORS.accent}
      >
        <InsightBox
          title="No Doubt Found"
          message="Your doubt discussion will appear here."
          color={COLORS.muted}
        />
      </AnalyticsScreenWrapper>
    );
  }

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Doubt Discussion"
      subtitle="View teacher answer and mark as solved."
      icon="help-circle-outline"
      color={COLORS.accent}
    >
      <DoubtCard item={doubt} />

      <AnalyticsSection title="Teacher Answer" subtitle="Answer or explanation from teacher.">
        <Text style={styles.answer}>
          {doubt.answerText || "Teacher has not answered this doubt yet."}
        </Text>

        <InsightBox
          title="Learning Tip"
          message="After understanding the answer, mark your doubt as solved."
          color={COLORS.accent}
        />

        <AppButton
          title="Mark as Solved"
          onPress={markSolved}
          style={{ backgroundColor: COLORS.success }}
        />
      </AnalyticsSection>

      <SuccessModal
        visible={!!success}
        title="Doubt"
        message={success}
        onClose={() => setSuccess("")}
      />
    </AnalyticsScreenWrapper>
  );
}

const styles = StyleSheet.create({
  answer: {
    backgroundColor: COLORS.background,
    color: COLORS.text,
    borderRadius: 18,
    padding: 14,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 22,
    marginBottom: 14,
  },
});
