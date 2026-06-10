import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../../utils/colors";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";

export default function RegisterScreen({ route }) {
  const role = route.params?.role || "STUDENT";
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const submit = () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    register({
      ...form,
      role,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Register as {role}</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppInput
            label="Full Name"
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />

          <AppInput
            label="Email"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <AppInput
            label="Phone"
            value={form.phone}
            onChangeText={(v) => setForm({ ...form, phone: v })}
            keyboardType="phone-pad"
          />

          <AppInput
            label="Password"
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
          />

          <AppInput
            label="Confirm Password"
            value={form.confirm}
            onChangeText={(v) => setForm({ ...form, confirm: v })}
            secureTextEntry
          />

          <AppButton title="Register" onPress={submit} />
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
    padding: 20,
    justifyContent: "center",
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 16,
  },
  error: {
    color: COLORS.danger,
    fontWeight: "800",
    marginBottom: 10,
  },
});
