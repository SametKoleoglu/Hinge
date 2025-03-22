import { supabase } from "@/src/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PrivateProfile } from "./types";

export const useMyProfile = () => {
  return useQuery<PrivateProfile | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      let { data, error } = await supabase
        .rpc("get_profile")
        .returns<PrivateProfile>()
        .single();
      if (error) throw error;

      return data;
    },
    initialData: null,
  });
};

export const updateProfile = async () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: PrivateProfile) => {
      const answers = profile.answers.map(
        ({ id, prompt_id, answer_text, answer_order }) => {
          return {
            id,
            prompt_id,
            answer_text,
            answer_order,
          };
        }
      );

      const photos = profile.photos.map(({ id, photo_url, photo_order }) => {
        return {
          id,
          photo_order,
          photo_url,
        };
      });
      let { error } = await supabase.rpc("update_profile", {
        answers: answers,
        children: profile.children?.id,
        covid_vaccine: profile.covid_vaccine?.id,
        dob: profile.dob,
        ethnicities: profile.ethnicities.map((option) => option.id),
        family_plan: profile.family_plan?.id,
        first_name: profile.first_name,
        gender: profile.gender?.id,
        gender_preferences: profile.gender_preferences.map(
          (option) => option.id
        ),
        height_cm: profile.height_cm,
        last_name: profile.last_name,
        latitude: profile.latitude,
        longitude: profile.longitude,
        neighborhood: profile.neighborhood,
        pets: profile.pets.map((option) => option.id),
        photos: photos,
        pronouns: profile.pronouns.map((option) => option.id),
        sexuality: profile.sexuality?.id,
        zodiac_sign: profile.zodiac_sign?.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
};

export const useUpdateAgeRange = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({
        min_age,
        max_age,
      }: {
        min_age: number;
        max_age: number;
      }) => {
        const { error } = await supabase.rpc("update_age_range", {
          min_age: min_age,
          max_age: max_age,
        });
  
        if (error) {
          throw error;
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      },
    });
  };
  
  export const useUpdateDistance = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ distance }: { distance: number }) => {
        const { error } = await supabase.rpc("update_distance", {
          distance: distance,
        });
  
        if (error) {
          throw error;
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      },
    });
  };
  
  export const useUpdateEthnicityPreferences = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ ethnicities }: { ethnicities: number[] }) => {
        const { error } = await supabase.rpc("update_ethnicity_preferences", {
          ethnicity_preferences: ethnicities,
        });
  
        if (error) {
          throw error;
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      },
    });
  };
  
  export const useUpdateGenderPreferences = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({
        genders,
      }: {
        profileId: string;
        genders: number[];
      }) => {
        const { error } = await supabase.rpc("update_gender_preferences", {
          gender_preferences: genders,
        });
  
        if (error) {
          throw error;
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      },
    });
  };
  
  export const useUpdateLocation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({
        latitude,
        longitude,
        neighborhood,
      }: {
        latitude: number;
        longitude: number;
        neighborhood: string;
      }) => {
        const { error } = await supabase.rpc("update_location", {
          latitude: latitude,
          longitude: longitude,
          neighborhood: neighborhood,
        });
  
        if (error) {
          throw error;
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      },
    });
  };
  