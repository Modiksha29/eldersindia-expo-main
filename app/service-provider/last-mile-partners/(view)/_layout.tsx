import { Stack, useSearchParams } from "expo-router";

export default function Layout() {
    const {id, name} = useSearchParams()

    return <Stack screenOptions={{headerBackTitleVisible: true}}>
        <Stack.Screen name="index" options={{ headerShown: false, }} />
        <Stack.Screen name="[name]" options={{presentation:'modal',title: `${name}`}} />
    </Stack>;
}