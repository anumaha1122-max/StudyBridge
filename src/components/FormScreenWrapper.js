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

export default function FormScreenWrapper({
  title,
  subtitle,
  icon = "create-outline",
  color = COLORS.primary,
  navigation,
  children,
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={[styles.circleOne, { backgroundColor: color + "55" }]} />
          <View style={styles.circleTwo} />

          {navigation ? (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={22} color={COLORS.white} />
            </TouchableOpacity>
          ) : null}

          <View style={[styles.iconBox, { backgroundColor: color }]}>
            <Ionicons name={icon} size={32} color={COLORS.white} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function FormCard({ children }) {
  return <View style={styles.formCard}>{children}</View>;
}

export function FormSectionTitle({ title, subtitle }) {
  return (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSub}>{subtitle}</Text> : null}
    </View>
  );
}

export function ChipGroup({ options = [], value, onChange }) {
  return (
    <View style={styles.chipWrap}>
      {options.map((item) => {
        const active = value === item.value || value === item;

        return (
          <TouchableOpacity
            key={item.value || item}
            activeOpacity={0.85}
            style={[styles.chip, active && styles.activeChip]}
            onPress={() => onChange(item.value || item)}
          >
            <Text style={[styles.chipText, active && styles.activeChipText]}>
              {item.label || item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function InfoBox({ icon = "information-circle-outline", text, color = COLORS.primary }) {
  return (
    <View style={[styles.infoBox, { backgroundColor: color + "12" }]}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={[styles.infoText, { color }]}>{text}</Text>
    </View>
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
    borderRadius: 32,
    padding: 22,
    minHeight: 220,
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 16,
  },
  circleOne: {
    position: "absolute",
    width: 185,
    height: 185,
    borderRadius: 92.5,
    right: -58,
    top: -52,
  },
  circleTwo: {
    position: "absolute",
    width: 155,
    height: 155,
    borderRadius: 77.5,
    left: -55,
    bottom: -55,
    backgroundColor: "rgba(6,182,212,0.22)",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34,
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 8,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  sectionBox: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  sectionSub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    backgroundColor: COLORS.background2,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
  },
  activeChipText: {
    color: COLORS.white,
  },
  infoBox: {
    borderRadius: 18,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 14,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 18,
  },
});
