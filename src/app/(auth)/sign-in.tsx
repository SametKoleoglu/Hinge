import { Pressable, SafeAreaView, StatusBar, Text, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { VideoBackground } from "@/src/components";
import Logo from "@/assets/images/hinge-logo.svg";
import colors from "tailwindcss/colors";

const Page = () => {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={"light-content"} />
      <VideoBackground
        source={require("../../../assets/videos/background.mp4")}
      >
        <SafeAreaView className="flex-1 p-10">
          <View className="flex-1 items-center pt-14">
            <Logo fill={colors.white} width={150} height={60} />
            <View className="h-5" />
            <Text className="text-white text-xl font-poppins-semibold">
              Designed for you.
            </Text>
          </View>
          <Link href={"/phone"} asChild>
            <Pressable className="bg-fuchsia-900 h-16 items-center justify-center rounded-full">
              <Text className="text-white text-lg font-poppins-semibold">
                Sign in with phone
              </Text>
            </Pressable>
          </Link>
        </SafeAreaView>
      </VideoBackground>
    </View>
  );
};

export default Page;
