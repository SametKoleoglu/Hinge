import { View, Text, ScrollView } from "react-native";
import React, { FC } from "react";
import { Profile } from "@/src/types/profile";
import { ProfilePhoto } from "./profile-photo";
import { ProfileAnswer } from "./profile-answer";
import { ProfileTraits } from "./profile-traits";

interface Props {
  profile: Profile;
}

export const ProfileView: FC<Props> = ({ profile }) => {
  const generateProfile = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    const layout: ("photo" | "answer" | "traits")[] = [
      "photo",
      "answer",
      "traits",
      "photo",
      "photo",
      "answer",
      "photo",
      "answer",
      "photo",
      "photo",
    ];

    const { photos, answers } = profile;
    let photoIndex = 0;
    let answerIndex = 0;

    layout.forEach((item, _) => {
      if (item === "traits") {
        elements.push(<ProfileTraits key={item} profile={profile} />);
      }
      if (item === "photo" && photoIndex < photos.length) {
        const item = photos[photoIndex++];
        elements.push(<ProfilePhoto key={`p${item.id}`} photo={item} />);
      }
      if (item === "answer") {
        const item = answers[answerIndex++];
        elements.push(<ProfileAnswer key={`a${item.id}`} answer={item} />);
      }
    });

    return elements;
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="pt-5 pb-32 gap-5"
      showsVerticalScrollIndicator={false}
    >
      {generateProfile()}
    </ScrollView>
  );
};
