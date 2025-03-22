import React from "react";
import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Image } from "expo-image";

// LOCALE IMPORTS
import { useMyProfile } from "@/src/api/my-profile";
import { cn } from "@/src/utils/cn";

export default function TabsLayout() {
  const { data: profile } = useMyProfile();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.neutral[900] },
        tabBarActiveTintColor: colors.neutral[50],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="hinge"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            profile && profile.avatar_url ? (
              <View
                style={{ width: size, height: size }}
                className={cn(
                  focused && "border border-white rounded-full p-0.5"
                )}
              >
                <Image
                  source={profile.avatar_url}
                  // resizeMode="contain"
                  className="flex-1 aspect-square rounded-full bg-neutral-200"
                />
              </View>
            ) : (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
        }}
      />
    </Tabs>
  );
}
