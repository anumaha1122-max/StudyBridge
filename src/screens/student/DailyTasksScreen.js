import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import BaseListCard from "../../components/BaseListCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function DailyTasksScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");

  const tasks = app.tasks || app.dailyTasks || [];

  const completeTask = (id) => {
    if (app.completeTask) {
      app.completeTask(id);
    }
    setSuccess("Task marked as completed.");
  };

  return (
    <>
      <ListScreenWrapper
        navigation={navigation}
        title="Daily Tasks"
        subtitle="Plan, complete and track daily study work."
        icon="checkbox-outline"
        color={COLORS.success}
        data={tasks}
        searchKeys={["title", "subject", "description", "status"]}
        filters={["ALL", "PENDING", "COMPLETED"]}
        getFilterValue={(item) => item.status || "PENDING"}
        emptyTitle="No tasks"
        emptyMessage="Add daily study tasks to improve consistency."
        searchPlaceholder="Search tasks..."
        renderItem={(item) => (
          <BaseListCard
            key={item.id}
            title={item.title || "Daily Task"}
            subtitle={item.description || item.subject || "Study task"}
            meta={item.date || item.time || ""}
            status={item.status || "PENDING"}
            icon="checkbox-outline"
            color={item.status === "COMPLETED" ? COLORS.success : COLORS.warning}
          >
            {item.status !== "COMPLETED" ? (
              <View style={styles.row}>
                <AppButton
                  title="Complete"
                  onPress={() => completeTask(item.id)}
                  style={styles.btn}
                />
              </View>
            ) : null}
          </BaseListCard>
        )}
      />

      <SuccessModal
        visible={!!success}
        title="Daily Task"
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
    backgroundColor: COLORS.success,
  },
});
