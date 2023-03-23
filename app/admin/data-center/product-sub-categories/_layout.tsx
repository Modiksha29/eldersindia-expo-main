import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs } from "expo-router";

const BottomTabs = ({navigation, state}) => {

    return (
        <BottomNavigation style={{marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8}} selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-list-outline" pack='ionicons'/>} title={`Manage`}/>
            <BottomNavigationTab icon={<Icon name="ios-add-outline" pack='ionicons'/>} title={`Create`}/>
            <BottomNavigationTab icon={<Icon name="ios-trash-bin-outline" pack='ionicons'/>} title={`Deleted`}/>
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs screenOptions={{headerShown: false}} tabBar={props => <BottomTabs {...props} />}>
            <Tabs.Screen name="index"></Tabs.Screen>
            <Tabs.Screen name="create"></Tabs.Screen>
            <Tabs.Screen name="deleted"></Tabs.Screen>
        </Tabs>
    )
};