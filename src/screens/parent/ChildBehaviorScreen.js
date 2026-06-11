import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import BehaviorCard from "../../components/BehaviorCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function ChildBehaviorScreen({ navigation }) {
  const app = useApp();
  const records = app.behaviorRecords || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Child Behavior"
      subtitle="Track positive, improvement and discipline behavior records."
      icon="star-outline"
      color={COLORS.accent}
      data={records}
      searchKeys={["studentName", "type", "remark", "points"]}
      filters={["ALL", "POSITIVE", "DISCIPLINE", "IMPROVEMENT"]}
      getFilterValue={(item) => item.type || "POSITIVE"}
      emptyTitle="No behavior records"
      emptyMessage="Child behavior records will appear here."
      searchPlaceholder="Search behavior..."
      renderItem={(item) => (
        <BehaviorCard key={item.id} item={item} />
      )}
    />
  );
}
