import { Stack, useSearchParams } from "expo-router";

export default function Layout() {
    // const {id} = useSearchParams()
    return (
        <Stack screenOptions={{ headerShown: false }}>
           <Stack.Screen name="location-filters" options={{title:"filters"}} ></Stack.Screen>
        </Stack>
    );
}