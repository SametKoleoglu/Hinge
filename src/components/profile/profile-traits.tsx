import { View, Text, ScrollView } from "react-native";
import React, { FC } from "react";
import { Profile } from "@/src/types/profile";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/src/utils/cn";

interface Props {
  profile: Profile;
}

export const ProfileTraits: FC<Props> = ({ profile }) => {
  return (
    <View className="flex-1 bg-white rounded-lg">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {profile &&
          profile?.traits?.map(({ key, icon, label }, index) => {
            if (!label) return null;
            return (
              <View key={key} className="py-2">
                <View
                  className={cn(
                    "flex-row items-center gap-2 p-3 border-gray-300",
                    { "border-r-[0.25px]": index !== profile.traits.length - 1 }
                  )}
                >
                  <Ionicons
                    name={icon as keyof typeof Ionicons.glyphMap}
                    className="text-2xl"
                  />
                  <Text>{label}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};
