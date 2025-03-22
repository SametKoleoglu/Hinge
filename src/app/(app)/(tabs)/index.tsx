import { View, Text } from "react-native";
import React from "react";
import { useSignout } from "@/src/api/auth";

const Page = () => {
  const { mutate } = useSignout();
  return (
    <View>
      <Text onPress={() => mutate()}>Page</Text>
    </View>
  );
};

export default Page;
