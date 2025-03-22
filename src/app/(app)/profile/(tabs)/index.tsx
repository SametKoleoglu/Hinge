import { View, Text, ScrollView } from "react-native";
import React from "react";
import { PhotoGrid } from "@/src/components/profile/photo-grid";
import { useEdit } from "@/src/store/edit";

const Profile = () => {
  const { edits, setEdits, gridActive } = useEdit();

  if (!edits) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white pt-10"
      contentContainerClassName="pb-20"
      showsVerticalScrollIndicator={false}
      scrollEnabled={!gridActive}
    >
      <View className="px-5">
        <Text className="text-lg font-poppins-semibold mb-3 text-gray-400">
          My Photos & Videos
        </Text>
        <PhotoGrid profile={edits} />
      </View>
    </ScrollView>
  );
};

export default Profile;
