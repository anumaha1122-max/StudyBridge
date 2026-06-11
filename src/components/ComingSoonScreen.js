import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function ComingSoonScreen({
  navigation,
  title = "Screen",
  subtitle = "This screen is ready for implementation.",
  icon = "apps-outline",
  color = COLORS.primary,
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={[styles.circleOne, { backgroundColor: color + "55" }]} />
          <View style={styles.circleTwo} />

          {navigation?.canGoBack?.() ? (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={23} color={COLORS.white} />
            </TouchableOpacity>
          ) : null}

          <View style={[styles.iconBox, { backgroundColor: color }]}>
            <Ionicons name={icon} size={38} color={COLORS.white} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="construct-outline" size={44} color={color} />
          <Text style={styles.cardTitle}>Screen Connected Successfully</Text>
          <Text style={styles.cardText}>
            This route is now registered and the app will not show a missing screen error.
            You can upgrade this screen with full functionality later.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 34,
    minHeight: 260,
    padding: 22,
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 16,
  },
  circleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -55,
    top: -55,
  },
  circleTwo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    left: -55,
    bottom: -45,
    backgroundColor: "rgba(6,182,212,0.20)",
  },
  backBtn: {
    position: "absolute",
    top: 18,
    left: 18,
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    width: 76,
    height: 76,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 31,
    fontWeight: "900",
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 14,
  },
  cardText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },
});
