import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { COLORS } from "../utils/colors";
import ScreenHeader from "./ScreenHeader";

export default function AnalyticsScreenWrapper({
  navigation,
  title,
  subtitle,
  icon = "analytics-outline",
  color = COLORS.primary,
  children,
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          navigation={navigation}
          title={title}
          subtitle={subtitle}
          icon={icon}
          color={color}
        />

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function AnalyticsGrid({ children }) {
  return <View style={styles.grid}>{children}</View>;
}

export function AnalyticsSection({ title, subtitle, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSub}>{subtitle}</Text> : null}
      <View style={{ marginTop: 14 }}>{children}</View>
    </View>
  );
}

export function InsightBox({
  title,
  message,
  color = COLORS.primary,
}) {
  return (
    <View style={[styles.insightBox, { borderColor: color + "35" }]}>
      <View style={[styles.insightLine, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.insightTitle}>{title}</Text>
        <Text style={styles.insightMsg}>{message}</Text>
      </View>
    </View>
  );
}

export function ProgressRow({
  label,
  value = 0,
  color = COLORS.primary,
}) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <View style={styles.progressRow}>
      <View style={styles.progressTop}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={[styles.progressValue, { color }]}>{safeValue}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: safeValue + "%", backgroundColor: color }]} />
      </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  insightBox: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  insightLine: {
    width: 5,
    borderRadius: 999,
  },
  insightTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },
  insightMsg: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  progressRow: {
    marginBottom: 16,
  },
  progressTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
  },
  progressValue: {
    fontSize: 13,
    fontWeight: "900",
  },
  track: {
    height: 10,
    backgroundColor: COLORS.background2,
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
