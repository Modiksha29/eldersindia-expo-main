import { Stack, useSearchParams } from "expo-router";

export default function Layout() {
    const {id} = useSearchParams()
    return (
        <Stack screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="reconciliation/index" options={{ headerShown: true, title: 'Reconciliation Report' }} />
            <Stack.Screen name="sales/index" options={{ headerShown: true, title: 'Sales Report' }} />
        </Stack>
    );
}