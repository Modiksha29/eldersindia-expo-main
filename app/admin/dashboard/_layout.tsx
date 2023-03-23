import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs } from "expo-router";

const BottomTabs = ({ navigation, state }) => {

    return (
        <BottomNavigation style={{ marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8 }} selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-home-outline" pack='ionicons' />} title={`Dashboard`} />
            <BottomNavigationTab icon={<Icon name="ios-list-outline" pack='ionicons' />} title={`Bookings`} />
            <BottomNavigationTab icon={<Icon name="ios-newspaper-outline" pack='ionicons' />} title={`News & Events`} />
            <BottomNavigationTab icon={<Icon name="ios-help-buoy-outline" pack='ionicons' />} title={`Tickets`} />
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }} tabBar={props => <BottomTabs {...props} />}>
            <Tabs.Screen name="index"></Tabs.Screen>
            <Tabs.Screen name="bookings"></Tabs.Screen>
            <Tabs.Screen name="news-and-events"></Tabs.Screen>
            <Tabs.Screen name="tickets"></Tabs.Screen>
        </Tabs>
    )
};