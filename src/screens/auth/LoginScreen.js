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

const roleDetails = {
  STUDENT: {
    title: "Student Login",
    icon: "school-outline",
    email: "student@studybridge.com",
    password: "student123",
  },
  TEACHER: {
    title: "Teacher Login",
    icon: "library-outline",
    email: "teacher@studybridge.com",
    password: "teacher123",
  },
  PARENT: {
    title: "Parent Login",
    icon: "people-outline",
    email: "parent@studybridge.com",
    password: "parent123",
  },
  ADMIN: {
    title: "Admin Login",
    icon: "shield-checkmark-outline",
    email: "admin@studybridge.com",
    password: "admin123",
  },
};

export default function LoginScreen({ navigation, route }) {
  const { login, selectedRole, setSelectedRole } = useAuth();

  const initialRole = route?.params?.role || selectedRole || "STUDENT";
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState(roleDetails[initialRole].email);
  const [password, setPassword] = useState(roleDetails[initialRole].password);
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const details = useMemo(() => roleDetails[role] || roleDetails.STUDENT, [role]);

  const changeRole = (nextRole) => {
    setRole(nextRole);
    if (setSelectedRole) {
      setSelectedRole(nextRole);
    }

    setEmail(roleDetails[nextRole].email);
    setPassword(roleDetails[nextRole].password);
    setError("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    const response = await login({
      email,
      password,
      role,
    });

    setLoading(false);

    if (!response?.success) {
      setError(response?.message || "Invalid login details.");
    }
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
            <Ionicons name={details.icon} size={36} color={COLORS.white} />
          </View>

          <Text style={styles.heroTitle}>{details.title}</Text>
          <Text style={styles.heroSub}>
            Welcome back. Continue your school journey with StudyBridge.
          </Text>
        </View>

        <View style={styles.roleRow}>
          {Object.keys(roleDetails).map((item) => (
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
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <View>
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry={secure}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.eyeBtn}
              onPress={() => setSecure(!secure)}
            >
              <Ionicons
                name={secure ? "eye-outline" : "eye-off-outline"}
                size={22}
                color={COLORS.muted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.forgot}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <AppButton title="Login" onPress={handleLogin} loading={loading} />

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Demo Login</Text>
            <Text style={styles.demoText}>Email: {details.email}</Text>
            <Text style={styles.demoText}>Password: {details.password}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register", { role })}
        >
          <Text style={styles.registerText}>
            New here? <Text style={styles.registerBold}>Create account</Text>
          </Text>
        </TouchableOpacity>
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
    minHeight: 245,
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
  eyeBtn: {
    position: "absolute",
    right: 14,
    bottom: 28,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 2,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "900",
  },
  demoBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 18,
    padding: 13,
    marginTop: 16,
  },
  demoTitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 4,
  },
  demoText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  registerLink: {
    alignItems: "center",
    paddingVertical: 18,
  },
  registerText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
  },
  registerBold: {
    color: COLORS.primary,
    fontWeight: "900",
  },
});
