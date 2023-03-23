import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs } from "expo-router";

const BottomTabs = ({navigation, state}) => {

    return (
        <BottomNavigation style={{marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8}} selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-flash-outline" pack='ionicons'/>} title={`Open`}/>
            <BottomNavigationTab icon={<Icon name="ios-flash-off-outline" pack='ionicons'/>} title={`Closed`}/>
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs screenOptions={{headerShown: false}} tabBar={props => <BottomTabs {...props} />}>
            <Tabs.Screen name="(view)" />
            <Tabs.Screen name="closed" />
        </Tabs>
    )
};