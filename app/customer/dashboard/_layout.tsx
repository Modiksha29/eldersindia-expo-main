import { Stack } from "expo-router";

export default function Layout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: 'Home', headerShadowVisible: false }} />
    </Stack>;
}