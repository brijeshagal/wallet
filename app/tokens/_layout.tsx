import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TokensLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="to" options={{ headerTitle: "Select From" }} />
      <Stack.Screen name="from" options={{ headerTitle: "Select To" }} />
    </Stack>
  );
};

export default TokensLayout;

const styles = StyleSheet.create({});
