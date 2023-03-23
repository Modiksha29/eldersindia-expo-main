import { Stack } from "expo-router";

export default function Layout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: 'Account', headerShadowVisible: false }} />
        <Stack.Screen name="profile" options={{ headerShown: true, headerTitle: 'Profile', headerShadowVisible: false }} />
        <Stack.Screen name="appearance" options={{ headerShown: true, headerTitle: 'Appearance', headerShadowVisible: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: true, headerTitle: 'Notification Preferences', headerShadowVisible: false }} />
        <Stack.Screen name="eldersindia" options={{ headerShown: true, headerTitle: 'EldersIndia', headerShadowVisible: false }} />
    </Stack>;
}