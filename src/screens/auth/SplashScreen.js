import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { APP_NAME, TAGLINE } from "../../utils/constants";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("OnBoarding");
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.logo}>
        <Ionicons name="school" size={58} color={COLORS.white} />
      </View>

      <Text style={styles.title}>{APP_NAME}</Text>
      <Text style={styles.tagline}>{TAGLINE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 118,
    height: 118,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "900",
  },
  tagline: {
    color: "#CBD5E1",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
  },
});
