import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";

const roleInfo = {
  ADMIN: {
    title: "Admin Login",
    subtitle: "Manage complete school operations",
    icon: "shield-checkmark-outline",
    color: "#7C3AED",
    email: "admin@studybridge.com",
  },
  TEACHER: {
    title: "Teacher Login",
    subtitle: "Manage classes, homework and marks",
    icon: "school-outline",
    color: "#06B6D4",
    email: "teacher@studybridge.com",
  },
  STUDENT: {
    title: "Student Login",
    subtitle: "Study, submit homework and track progress",
    icon: "book-outline",
    color: "#4F46E5",
    email: "student@studybridge.com",
  },
  PARENT: {
    title: "Parent Login",
    subtitle: "Track child progress and school updates",
    icon: "people-outline",
    color: "#16A34A",
    email: "parent@studybridge.com",
  },
};

export default function LoginScreen({ navigation, route }) {
  const { login, selectedRole, selectRole } = useAuth();

  const role = route?.params?.role || selectedRole || "STUDENT";

  const info = useMemo(() => {
    return roleInfo[role] || roleInfo.STUDENT;
  }, [role]);

  const [email, setEmail] = useState(info.email);
  const [password, setPassword] = useState("123456");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");

  const changeRole = (newRole) => {
    selectRole(newRole);
    setEmail(roleInfo[newRole].email);
    setPassword("123456");
    setError("");
    navigation.setParams({ role: newRole });
  };

  const submit = async () => {
    const result = await login({
      email,
      password,
      role,
    });

    if (!result.success) {
      setError(result.message || "Login failed.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.hero}>
        <View style={[styles.circleOne, { backgroundColor: info.color + "55" }]} />
        <View style={styles.circleTwo} />

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={23} color={COLORS.white} />
        </TouchableOpacity>

        <View style={[styles.heroIcon, { backgroundColor: info.color }]}>
          <Ionicons name={info.icon} size={36} color={COLORS.white} />
        </View>

        <Text style={styles.heroTitle}>{info.title}</Text>
        <Text style={styles.heroSub}>{info.subtitle}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.roleRow}>
          {Object.keys(roleInfo).map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              style={[
                styles.roleChip,
                role === item && {
                  backgroundColor: roleInfo[item].color,
                  borderColor: roleInfo[item].color,
                },
              ]}
              onPress={() => changeRole(item)}
            >
              <Text style={[styles.roleText, role === item && styles.roleTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color={COLORS.muted} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor={COLORS.softText}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.muted} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor={COLORS.softText}
            secureTextEntry={secure}
            style={styles.input}
          />

          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          style={[styles.loginBtn, { backgroundColor: info.color }]}
          onPress={submit}
        >
          <Text style={styles.loginText}>Login</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register", { role })}
        >
          <Text style={styles.registerText}>
            New user? Create account
          </Text>
        </TouchableOpacity>

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo Login</Text>
          <Text style={styles.demoText}>Email: {info.email}</Text>
          <Text style={styles.demoText}>Password: 123456</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    backgroundColor: COLORS.navy,
    minHeight: 270,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    padding: 22,
    justifyContent: "flex-end",
    overflow: "hidden",
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
  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 32,
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
    padding: 20,
  },
  roleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  roleChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "900",
  },
  roleTextActive: {
    color: COLORS.white,
  },
  error: {
    color: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
    padding: 12,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 14,
  },
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
    marginTop: 8,
  },
  inputBox: {
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    outlineStyle: "none",
  },
  loginBtn: {
    height: 56,
    borderRadius: 18,
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
  },
  registerLink: {
    alignItems: "center",
    marginTop: 18,
  },
  registerText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "900",
  },
  demoBox: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginTop: 18,
  },
  demoTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 6,
  },
  demoText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
  },
});
