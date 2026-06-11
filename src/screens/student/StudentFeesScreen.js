import React from "react";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import FeeCard from "../../components/FeeCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function StudentFeesScreen({ navigation }) {
  const app = useApp();
  const fees = app.fees || [];

  return (
    <ListScreenWrapper
      navigation={navigation}
      title="Fee Status"
      subtitle="View school fees and payment verification status."
      icon="card-outline"
      color={COLORS.warning}
      data={fees}
      searchKeys={["title", "amount", "status", "dueDate"]}
      filters={["ALL", "PENDING", "SUBMITTED", "VERIFIED", "REJECTED"]}
      getFilterValue={(item) => item.status || "PENDING"}
      emptyTitle="No fees"
      emptyMessage="Fee details will appear here."
      searchPlaceholder="Search fees..."
      renderItem={(item) => (
        <FeeCard key={item.id} item={item} />
      )}
    />
  );
}
