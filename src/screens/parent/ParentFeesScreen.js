import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import FeeCard from "../../components/FeeCard";
import FormScreenWrapper, {
  FormCard,
  FormSectionTitle,
  InfoBox,
} from "../../components/FormScreenWrapper";

export default function ParentFeesScreen({ navigation }) {
  const app = useApp();
  const { currentUser } = useAuth();

  const parentId = currentUser?.parentId || 1;
  const fees = app.fees?.filter((item) => !item.parentId || item.parentId === parentId) || [];

  const [selectedFee, setSelectedFee] = useState(fees[0] || null);
  const [proof, setProof] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = () => {
    if (!selectedFee) {
      setError("No fee selected.");
      return;
    }

    if (!proof) {
      setError("Please enter payment proof reference.");
      return;
    }

    if (app.uploadPaymentProof) {
      app.uploadPaymentProof({
        feeId: selectedFee.id,
        parentId,
        paymentProof: proof,
      });
    }

    setError("");
    setSuccess("Payment proof uploaded successfully.");
  };

  return (
    <FormScreenWrapper
      title="Fees & Payments"
      subtitle="View fees and upload payment proof."
      icon="card-outline"
      color={COLORS.warning}
      navigation={navigation}
    >
      <FormCard>
        <FormSectionTitle
          title="Pending Fees"
          subtitle="Select a fee and upload your payment reference."
        />

        {fees.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No fees available.</Text>
          </View>
        ) : (
          fees.map((item) => (
            <FeeCard
              key={item.id}
              item={item}
              onPress={() => {
                setSelectedFee(item);
                setError("");
              }}
            />
          ))
        )}
      </FormCard>

      <FormCard>
        <FormSectionTitle
          title="Upload Proof"
          subtitle={selectedFee ? "Selected: " + (selectedFee.title || "Fee") : "Please select a fee first."}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppInput
          label="Payment Proof / Transaction ID"
          value={proof}
          onChangeText={setProof}
          placeholder="Example: UPI123456789"
        />

        <InfoBox color={COLORS.warning} text="Admin will verify your payment proof after submission." />

        <AppButton title="Upload Payment Proof" onPress={submit} />
      </FormCard>

      <SuccessModal
        visible={!!success}
        title="Fee Payment"
        message={success}
        onClose={() => {
          setSuccess("");
          navigation.goBack();
        }}
      />
    </FormScreenWrapper>
  );
}

const styles = StyleSheet.create({
  error: {
    color: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
    padding: 12,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 14,
  },
  empty: {
    backgroundColor: COLORS.background2,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800",
  },
});
