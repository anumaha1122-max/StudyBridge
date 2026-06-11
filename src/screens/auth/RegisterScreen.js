import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useAuth } from "../../context/AuthContext";

const roleInfo = {
  ADMIN: {
    title: "Admin Register",
    color: "#7C3AED",
    icon: "shield-checkmark-outline",
  },
  TEACHER: {
    title: "Teacher Register",
    color: "#06B6D4",
    icon: "school-outline",
  },
  STUDENT: {
    title: "Student Register",
    color: "#4F46E5",
    icon: "book-outline",
  },
  PARENT: {
    title: "Parent Register",
    color: "#16A34A",
    icon: "people-outline",
  },
};

export default function RegisterScreen({ navigation, route }) {
  const { register, selectedRole, selectRole } = useAuth();

  const role = route?.params?.role || selectedRole || "STUDENT";

  const info = useMemo(() => {
    return roleInfo[role] || roleInfo.STUDENT;
  }, [role]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("123456");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");

  const changeRole = (newRole) => {
    selectRole(newRole);
    setError("");
    navigation.setParams({ role: newRole });
  };

  const submit = async () => {
    if (!name || !email || !password) {
      setError("Please fill name, email and password.");
      return;
    }

    const result = await register({
      name,
      email,
      phone,
      password,
      role,
    });

    if (!result.success) {
      setError(result.message || "Register failed.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
          <Text style={styles.heroSub}>
            Create your StudyBridge account.
          </Text>
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

          <Input
            label="Full Name"
            icon="person-outline"
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />

          <Input
            label="Email"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Input
            label="Phone"
            icon="call-outline"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone"
            keyboardType="phone-pad"
          />

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
            style={[styles.registerBtn, { backgroundColor: info.color }]}
            onPress={submit}
          >
            <Text style={styles.registerText}>Create Account</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login", { role })}
          >
            <Text style={styles.loginText}>Already registered? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Input({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <Ionicons name={icon} size={20} color={COLORS.muted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.softText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: COLORS.navy,
    minHeight: 260,
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
    fontSize: 31,
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
  registerBtn: {
    height: 56,
    borderRadius: 18,
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  registerText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
  },
  loginLink: {
    alignItems: "center",
    marginTop: 18,
  },
  loginText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "900",
  },
});
