import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs } from "expo-router";

const BottomTabs = ({navigation, state}) => {

    return (
        <BottomNavigation style={{marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8}} selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-home-outline" pack='ionicons' />} title={`Home`} />
            <BottomNavigationTab icon={<Icon name="ios-apps-outline" pack='ionicons' />} title={`Categories`} />
            <BottomNavigationTab icon={<Icon name='tv-outline'/>} title={`Explore`}/>
            <BottomNavigationTab icon={<Icon name="ios-person-outline" pack='ionicons' size />} title={`Account`} />
            <BottomNavigationTab icon={<Icon name='ios-notifications-outline' pack='ionicons' />} title={`Notifications`} />
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs screenOptions={{headerShown: false}} tabBar={props => <BottomTabs {...props} />}>
            <Tabs.Screen name='dashboard' options={{ headerShown: false }} />
            <Tabs.Screen name='categories' options={{ headerShown: false }} />
            <Tabs.Screen name='explore' options={{ headerShown: false }} />
            <Tabs.Screen name='account' options={{ headerShown: false }} />
            <Tabs.Screen name='notifications' options={{ tabBarBadge: 3, headerShown: false }} />
        </Tabs>
    )
};
