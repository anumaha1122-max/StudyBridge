import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import DailyDiaryCard from "../../components/DailyDiaryCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ChildDailyDiaryScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const [success, setSuccess] = useState("");

  const diary = app.diary || app.dailyDiary || [];
  const parentId = currentUser?.parentId || 1;

  const acknowledge = (diaryId) => {
    if (app.acknowledgeDiary) {
      app.acknowledgeDiary({
        diaryId,
        parentId,
      });
    }

    setSuccess("Diary acknowledged successfully.");
  };

  return (
    <>
      <ListScreenWrapper
        navigation={navigation}
        title="Child Daily Diary"
        subtitle="Read class summary, homework and teacher reminders."
        icon="journal-outline"
        color={COLORS.secondary}
        data={diary}
        searchKeys={["date", "className", "classSummary", "homeworkSummary", "reminders"]}
        filters={["ALL", "DIARY"]}
        getFilterValue={(item) => item.status || "DIARY"}
        emptyTitle="No diary"
        emptyMessage="Daily diary entries will appear here."
        searchPlaceholder="Search diary..."
        renderItem={(item) => {
          const acknowledged = (item.acknowledgements || []).includes(parentId);

          return (
            <DailyDiaryCard key={item.id} item={item} acknowledged={acknowledged}>
              {!acknowledged ? (
                <View style={styles.row}>
                  <AppButton
                    title="Acknowledge Diary"
                    onPress={() => acknowledge(item.id)}
                    style={styles.btn}
                  />
                </View>
              ) : null}
            </DailyDiaryCard>
          );
        }}
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
