import { supabase } from "@/src/utils/supabase";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithOtp = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      let { error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) {
        let message = "Something went wrong, please try again.";

        switch (error.code) {
          case "sms_send_failed":
            message = "Please ensure you are using a valid phone number.";
            break;
          case "over_email_send_rate_limit":
            message = "Too many attempts. Please try again later.";
            break;
        }
        throw new Error(message);
      }
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ phone, token }: { phone: string; token: string }) => {
      let { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });

      if (error) {
        let message = "Something went wrong, please try again.";

        switch (error.code) {
          case "otp_expired":
            message = "OTP has expired or is invalid. Please try again.";
            break;
        }
        throw new Error(message);
      }
    },
  });
};

export const useSignout = () => {
  return useMutation({
    mutationFn: async () => {
      let { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }
    },
  });
};
