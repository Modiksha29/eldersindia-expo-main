import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, List, ListItem, Divider, IconProps, IconElement, useTheme } from '@ui-kitten/components'
import Logo from 'assets/images/Logo'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import { ImageProps, SafeAreaView } from "react-native";
import { useAuth } from "provider/auth-provider";
import SwitchAccount from "components/common/switch-account"

const links = [
    {
        title: 'Profile',
        description: `It's all about you`,
        link: '/customer/account/profile',
        icon: 'ios-person-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Appearence',
        description: 'Choose your display mode',
        link: '/customer/account/appearance',
        icon: 'ios-contrast-outline',
        iconsPack: 'ionicons',
    },
    {
        title: 'Notifications',
        description: 'Choose your notification preferences',
        link: '/customer/account/notifications',
        icon: 'ios-notifications-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'About us',
        description: 'Know more about EldersIndia',
        link: '/customer/account/eldersindia',
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
    const { push, replace, back, } = useRouter()
    const theme = useTheme()
    const { signOut } = useAuth();

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title}`}
            description={`${item.description}`}
            accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-basic-800'] }]} name={`${item.icon}`} pack={`${item.iconsPack}`}
            />}
            accessoryRight={item?.externalLink ? <></> : <Icon name={`chevron-forward`} pack={`ionicons`} />}
            onPress={() => push(`${item.link}`)}
        />
    );


    return (
        <Layout level='1' style={{ flex: 1 }}>
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

        </Layout>
    )
}
