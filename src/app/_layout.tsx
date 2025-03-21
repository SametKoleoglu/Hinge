import { SplashScreen, Stack } from "expo-router";
import "../../global.css";
import { cssInterop } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { VideoView } from "expo-video";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// LOCALE IMPORTS
import { fonts } from "@/src/constants/fonts";
import { supabase } from "../utils/supabase";

cssInterop(VideoView, { className: { target: "style" } });
cssInterop(Ionicons, { className: { target: "style" } });

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function Layout() {
  const [loaded, error] = useFonts(fonts);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
      </Stack>
    </QueryClientProvider>
  );
}
