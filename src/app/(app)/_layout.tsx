import { Text } from "react-native";
import { useAuth } from "@/src/store/auth";
import { Redirect, Stack } from "expo-router";

// LOCALE IMPORTS
import { EditProvider } from "@/src/store/edit";

export default function Layout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading..</Text>;
  }

  if (!session) {
    return <Redirect href={"/sign-in" as any} />;
  }

  return (
    <EditProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
        <Stack.Screen
          name="settings"
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="profile" options={{ animation: "fade" }} />
      </Stack>
    </EditProvider>
  );
}
