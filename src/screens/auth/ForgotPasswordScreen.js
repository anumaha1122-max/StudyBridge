import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendReset = () => {
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    setError("");
    setSuccess("Password reset instructions sent successfully. This is a frontend demo flow.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.logo}>
            <Ionicons name="key-outline" size={36} color={COLORS.white} />
          </View>

          <Text style={styles.heroTitle}>Forgot Password?</Text>
          <Text style={styles.heroSub}>
            Enter your email address. We will send reset instructions.
          </Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={20} color={COLORS.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter registered email"
            keyboardType="email-address"
          />

          <AppButton title="Send Reset Instructions" onPress={sendReset} />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.loginLink}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginText}>
            Back to <Text style={styles.loginBold}>Login</Text>
          </Text>
        </TouchableOpacity>

        <SuccessModal
          visible={!!success}
          title="Password Reset"
          message={success}
          onClose={() => {
            setSuccess("");
            navigation.goBack();
          }}
        />
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
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 32,
    padding: 22,
    minHeight: 250,
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 18,
  },
  circleOne: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -55,
    top: -45,
    backgroundColor: "rgba(79,70,229,0.46)",
  },
  circleTwo: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    left: -52,
    bottom: -55,
    backgroundColor: "rgba(6,182,212,0.25)",
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
  logo: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "900",
  },
  heroSub: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 8,
  },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  errorBox: {
    backgroundColor: COLORS.dangerLight,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 14,
  },
  errorText: {
    flex: 1,
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 18,
  },
  loginLink: {
    alignItems: "center",
    paddingVertical: 18,
  },
  loginText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
  },
  loginBold: {
    color: COLORS.primary,
    fontWeight: "900",
  },
});
