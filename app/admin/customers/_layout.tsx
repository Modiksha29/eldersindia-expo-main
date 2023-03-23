import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs } from "expo-router";

const BottomTabs = ({navigation, state}) => {

    return (
        <BottomNavigation style={{marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8}} selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-people-outline" pack='ionicons'/>} title={`All`}/>
            <BottomNavigationTab icon={<Icon name="account-tie-outline" pack='material-community'/>} title={`Corporate`}/>
            <BottomNavigationTab icon={<Icon name="account-star-outline" pack='material-community'/>} title={`Non Corporate`}/>
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs screenOptions={{headerShown: false}} tabBar={props => <BottomTabs {...props} />}>
            <Tabs.Screen name="index"></Tabs.Screen>
            <Tabs.Screen name="corporate"></Tabs.Screen>
            <Tabs.Screen name="non-corporate"></Tabs.Screen>
        </Tabs>
    )
};