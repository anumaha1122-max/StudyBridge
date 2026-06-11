import React from "react";
import ComingSoonScreen from "../../components/ComingSoonScreen";

export default function AdminSettingsScreen({ navigation }) {
  return (
    <ComingSoonScreen
      navigation={navigation}
      title="Admin Settings"
      subtitle="Manage school app settings and preferences."
      icon="settings-outline"
      color="#0F172A"
    />
  );
}
