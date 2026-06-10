import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";

export default function AppHeader({
  title,
  navigation,
  showBack = true,
  rightIcon,
  onRightPress,
}) {
  const canGoBack = navigation?.canGoBack?.();

  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.gradientLayer}>
        <View style={styles.circleOne} />
        <View style={styles.circleTwo} />

        <View style={styles.inner}>
          {showBack && canGoBack ? (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.iconBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconSpace} />
          )}

          <View style={styles.titleWrap}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.subTitle}>
              StudyBridge
            </Text>
          </View>

          {rightIcon ? (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.iconBtn}
              onPress={onRightPress}
            >
              <Ionicons name={rightIcon} size={22} color={COLORS.white} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconSpace} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.navy,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 18 : 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
    overflow: "hidden",
  },
  gradientLayer: {
    backgroundColor: COLORS.navy,
    overflow: "hidden",
  },
  circleOne: {
    position: "absolute",
    right: -40,
    top: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(79,70,229,0.42)",
  },
  circleTwo: {
    position: "absolute",
    left: -50,
    bottom: -70,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(6,182,212,0.26)",
  },
  inner: {
    height: 74,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  iconSpace: {
    width: 42,
    height: 42,
  },
  titleWrap: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },
  subTitle: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 3,
    letterSpacing: 0.4,
  },
});
