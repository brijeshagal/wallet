import FromContainer from "@/components/token/swap/FromContainer";
import ToContainer from "@/components/token/swap/ToContainer";
import useBuildTxnData from "@/hooks/txn/builder/useBuildTxnData";
import useSendTxn from "@/hooks/txn/send/useSendTxn";
import { useFormStore } from "@/store/form";
import { CompleteFormToken } from "@/types/token/form";
import { validateAddress } from "@/utils/tokens/address";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SendScreen() {
  const { from: fromToken, to: toToken } = useFormStore();
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { sendToken } = useSendTxn();
  const { buildTxnData, quoteResponse, isQuoteLoading } = useBuildTxnData();

  async function txnBuilder() {
    buildTxnData({
      from: fromToken as CompleteFormToken,
      recipient,
      to: toToken as CompleteFormToken,
    });
  }

  const handleSend = async () => {
    // @TODO upate this to a function and use in button disable also.
    if (
      !fromToken.assets ||
      !fromToken.amount ||
      !toToken.amount ||
      !toToken.assets ||
      !quoteResponse
    )
      return;
    if (!recipient.trim()) {
      setError("Please enter a recipient address");
      return;
    }

    if (!validateAddress(recipient)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    setError("");
    const hash = await sendToken(quoteResponse);
    router.push(
      `/transaction?chainId=${fromToken.assets.chainId}&hash=${hash}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* You Pay Section */}
        <FromContainer
          quoteResponse={quoteResponse}
          buildTxnData={txnBuilder}
          isQuoteLoading={isQuoteLoading}
        />

        {/* Swap Icon */}
        <View style={styles.swapIconContainer}>
          <Pressable style={styles.swapButton}>
            <AntDesign name="swap" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* You Receive Section */}
        <ToContainer
          isQuoteLoading={isQuoteLoading}
          buildTxnData={txnBuilder}
          quoteResponse={quoteResponse}
          title="Recipient Receives"
        />

        {/* Recipient Address */}
        <View style={styles.recipientContainer}>
          <TextInput
            style={styles.recipientInput}
            placeholder="Recipient Address"
            placeholderTextColor="#666"
            value={recipient}
            onChangeText={(text) => {
              setRecipient(text);
              setError("");
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.sendButton,
            (!recipient || !fromToken || !toToken) && styles.disabledButton,
          ]}
          onPress={handleSend}
          disabled={!recipient || !fromToken || !toToken}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tokenSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3C3C3C",
    padding: 8,
    borderRadius: 24,
    minWidth: 120,
  },
  tokenIconContainer: {
    marginRight: 8,
  },
  tokenIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#666",
  },
  tokenSelectorText: {
    color: "white",
    fontSize: 16,
    marginRight: 8,
    flex: 1,
  },

  swapIconContainer: {
    alignItems: "center",
    marginVertical: -16,
    zIndex: 1,
  },
  swapButton: {
    backgroundColor: "#4C4C4C",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  recipientContainer: {
    marginTop: 24,
  },
  recipientInput: {
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    padding: 16,
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#4a4a4a",
    opacity: 0.7,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
