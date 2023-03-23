import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs } from "expo-router";

const BottomTabs = ({navigation, state}) => {

    return (
        <BottomNavigation style={{marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8}} selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-flash-outline" pack='ionicons'/>} title={`Active`}/>
            <BottomNavigationTab icon={<Icon name="ios-flash-off-outline" pack='ionicons'/>} title={`Inactive`}/>
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs screenOptions={{headerShown: false}} tabBar={props => <BottomTabs {...props} />}>
            <Tabs.Screen name="[id]"></Tabs.Screen>
            <Tabs.Screen name="inactive"></Tabs.Screen>
        </Tabs>
    )
};