import { useSignout } from "@/src/api/auth";
import { StackHeaderV2 } from "@/src/components";
import { Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { mutate } = useSignout();

  return (
    <View className="flex-1 bg-white p-5">
      <StackHeaderV2 title="Settings" />
      <TouchableOpacity
        className="p-3 border-y border-neutral-300"
        onPress={async () => mutate()}
      >
        <Text className="text-base text-center font-poppins-regular">
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
