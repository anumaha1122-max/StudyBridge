import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function SubmitHomeworkScreen({ navigation, route }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const homeworkId = route?.params?.homeworkId;

  const homework =
    app.homework?.find((item) => item.id === homeworkId) ||
    app.homework?.[0] ||
    null;

  const [answerText, setAnswerText] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = () => {
    if (!answerText.trim()) {
      setError("Please type your homework answer.");
      return;
    }

    if (app.submitHomework) {
      app.submitHomework({
        homeworkId: homework?.id || homeworkId,
        title: homework?.title || "Homework",
        subject: homework?.subject || "Subject",
        studentId: currentUser?.studentId || 1,
        studentName: currentUser?.name || "Student",
        answerText,
        attachmentName,
        status: "SUBMITTED",
      });
    }

    setError("");
    setSuccess("Homework submitted successfully.");
  };

  const goToHomework = () => {
    setSuccess("");

    navigation.navigate("StudentNavigatorTabs", {
      screen: "StudentHomework",
    });
  };

  return (
    <FormScreenWrapper
      title="Submit Homework"
      subtitle={homework?.title || "Complete your homework submission."}
      icon="cloud-upload-outline"
      color={COLORS.primary}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Your Answer"
          subtitle="Write your answer and add optional attachment reference."
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="Answer"
          value={answerText}
          onChangeText={setAnswerText}
          placeholder="Type your homework answer here"
          multiline
        />

        <AppInput
          label="Attachment Name"
          value={attachmentName}
          onChangeText={setAttachmentName}
          placeholder="Optional: homework-photo.jpg / answer.pdf"
        />

        <InfoBox
          text="Your teacher will review this submission and add feedback."
          color={COLORS.primary}
        />

        <AppButton title="Submit Homework" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Homework Submitted"
        message={success}
        onClose={goToHomework}
      />
    </FormScreenWrapper>
  );
}

const styles = StyleSheet.create({
  error: {
    color: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
    padding: 12,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 14,
  },
});
