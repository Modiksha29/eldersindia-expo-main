import { Stack } from "expo-router";

export default function Layout() {
    return <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="locations" options={{title: 'Locations' }} />
        <Stack.Screen name="blog-categories" options={{title: 'Blog categories' }} />
        <Stack.Screen name="blog-sub-categories" options={{title: 'Blog sub categories' }} />
        <Stack.Screen name="news-categories" options={{title: 'News categories' }} />
        <Stack.Screen name="news-sub-categories" options={{title: 'News sub categories' }} />
        <Stack.Screen name="event-categories" options={{title: 'Event categories' }} />
        <Stack.Screen name="event-sub-categories" options={{title: 'Event sub categories' }} />
        <Stack.Screen name="service-categories" options={{title: 'Service categories' }} />
        <Stack.Screen name="service-sub-categories" options={{title: 'Service sub categories' }} />
        <Stack.Screen name="package-categories" options={{title: 'Package categories' }} />
        <Stack.Screen name="package-sub-categories" options={{title: 'Package sub categories' }} />
        <Stack.Screen name="product-categories" options={{title: 'Product categories' }} />
        <Stack.Screen name="product-sub-categories" options={{title: 'Product sub categories' }} />
        <Stack.Screen name="subscription-categories" options={{title: 'Subscription categories' }} />
        <Stack.Screen name="subscription-sub-categories" options={{title: 'Subscription sub categories' }} />
        <Stack.Screen name="tags" options={{title: 'Tags' }} />
        <Stack.Screen name="service-types" options={{title: 'Service types' }} />
    </Stack>;
}