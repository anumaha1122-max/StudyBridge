import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppButton from "../../components/AppButton";
import AnalyticsScreenWrapper, {
  AnalyticsSection,
  InsightBox,
} from "../../components/AnalyticsScreenWrapper";
import HomeworkCard from "../../components/HomeworkCard";

export default function HomeworkDetailsScreen({ navigation, route }) {
  const app = useApp();

  const homeworkId = route?.params?.homeworkId;
  const homework =
    app.homework?.find((item) => item.id === homeworkId) ||
    app.homework?.[0] ||
    null;

  if (!homework) {
    return (
      <AnalyticsScreenWrapper
        navigation={navigation}
        title="Homework Details"
        subtitle="Homework information"
        icon="book-outline"
        color={COLORS.primary}
      >
        <InsightBox
          title="No Homework Found"
          message="Homework details will appear here after teacher assigns work."
          color={COLORS.muted}
        />
      </AnalyticsScreenWrapper>
    );
  }

  return (
    <AnalyticsScreenWrapper
      navigation={navigation}
      title="Homework Details"
      subtitle="Read instructions and submit your work."
      icon="book-outline"
      color={COLORS.primary}
    >
      <HomeworkCard item={homework} />

      <AnalyticsSection title="Instructions" subtitle="Complete the homework before due date.">
        <View style={styles.infoBox}>
          <Text style={styles.label}>Subject</Text>
          <Text style={styles.value}>{homework.subject || "Subject"}</Text>

          <Text style={styles.label}>Due Date</Text>
          <Text style={styles.value}>{homework.dueDate || "Not set"}</Text>

          <Text style={styles.label}>Teacher</Text>
          <Text style={styles.value}>{homework.teacherName || "Teacher"}</Text>

          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>
            {homework.description || "No description added."}
          </Text>
        </View>

        <InsightBox
          title="Submission Tip"
          message="Write your answer clearly. You can also add attachment name if needed."
          color={COLORS.primary}
        />

        <AppButton
          title="Submit Homework"
          onPress={() => navigation.navigate("SubmitHomework", { homeworkId: homework.id })}
        />

        <AppButton
          title="Back to Homework"
          variant="outline"
          onPress={() =>
            navigation.navigate("StudentNavigatorTabs", {
              screen: "StudentHomework",
            })
          }
        />
      </AnalyticsSection>
    </AnalyticsScreenWrapper>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
  },
  label: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 10,
  },
  value: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 4,
  },
  description: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 21,
    marginTop: 5,
  },
});
