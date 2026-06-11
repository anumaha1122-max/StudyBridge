import React from "react";
import ComingSoonScreen from "../../components/ComingSoonScreen";

export default function TeacherSupportScreen({ navigation }) {
  return (
    <ComingSoonScreen
      navigation={navigation}
      title="Teacher Support"
      subtitle="Help and support for teacher users."
      icon="help-circle-outline"
      color="#06B6D4"
    />
  );
}
