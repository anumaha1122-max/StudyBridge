import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";
import { validateLogin } from "../../utils/validation";

const defaults = {
  STUDENT: ["student@studybridge.com", "student123"],
  TEACHER: ["teacher@studybridge.com", "teacher123"],
  PARENT: ["parent@studybridge.com", "parent123"],
  ADMIN: ["admin@studybridge.com", "admin123"],
};

export default function LoginScreen({ navigation, route }) {
  const selected = route.params?.role || "STUDENT";
  const { login } = useAuth();

  const [defaultEmail, defaultPassword] = useMemo(() => defaults[selected], [selected]);

  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const validation = validateLogin({ email, password });

    if (validation) {
      setError(validation);
      return;
    }

    const response = login({
      email,
      password,
      role: selected,
    });

    if (!response.success) {
      setError(response.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.title}>{selected} Login</Text>
        <Text style={styles.subtitle}>Welcome back to StudyBridge</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <AppInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AppButton title="Login" onPress={handleLogin} />

        <AppButton
          title="Create Account"
          variant="outline"
          onPress={() => navigation.navigate("Register", { role: selected })}
        />

        <AppButton
          title="Forgot Password"
          variant="outline"
          onPress={() => navigation.navigate("ForgotPassword")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 6,
    marginBottom: 18,
  },
  error: {
    color: COLORS.danger,
    fontWeight: "800",
    marginBottom: 10,
  },
});
