import React from 'react'
import { Linking } from 'react-native'
import { useRouter } from 'expo-router'
import { MotiView, SafeAreaView } from 'moti'
import { Layout, Button, Icon, Text, Input, List, ListItem, Divider } from '@ui-kitten/components'
import { useMMKVObject } from 'react-native-mmkv'
import { useAuth } from "provider/auth-provider";
import Logo from '../../../assets/images/Logo'
import SwitchAccount from "components/common/switch-account"

const links = [
    {
        title: 'Joe Bidden',
        description: `Your registered name`,
        icon: 'ios-person-outline',
        iconsPack: 'ionicons'
    },
    {
        title: '+91 1234567890',
        description: `Your mobile number`,
        icon: 'ios-call-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'About us',
        description: 'Know more about EldersIndia',
        link: '/last-mile-partner/account/eldersindia',
        icon: 'information-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Rate us on App Store',
        description: 'Let us know how we are doing',
        link: 'https://onelink.to/ei_apps',
        icon: 'ios-heart-outline',
        iconsPack: 'ionicons',
        externalLink: true,
    },
]

export default function Page() {
    const [data, setData] = useMMKVObject('data', storage)
    const { push, replace, back } = useRouter()
    const {signOut} = useAuth();

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title}`}
            description={`${item.description}`}
            accessoryLeft={<Icon name={`${item.icon}`} pack={`${item.iconsPack}`} />}
            onPress={() => item?.externalLink ? Linking.openURL(item?.link) : item?.link !== undefined && push(`${item?.link}`)}
        />
    );


    return (
        <Layout level='1' style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing' }}
                >
                    <List
                        data={links}
                        renderItem={renderItem}
                        ItemSeparatorComponent={Divider}
                    />
                    <SwitchAccount roles={data?.user?.roles} />
                </MotiView>
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing' }}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                >
                    <Logo width="250" height="107.13" />
                    <Text category='c2' status='basic' appearance='hint' style={{ paddingVertical: 12 }}>Version 2.0</Text>
                    <Button status='danger' size='medium' style={{ width: 200 }} appearance="outline" onPress={() => signOut()}>Logout</Button>
                </MotiView>
            </SafeAreaView>
        </Layout>
    )
}
