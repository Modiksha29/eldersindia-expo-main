import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs } from "expo-router";

const BottomTabs = ({navigation, state}) => {

    return (
        <BottomNavigation style={{marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8}} selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-home-outline" pack='ionicons' />} title={`Home`} />
            <BottomNavigationTab icon={<Icon name="ios-person-outline" pack='ionicons' size />} title={`Account`} />
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs screenOptions={{ }} tabBar={props => <BottomTabs {...props} />}>
            <Tabs.Screen name='dashboard/index' options={{title: "Welcome"}} />
            <Tabs.Screen name='account'  options={{title: "Account"}}  />
        </Tabs>
    )
};
