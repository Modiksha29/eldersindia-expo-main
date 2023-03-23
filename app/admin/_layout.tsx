import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import React from 'react'
import { useWindowDimensions } from 'react-native';
import { Drawer, DrawerItem, DrawerGroup, Text, IndexPath, Icon, Card, Layout as LayoutView } from '@ui-kitten/components'
import { withLayoutContext, useSegments, useR, useRouter, useNavigation } from "expo-router";
import { useMMKVObject } from 'react-native-mmkv'
//   import { storage } from 'app/provider/storageProvider'

import { AdminTopNavigation } from 'components/admin/top-navigation'
//   import { SafeAreaProvider } from "react-native-safe-area-context";
//   import LinearGradient from "react-native-linear-gradient";
import { DrawerHeader } from "components/admin/drawer-header";

const { Navigator } = createDrawerNavigator();

const DrawerLayout = withLayoutContext(Navigator);

export const unstable_settings = {
  initialRouteName: "dashboard",
};

const DrawerContent = (props) => {
  return <Drawer
    header={<DrawerHeader />}
    selectedIndex={new IndexPath(props.state.index)}
    onSelect={index => props.navigation.navigate(props.state.routeNames[index.row])}
    footer={<LayoutView><Text category='c2' appearance="hint" style={{ textAlign: 'center' }}>{`EldersIndia v2.0`}</Text></LayoutView>}
  >
    <DrawerItem title='Dashboard' accessoryLeft={<Icon name="ios-home-outline" pack='ionicons' />} style={{ backgroundColor: 'transparent' }} />
    <DrawerItem title='Bookings' accessoryLeft={<Icon name="ios-list-outline" pack='ionicons' />} accessoryRight={<Text category='label' status='success'>35</Text>} />
    <DrawerItem title='Service Providers' accessoryLeft={<Icon name="business-outline" pack='ionicons' />} />
    <DrawerItem title='Corporates' accessoryLeft={<Icon name="medal-outline" pack='ionicons' />} />
    <DrawerItem title='Customers' accessoryLeft={<Icon name="ios-people-outline" pack='ionicons' />} />
    <DrawerItem title='Data Center' accessoryLeft={<Icon name="ios-server-outline" pack='ionicons' />} />
    <DrawerItem title='Blogs' accessoryLeft={<Icon name="ios-library-outline" pack='ionicons' />} />
    <DrawerItem title='News' accessoryLeft={<Icon name="ios-newspaper-outline" pack='ionicons' />} />
    <DrawerItem title='Events' accessoryLeft={<Icon name="ios-calendar-outline" pack='ionicons' />} />
    <DrawerItem title='Communities' accessoryLeft={<Icon name="ios-earth-outline" pack='ionicons' />} />
    <DrawerItem title='Short Bytes' accessoryLeft={<Icon name="ios-videocam-outline" pack='ionicons' />} />
    <DrawerItem title='Promo Codes' accessoryLeft={<Icon name="ios-pricetags-outline" pack='ionicons' />} />
    <DrawerItem title='Wallets' accessoryLeft={<Icon name="ios-wallet-outline" pack='ionicons' />} />
    <DrawerItem title='Statistical Reports' accessoryLeft={<Icon name="ios-bar-chart-outline" pack='ionicons' />} />
    <DrawerItem title='Financial Reports' accessoryLeft={<Icon name="ios-cash-outline" pack='ionicons' />} />
    <DrawerItem title='Support Tickets' accessoryLeft={<Icon name="ios-help-buoy-outline" pack='ionicons' />} accessoryRight={<Text category='label' status='danger'>3</Text>} />
    <DrawerItem title='Account' accessoryLeft={<Icon name="ios-person-outline" pack='ionicons' />} accessoryRight={<Text category='label' status='danger'>3</Text>} />
  </Drawer>
}

const Layout = () => {
  const dimensions = useWindowDimensions();

  return (
    <DrawerLayout
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
      }}
    // screenOptions={{headerShown: segments.length <= 3}}
    //   screenOptions={({ navigation }) => {
    //     return {
    //       header: () => <AdminTopNavigation navigation={navigation} title={segments[segments.length -1]} isBackButtonShown={segments.length > 2  ? true : false} />,
    //       headerBackground: 'transparent'
    //     }
    //   }}
    >
      <DrawerLayout.Screen name='dashboard' options={{ title: 'Dashboard' }} />
      <DrawerLayout.Screen name='bookings' options={{ title: 'Bookings' }} />
      <DrawerLayout.Screen name='service-providers' options={{ title: 'Service Providers' }}  />
      <DrawerLayout.Screen name='corporates' options={{ title: 'Corporates' }} />
      <DrawerLayout.Screen name='customers' options={{title: 'Customers'}}/>
      <DrawerLayout.Screen name='data-center' options={{ title: 'Data Center' }} />
      <DrawerLayout.Screen name='blogs' options={{ title: 'Blogs' }}  />
      <DrawerLayout.Screen name='news' options={{ title: 'News' }} />
      <DrawerLayout.Screen name='events' options={{ title: 'Events' }}  />
      <DrawerLayout.Screen name='communities' options={{ title: 'Communities' }}  />
      <DrawerLayout.Screen name='short-bytes' options={{ title: 'Short Bytes' }}  />
      <DrawerLayout.Screen name='promo-codes' options={{ title: 'Promo codes' }} />
      <DrawerLayout.Screen name='wallets' options={{ title: 'Wallets' }}  />
      <DrawerLayout.Screen name='statistical-reports' options={{ title: 'Statistical Reports' }}  />
      <DrawerLayout.Screen name='financial-reports' options={{ title: 'Financial Reports' }}  />
      <DrawerLayout.Screen name='support-tickets' options={{ title: 'Support Tickets' }}  />
      <DrawerLayout.Screen name='account' options={{ title: 'Account' }} />
    </DrawerLayout>
  )
}

export default Layout;