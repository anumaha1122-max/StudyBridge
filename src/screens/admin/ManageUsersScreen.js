import React from "react";
import ComingSoonScreen from "../../components/ComingSoonScreen";

export default function ManageUsersScreen({ navigation }) {
  return (
    <ComingSoonScreen
      navigation={navigation}
      title="Manage Users"
      subtitle="Manage admin, teacher, student and parent users."
      icon="people-outline"
      color="#7C3AED"
    />
  );
}
