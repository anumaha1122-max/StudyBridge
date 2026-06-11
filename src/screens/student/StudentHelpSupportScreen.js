import React from "react";
import ComingSoonScreen from "../../components/ComingSoonScreen";

export default function StudentSupportScreen({ navigation }) {
  return (
    <ComingSoonScreen
      navigation={navigation}
      title="Student Support"
      subtitle="Help and support for student users."
      icon="help-circle-outline"
      color="#06B6D4"
    />
  );
}
