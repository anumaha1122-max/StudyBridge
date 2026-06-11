import React, { useMemo, useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";

const roles = ["STUDENT", "TEACHER", "PARENT", "ADMIN"];

export default function RegisterScreen({ navigation, route }) {
  const { register, selectedRole, setSelectedRole } = useAuth();

  const initialRole = route?.params?.role || selectedRole || "STUDENT";

  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const roleTitle = useMemo(() => {
    if (role === "STUDENT") return "Student Registration";
    if (role === "TEACHER") return "Teacher Registration";
    if (role === "PARENT") return "Parent Registration";
    return "Admin Registration";
  }, [role]);

  const changeRole = (nextRole) => {
    setRole(nextRole);
    if (setSelectedRole) {
      setSelectedRole(nextRole);
    }
  };

  const update = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const response = await register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role,
    });

    setLoading(false);

    if (!response?.success) {
      setError(response?.message || "Registration failed.");
      return;
    }

    setSuccess("Account created successfully. You can now login.");
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
            <Ionicons name="person-add-outline" size={36} color={COLORS.white} />
          </View>

          <Text style={styles.heroTitle}>{roleTitle}</Text>
          <Text style={styles.heroSub}>
            Create your StudyBridge account and start managing school activities.
          </Text>
        </View>

        <View style={styles.roleRow}>
          {roles.map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              style={[styles.roleChip, role === item && styles.activeChip]}
              onPress={() => changeRole(item)}
            >
              <Text style={[styles.roleChipText, role === item && styles.activeChipText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={20} color={COLORS.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <AppInput
            label="Full Name"
            value={form.name}
            onChangeText={(v) => update("name", v)}
            placeholder="Enter full name"
          />

          <AppInput
            label="Email Address"
            value={form.email}
            onChangeText={(v) => update("email", v)}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <AppInput
            label="Phone Number"
            value={form.phone}
            onChangeText={(v) => update("phone", v)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <AppInput
            label="Password"
            value={form.password}
            onChangeText={(v) => update("password", v)}
            placeholder="Create password"
            secureTextEntry
          />

          <AppInput
            label="Confirm Password"
            value={form.confirm}
            onChangeText={(v) => update("confirm", v)}
            placeholder="Confirm password"
            secureTextEntry
          />

          <AppButton title="Create Account" onPress={submit} loading={loading} />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login", { role })}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginBold}>Login</Text>
          </Text>
        </TouchableOpacity>

        <SuccessModal
          visible={!!success}
          title="Registration"
          message={success}
          onClose={() => {
            setSuccess("");
            navigation.navigate("Login", { role });
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
    minHeight: 230,
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
    fontSize: 28,
    fontWeight: "900",
  },
  heroSub: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 8,
  },
  roleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  roleChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleChipText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "900",
  },
  activeChipText: {
    color: COLORS.white,
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
