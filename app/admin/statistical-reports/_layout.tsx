import { Stack, useSearchParams } from "expo-router";
 
export default function Layout() {
    const {id} = useSearchParams();
    return (
        <Stack screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}