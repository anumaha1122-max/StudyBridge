import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import DoubtCard from "../../components/DoubtCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function TeacherDoubtBoardScreen({ navigation }) {
  const app = useApp();
  const doubts = app.doubts || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Doubt Board"
      subtitle="Search and answer student doubts."
      icon="help-circle-outline"
      color={COLORS.accent}
      data={doubts}
      searchKeys={["subject", "doubtText", "studentName", "answerText"]}
      filters={["ALL", "PENDING", "ANSWERED", "SOLVED"]}
      getFilterValue={(item) => item.status || "PENDING"}
      emptyTitle="No doubts"
      emptyMessage="Student doubts will appear here."
      searchPlaceholder="Search doubts..."
      renderItem={(item) => (
        <DoubtCard
          key={item.id}
          item={item}
          onPress={() => navigation.navigate("TeacherDoubtBoard", { doubtId: item.id })}
        />
      )}
    />
  );
}
