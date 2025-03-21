import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { router, Stack, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Fab, StackHeader } from "@/src/components";
import colors from "tailwindcss/colors";
import { useSignInWithOtp } from "@/src/api/auth";

const Page = () => {
  // STATES
  const [phone, setPhone] = useState("");
  // DEFINITIONS
  const phoneRef = useRef<TextInput>(null);
  const {
    mutate: signInWithOtp,
    isPending,
    isError,
    error,
    reset,
  } = useSignInWithOtp();

  // FUNCTIONS
  const handlePhoneChange = (text: string) => {
    if(isError){
      reset();
    }
    setPhone(text);
  };

  const isValid = useMemo(() => {
    return /^\+[1-9]\d{1,14}$/.test(phone);
  }, [phone]);

  const handleSubmit = () => {
    signInWithOtp(phone, {
      onSuccess: () =>
        router.push({
          pathname: "/otp",
          params: { phone },
        }),
    });
  };

  useFocusEffect(() => {
    phoneRef.current?.focus();
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      className="flex-1 bg-white p-5"
    >
      <StackHeader />
      <StatusBar barStyle={"dark-content"} />
      <View className="flex-1 justify-center pt-32">
        <View className="flex-1">
          <Text className="text-3xl font-playfair-semibold">
            What's your phone number?
          </Text>
          <View className="h-24" />
          <TextInput
            className="text-3xl font-poppins-semibold h-16 border-b"
            style={Platform.OS === "ios" && { lineHeight: undefined }}
            selectionColor={colors.black}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoFocus
            onChangeText={handlePhoneChange}
            value={phone}
            maxLength={15}
            ref={phoneRef}
          />
          {isError && <Text className="text-red-500 text-center text-sm mt-5">{error?.message}</Text>}
        </View>
        <View className="items-end bottom-3">
          <Fab
            disabled={!isValid || isPending}
            onPress={handleSubmit}
            loading={isPending}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
