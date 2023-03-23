import { Stack } from "expo-router";

export default function Layout() {
    return <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ headerShown: false, headerTitle: 'Account', headerShadowVisible: false }} />
        <Stack.Screen name="eldersindia" options={{headerTitle: 'EldersIndia', headerShadowVisible: false }} />
    </Stack>;
}