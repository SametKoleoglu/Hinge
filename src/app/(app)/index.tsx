import React from "react";
import { Redirect } from "expo-router";

const Page = () => {
  return <Redirect href={"/(app)/(tabs)/" as any} />;
};

export default Page;
