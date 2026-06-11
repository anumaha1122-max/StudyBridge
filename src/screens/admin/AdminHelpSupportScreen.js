import React from "react";
import ComingSoonScreen from "../../components/ComingSoonScreen";

export default function HelpSupportScreen({ navigation }) {
  return (
    <ComingSoonScreen
      navigation={navigation}
      title="Help & Support"
      subtitle="Support center for admin users."
      icon="help-circle-outline"
      color="#06B6D4"
    />
  );
}
