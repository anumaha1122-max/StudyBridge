import React from "react";
import ComingSoonScreen from "../../components/ComingSoonScreen";

export default function ParentSupportScreen({ navigation }) {
  return (
    <ComingSoonScreen
      navigation={navigation}
      title="Parent Support"
      subtitle="Help and support for parent users."
      icon="help-circle-outline"
      color="#06B6D4"
    />
  );
}
