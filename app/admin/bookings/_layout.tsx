import React from 'react'
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Tabs} from "expo-router";

const BottomTabs = (props) => {

    return (
        <BottomNavigation style={{marginBottom: 4, paddingHorizontal: 4, paddingVertical: 8}} selectedIndex={props.state.index}
        onSelect={index => props.navigation.navigate(props.state.routeNames[index])}>
            <BottomNavigationTab icon={<Icon name="ios-grid-outline" pack='ionicons'/>}/>
            <BottomNavigationTab icon={<Icon name="ios-globe-outline" pack='ionicons'/>} />
            <BottomNavigationTab icon={<Icon name="ios-briefcase-outline" pack='ionicons'/>} />
            <BottomNavigationTab icon={<Icon name="ios-checkmark-done-outline" pack='ionicons'/>}/>
            <BottomNavigationTab icon={<Icon name="ios-cube-outline" pack='ionicons'/>}/>
        </BottomNavigation>
    )
}

export default function Layout() {
    return (
        <Tabs tabBar={props => <BottomTabs {...props} />}  screenOptions={{headerShown: false}} >
            <Tabs.Screen name="all"/>
            <Tabs.Screen name="services"/>
            <Tabs.Screen name="packages"/>
            <Tabs.Screen name="subscriptions"/>
            <Tabs.Screen name="products"/>
        </Tabs>
    )
};