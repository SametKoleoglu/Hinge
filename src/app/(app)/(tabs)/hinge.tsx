import { Pressable, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { Link, router, Stack } from "expo-router";
import HingeLogo from "@/assets/images/hinge-logo.svg";
import { Ionicons } from "@expo/vector-icons";
import { useMyProfile } from "@/src/api/my-profile";
import { Image } from "expo-image";
import { Card } from "@/src/components/card";

const Page = () => {
  const { data: profile } = useMyProfile();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="px-5 border-b border-neutral-300">
        <View className="flex-row justify-between items-center">
          <HingeLogo width={64} />
          <View className="flex-row gap-5 items-center">
            <Ionicons name="options-outline" className="text-2xl" />
            <Link href={"/settings"} suppressHighlighting>
              <Ionicons name="settings-outline" className="text-2xl" />
            </Link>
          </View>
        </View>
        <View className="my-10 gap-3 items-center">
          <Pressable className="h-32 aspect-square rounded-full border-4 border-fuchsia-900 p-1" onPress={() => router.push("/profile")}>
            <Image
              source={profile?.avatar_url}
              className="flex-1 rounded-full bg-neutral-400"
            />
          </Pressable>
          <Text className="text-2xl font-poppins-semibold">
            {profile?.first_name}
          </Text>
        </View>
      </View>
      <View className="flex-1 p-5 gap-5">
        <Card
          key={"help"}
          icon={<Ionicons name="help" className="text-2xl" />}
          title="Help Center"
          subtitle="Safety, Security, and more"
        />
        <Card
          key={"what-works"}
          icon={<Ionicons name="bulb-outline" className="text-2xl" />}
          title="What Works"
          subtitle="Check out our expert dating tips"
        />
      </View>
    </SafeAreaView>
  );
};

export default Page;
