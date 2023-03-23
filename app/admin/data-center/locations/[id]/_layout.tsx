import { Stack, useSearchParams } from "expo-router";

export default function Layout() {
    const {name} = useSearchParams()

    return <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="[name]" options={{title: `${name}`, presentation: 'modal', headerShown: true}} />
    </Stack>;
}