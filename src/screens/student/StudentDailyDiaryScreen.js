import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import DailyDiaryCard from "../../components/DailyDiaryCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function StudentDailyDiaryScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");

  const diary = app.diary || app.dailyDiary || [];

  const acknowledge = (id) => {
    if (app.acknowledgeDiary) {
      app.acknowledgeDiary(id);
    }
    setSuccess("Diary acknowledged successfully.");
  };

  return (
    <>
      <ListScreenWrapper
        navigation={navigation}
        title="Daily Diary"
        subtitle="Read class summary, homework and reminders."
        icon="journal-outline"
        color={COLORS.secondary}
        data={diary}
        searchKeys={["date", "className", "classSummary", "homeworkSummary", "reminders"]}
        filters={["ALL", "DIARY"]}
        getFilterValue={(item) => item.status || "DIARY"}
        emptyTitle="No diary"
        emptyMessage="Daily diary entries will appear here."
        searchPlaceholder="Search diary..."
        renderItem={(item) => (
          <DailyDiaryCard key={item.id} item={item}>
            <View style={styles.row}>
              <AppButton
                title="Acknowledge"
                onPress={() => acknowledge(item.id)}
                style={styles.btn}
              />
            </View>
          </DailyDiaryCard>
        )}
      />

      <SuccessModal
        visible={!!success}
        title="Daily Diary"
        message={success}
        onClose={() => setSuccess("")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  btn: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});
