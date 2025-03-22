import React from "react";
import { router, Stack, Tabs } from "expo-router";
import { MaterialTopTabs } from "@/src/layouts/material-top-tabs";
import colors from "tailwindcss/colors";
import { StackHeaderV3 } from "@/src/components";
import { useMyProfile } from "@/src/api/my-profile";
import { useEdit } from "@/src/store/edit";

export default function Layout() {
  const { data: profile } = useMyProfile();
  const { edits, gridActive } = useEdit();

  const handlePressCancel = async () => {
    router.dismiss();
  };

  const handlePressDone = async () => {
    router.dismiss();
  };

  return (
    <>
      <StackHeaderV3
        title={edits?.first_name || "Profile"}
        onPressCancel={handlePressCancel}
        onPressDone={handlePressDone}
      />
      <MaterialTopTabs
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.fuchsia[800],
          },
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: colors.fuchsia[800],
          tabBarInactiveTintColor: colors.neutral[400],
          swipeEnabled: !gridActive,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Edit" }} />
        <Stack.Screen name="view" options={{ title: "View" }} />
      </MaterialTopTabs>
    </>
  );
}
