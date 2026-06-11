import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { useApp } from "../../context/AppContext";
import AppButton from "../../components/AppButton";
import SuccessModal from "../../components/SuccessModal";
import FeeCard from "../../components/FeeCard";
import ListScreenWrapper from "../../components/ListScreenWrapper";

export default function FeeVerificationScreen({ navigation }) {
  const app = useApp();
  const [success, setSuccess] = useState("");

  const fees = app.fees || [];

  const verify = (feeId) => {
    if (app.verifyPaymentProof) {
      app.verifyPaymentProof(feeId);
    }
    setSuccess("Payment proof verified successfully.");
  };

  const reject = (feeId) => {
    if (app.rejectPaymentProof) {
      app.rejectPaymentProof(feeId);
    }
    setSuccess("Payment proof rejected.");
  };

  return (
    <>
      <ListScreenWrapper
        navigation={navigation}
        title="Fee Verification"
        subtitle="Approve or reject parent payment proofs."
        icon="shield-checkmark-outline"
        color={COLORS.warning}
        data={fees}
        searchKeys={["title", "status", "paymentProof", "amount"]}
        filters={["ALL", "PENDING", "SUBMITTED", "VERIFIED", "REJECTED"]}
        getFilterValue={(item) => item.status || "PENDING"}
        emptyTitle="No fee proofs"
        emptyMessage="Parent payment proofs will appear here."
        searchPlaceholder="Search fees..."
        renderItem={(item) => (
          <FeeCard key={item.id} item={item}>
            <View style={styles.row}>
              <AppButton
                title="Verify"
                onPress={() => verify(item.id)}
                style={styles.btn}
              />
              <AppButton
                title="Reject"
                onPress={() => reject(item.id)}
                style={[styles.btn, styles.reject]}
              />
            </View>
          </FeeCard>
        )}
      />

      <SuccessModal
        visible={!!success}
        title="Fee Verification"
        message={success}
        onClose={() => setSuccess("")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    flex: 1,
  },
  reject: {
    backgroundColor: COLORS.danger,
  },
});
