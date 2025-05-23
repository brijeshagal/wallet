import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} /> // Updated to Material home icon
          ),
        }}
      />
      <Tabs.Screen
        name="swap"
        options={{
          title: "Swap",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="swap-horiz" color={color} /> // Updated to Material swap icon
          ),
        }}
      />
      <Tabs.Screen
        name="browser"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="language" color={color} /> // Updated to Material language (globe) icon
          ),
        }}
      />
    </Tabs>
  );
}
