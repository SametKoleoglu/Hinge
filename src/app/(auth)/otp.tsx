import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Fab, StackHeader } from "@/src/components";
import colors from "tailwindcss/colors";
import { useVerifyOtp } from "@/src/api/auth";

const Otp = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  // STATES
  const [otp, setOtp] = useState("");
  const {
    mutate: verifyOtp,
    isPending,
    isError,
    error,
    reset,
  } = useVerifyOtp();

  // FUNCTIONS
  const handleOtpChange = (text: string) => {
    if (isError) {
      reset();
    }
    setOtp(text);
  };

  const isValid = useMemo(() => {
    return otp.length === 6;
  }, [otp]);

  const handleSubmit = () => {
    verifyOtp({ phone, token: otp });
  };

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
            Otp Verification, enter the code we sent you.
          </Text>
          <View className="h-24" />
          <View className="flex-row h-16 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <View
                key={index}
                className="flex-1 border-b items-center justify-center"
              >
                <Text className="text-3xl font-poppins-semibold">
                  {otp[index] || ""}
                </Text>
              </View>
            ))}
          </View>
          <TextInput
            className="absolute inset-0 opacity-0 h-1 w-1"
            style={Platform.OS === "ios" && { lineHeight: undefined }}
            selectionColor={colors.black}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            autoFocus={true}
            onChangeText={handleOtpChange}
            value={otp}
            maxLength={6}
          />
          {isError && (
            <Text className="text-red-500 text-center text-sm mt-5">
              {error?.message}
            </Text>
          )}
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

export default Otp;
