import { useCurrentStore } from "@/store/current";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AccountAddressesScreen = () => {
  const { accounts, activeId } = useCurrentStore();
  const [account] = useState(accounts[activeId]);

  const handleBack = () => {
    router.back();
  };

  const handleCopy = async (address: string) => {
    await Share.share({
      message: address,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Account Addresses</Text>
        </View>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content}>
        {account.networks.map((network) => (
          <View key={network} style={styles.addressCard}>
            <View style={styles.networkHeader}>
              <Text style={styles.networkName}>{network}</Text>
            </View>
            <TouchableOpacity
              style={styles.addressRow}
              onPress={() => handleCopy(account.address[network])}
            >
              <Text style={styles.address}>{account.address[network]}</Text>
              <MaterialIcons name="content-copy" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16, // Increased from 12 to 16
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginTop: 8, // Added margin top
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center", // Center the title container
    marginHorizontal: 16, // Add some spacing from the buttons
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center", // Ensure text is centered
  },
  headerButton: {
    padding: 8,
    minWidth: 60,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addressCard: {
    backgroundColor: "#333",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  networkHeader: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  networkName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  address: {
    color: "#999",
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
});

export default AccountAddressesScreen;
