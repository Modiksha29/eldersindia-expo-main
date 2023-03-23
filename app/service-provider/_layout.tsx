import {
    createDrawerNavigator,
    DrawerNavigationOptions,
} from "@react-navigation/drawer";

import React from 'react'
import { useWindowDimensions, ImageBackground } from 'react-native';
import { Drawer, DrawerItem, DrawerGroup, Text, IndexPath, Icon, Card, Layout as LayoutView, useTheme } from '@ui-kitten/components'
import { withLayoutContext } from "expo-router";
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'

import { ServicePartnerTopNavigation } from 'components/service-provider/drawer-header'
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DrawerHeader } from 'components/service-provider/drawer-header'

const { Navigator } = createDrawerNavigator();

const DrawerLayout = withLayoutContext<
    DrawerNavigationOptions,
    typeof Navigator
>(Navigator);


const DrawerContent = ({ navigation, state }) => {
    const theme = useTheme();
    return (

        <Drawer
            header={<DrawerHeader />}
            selectedIndex={new IndexPath(state.index)}
            onSelect={index => navigation.navigate(state.routeNames[index.row])}
            footer={<LayoutView><Text category='c2' appearance="hint" style={{ textAlign: 'center' }}>{`EldersIndia v2.0`}</Text></LayoutView>}

        >
            <DrawerItem title='Dashboard' accessoryLeft={<Icon name="ios-home-outline" pack='ionicons' />} />
            <DrawerItem title='Branches' accessoryLeft={<Icon name="ios-git-branch-outline" pack='ionicons' />} />
            <DrawerItem title='Last Mile Partners' accessoryLeft={<Icon name="ios-people-outline" pack='ionicons' />} />
            <DrawerItem title='Offerings' accessoryLeft={<Icon name="ios-layers-outline" pack='ionicons' />} />
            <DrawerItem title='Short Bytes' accessoryLeft={<Icon name="ios-layers-outline" pack='ionicons' />} />
            <DrawerItem title='Blogs' accessoryLeft={<Icon name="ios-library-outline" pack='ionicons' />} />
            <DrawerItem title='News' accessoryLeft={<Icon name="ios-newspaper-outline" pack='ionicons' />} />
            <DrawerItem title='Events' accessoryLeft={<Icon name="ios-calendar-outline" pack='ionicons' />} />
            <DrawerItem title='Statistical Reports' accessoryLeft={<Icon name="ios-bar-chart-outline" pack='ionicons' />} />
            <DrawerItem title='Financial Reports' accessoryLeft={<Icon name="ios-cash-outline" pack='ionicons' />} />
            <DrawerItem title='Support Tickets' accessoryLeft={<Icon name="ios-help-buoy-outline" pack='ionicons' />} />
            <DrawerItem title='Account' accessoryLeft={<Icon name="ios-person-outline" pack='ionicons' />} />
        </Drawer>
    )
}

const Layout = () => {
    const dimensions = useWindowDimensions();
    const theme = useTheme()
    return (
        <DrawerLayout drawerContent={props => <DrawerContent {...props} />} 
        screenOptions={{ headerStyle: {backgroundColor: theme['color-primary-default']}, headerTintColor: theme['color-basic-100'], drawerType: dimensions.width >= 768 ? 'permanent' : 'front',}}
        >
            <DrawerLayout.Screen name='dashboard' />
            <DrawerLayout.Screen name='branches' />
            <DrawerLayout.Screen name='last-mile-partners' />
            <DrawerLayout.Screen name='offerings' />
            <DrawerLayout.Screen name='short-bytes' />
            <DrawerLayout.Screen name='blogs' />
            <DrawerLayout.Screen name='news' />
            <DrawerLayout.Screen name='events' />
            <DrawerLayout.Screen name='statistical-reports' />
            <DrawerLayout.Screen name='financial-reports' />
            <DrawerLayout.Screen name='support-tickets' />
            <DrawerLayout.Screen name='account' />
        </DrawerLayout>
    )
}

export default Layout;