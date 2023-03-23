import { Stack, useSearchParams } from "expo-router";

export default function Layout() {
    const params = useSearchParams()
    const {id, name} = params

    return <Stack initialRouteName="index" screenOptions={{headerBackTitleVisible: true}}>
        <Stack.Screen name="index" options={{ headerShown: false,  }} />
        <Stack.Screen name="[name]" options={{presentation:'modal',title: `${name}`}} />
    </Stack>;
}