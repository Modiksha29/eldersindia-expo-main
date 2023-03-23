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

import { CorporateTopNavigation } from 'components/corporate/top-navigation'
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DrawerHeader } from 'components/corporate/drawer-header'

const { Navigator } = createDrawerNavigator();

const DrawerLayout = withLayoutContext<
    DrawerNavigationOptions,
    typeof Navigator
>(Navigator);


const DrawerContent = ({ navigation, state }) => {
    return (

        <Drawer
            header={<DrawerHeader />}
            selectedIndex={new IndexPath(state.index)}
            onSelect={index => navigation.navigate(state.routeNames[index.row])}
            footer={<LayoutView><Text category='c2' appearance="hint" style={{ textAlign: 'center' }}>{`EldersIndia v2.0`}</Text></LayoutView>}

        >
            <DrawerItem title='Dashboard' accessoryLeft={<Icon name="ios-home-outline" pack='ionicons' />} />
            <DrawerItem title='Branches' accessoryLeft={<Icon name="ios-git-branch-outline" pack='ionicons' />} />
            <DrawerItem title='Employees' accessoryLeft={<Icon name="ios-people-outline" pack='ionicons' />} />
            <DrawerItem title='Offerings' accessoryLeft={<Icon name="ios-layers-outline" pack='ionicons' />} />
            <DrawerItem title='Short Bytes' accessoryLeft={<Icon name="ios-layers-outline" pack='ionicons' />} />
            <DrawerItem title='Blogs' accessoryLeft={<Icon name="ios-library-outline" pack='ionicons' />} />
            <DrawerItem title='News' accessoryLeft={<Icon name="ios-newspaper-outline" pack='ionicons' />} />
            <DrawerItem title='Events' accessoryLeft={<Icon name="ios-calendar-outline" pack='ionicons' />} />
            <DrawerItem title='Community' accessoryLeft={<Icon name="ios-earth-outline" pack='ionicons' />} />
            <DrawerItem title='Insights' accessoryLeft={<Icon name="ios-pie-chart-outline" pack='ionicons' />} />
            <DrawerItem title='Support Tickets' accessoryLeft={<Icon name="ios-help-buoy-outline" pack='ionicons' />} />
            <DrawerItem title='Account' accessoryLeft={<Icon name="ios-person-outline" pack='ionicons' />} />
        </Drawer>
    )
}

const Layout = () => {
    const theme = useTheme();
    const dimensions = useWindowDimensions()

    return (
        <DrawerLayout
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{ headerStyle: {backgroundColor: theme['color-primary-default']}, headerTintColor: theme['color-basic-100'], drawerType: dimensions.width >= 768 ? 'permanent' : 'front',}}
        >
            <DrawerLayout.Screen name='dashboard' options={{title: 'Dashboard'}}/>
            <DrawerLayout.Screen name='branches' options={{title: 'Branches'}}/>
            <DrawerLayout.Screen name='employees' options={{title: 'Employees'}} />
            <DrawerLayout.Screen name='offerings' options={{title: 'Offerings'}} />
            <DrawerLayout.Screen name='short-bytes' options={{title: 'Short Bytes'}} />
            <DrawerLayout.Screen name='blogs' options={{title: 'Blogs'}} />
            <DrawerLayout.Screen name='news' options={{title: 'News'}} />
            <DrawerLayout.Screen name='events' options={{title: 'Events'}} />
            <DrawerLayout.Screen name='community' options={{title: 'Community'}} />
            <DrawerLayout.Screen name='insights' options={{title: 'Insights'}} />
            <DrawerLayout.Screen name='support-tickets' options={{title: 'Support Tickets'}}/>
            <DrawerLayout.Screen name='account' options={{title: 'Account'}}/>
        </DrawerLayout>
    )
}

export default Layout;