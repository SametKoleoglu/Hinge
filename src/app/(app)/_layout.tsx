import { Redirect, Stack } from "expo-router";

export default function Layout() {
    return <Redirect href={"/sign-in" as any} />
    return (
        <Stack screenOptions={{ headerShown: false }}>

        </Stack>
    );
}