import { useFormStore } from "@/store/form";
import { QuoteResponse } from "@/types/quotes/response";
import { formatAndTrimUnits } from "@/utils/general/formatter";
import { getInputFontSize } from "@/utils/styles/input";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import TokenSelection from "../TokenSelection";

const FromContainer = ({
  buildTxnData,
}: {
  isQuoteLoading: boolean;
  buildTxnData: () => void;
  quoteResponse?: QuoteResponse;
}) => {
  const { from: fromToken, setFromToken } = useFormStore();
  return (
    <View style={styles.swapBox}>
      <Text style={styles.sectionTitle}>You Pay</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.amountInput,
            {
              fontSize: getInputFontSize(fromToken.amount),
            },
          ]}
          value={fromToken.amount}
          onChangeText={(val) => {
            setFromToken({ ...fromToken, amount: val });
          }}
          onBlur={buildTxnData}
          placeholder="0"
          placeholderTextColor="#666"
          keyboardType="decimal-pad"
        />
        <TokenSelection
          token={fromToken}
          onPress={() => router.push("/tokens/from")}
        />
      </View>
      <View style={styles.detailsRow}>
        <View>
          <Text style={styles.dollarValue}>$0</Text>
        </View>
        {fromToken.assets && (
          <View style={styles.rateRow}>
            <Text style={styles.rateNumber}>
              {formatAndTrimUnits(
                fromToken.assets.bal,
                fromToken.assets.decimals
              )}
            </Text>
            <Pressable style={styles.rateButton}>
              <Text style={styles.rateText}>50%</Text>
            </Pressable>
            <Pressable style={styles.rateButton}>
              <Text style={styles.rateText}>Max</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default FromContainer;

const styles = StyleSheet.create({
  swapBox: {
    backgroundColor: "#2C2C2C",
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  amountInput: {
    flex: 1,
    color: "white",
    fontWeight: "600",
    minHeight: 60,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  rateRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  rateButton: {
    backgroundColor: "#3C3C3C",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  rateNumber: {
    color: "#999",
    fontSize: 16,
    marginRight: 8,
  },
  rateText: {
    color: "#999",
    fontSize: 14,
  },
  dollarValue: {
    color: "#666",
    fontSize: 16,
  },
});
