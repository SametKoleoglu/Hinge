import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useMyProfile } from "@/src/api/my-profile";
import {
  usePrompts,
  useChildren,
  useCovidVaccine,
  useEthnicities,
  useFamilyPlans,
  useGenders,
  usePets,
  usePronouns,
  useSexualities,
  useZodiacSigns,
} from "@/src/api/options";

const Page = () => {
  const { isPending, isError } = useMyProfile();

  usePrompts();
  useChildren();
  useCovidVaccine();
  useEthnicities();
  useFamilyPlans();
  useGenders();
  usePets();
  usePronouns();
  useSexualities();
  useZodiacSigns();

  if (isPending) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text>Something went wrong!</Text>
      </View>
    );
  }


  return <Redirect href={"/(app)/(tabs)/" as any} />;
};

export default Page;
