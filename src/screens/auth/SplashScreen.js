import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 1400);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />
      <View style={styles.circleThree} />

      <View style={styles.logoBox}>
        <Ionicons name="school" size={58} color={COLORS.white} />
      </View>

      <Text style={styles.title}>StudyBridge</Text>
      <Text style={styles.tagline}>Connect. Learn. Improve.</Text>

      <View style={styles.loaderBox}>
        <ActivityIndicator color={COLORS.white} size="small" />
        <Text style={styles.loaderText}>Preparing your learning space...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: 24,
  },
  circleOne: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(79, 70, 229, 0.38)",
    top: -70,
    right: -80,
  },
  circleTwo: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(6, 182, 212, 0.22)",
    bottom: -100,
    left: -90,
  },
  circleThree: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(249, 115, 22, 0.22)",
    top: 145,
    left: -45,
  },
  logoBox: {
    width: 112,
    height: 112,
    borderRadius: 34,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: "900",
    marginTop: 22,
    letterSpacing: 0.4,
  },
  tagline: {
    color: "#CBD5E1",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 8,
  },
  loaderBox: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
  loaderText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 10,
  },
});
