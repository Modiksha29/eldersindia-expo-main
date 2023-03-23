import React from 'react'
import { Link } from "expo-router";
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, List, ListItem, Divider } from '@ui-kitten/components'

const data = [
    {
        title: 'Locations',
        description: 'Manage locations',
        link: '/admin/data-center/locations',
        icon: 'ios-location-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Blog categories',
        description: 'Manage blog categoroies',
        link: '/admin/data-center/blog-categories',
        icon: 'ios-library-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Blog sub-categories',
        description: 'Manage blog categoroies',
        link: '/admin/data-center/blog-sub-categories',
        icon: 'ios-library-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'News categories',
        description: 'Manage news categoroies',
        link: '/admin/data-center/news-categories',
        icon: 'ios-newspaper-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'News sub-categories',
        description: 'Manage news sub-categoroies',
        link: '/admin/data-center/news-sub-categories',
        icon: 'ios-newspaper-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Events categories',
        description: 'Manage events categoroies',
        link: '/admin/data-center/event-categories',
        icon: 'ios-calendar-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Events sub-categories',
        description: 'Manage events sub-categoroies',
        link: '/admin/data-center/event-sub-categories',
        icon: 'ios-calendar-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Service categories',
        description: 'Manage service categoroies',
        link: '/admin/data-center/service-categories',
        icon: 'ios-globe-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Service sub-categories',
        description: 'Manage services sub-categoroies',
        link: '/admin/data-center/service-sub-categories',
        icon: 'ios-globe-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Package categories',
        description: 'Manage package categoroies',
        link: '/admin/data-center/package-categories',
        icon: 'ios-briefcase-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Package sub-categories',
        description: 'Manage package sub-categoroies',
        link: '/admin/data-center/package-sub-categories',
        icon: 'ios-briefcase-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Subscription categories',
        description: 'Manage subscription categoroies',
        link: '/admin/data-center/subscription-categories',
        icon: 'ios-checkmark-done-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Subscription sub-categories',
        description: 'Manage subscription sub-categoroies',
        link: '/admin/data-center/subscription-sub-categories',
        icon: 'ios-checkmark-done-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Product categories',
        description: 'Manage product categoroies',
        link: '/admin/data-center/product-categories',
        icon: 'ios-cube-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Product sub-categories',
        description: 'Manage product sub-categoroies',
        link: '/admin/data-center/product-sub-categories',
        icon: 'ios-cube-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Tags',
        description: 'Manage tags',
        link: '/admin/data-center/tags',
        icon: 'ios-pricetags-outline',
        iconsPack: 'ionicons'
    },
    {
        title: 'Service Types',
        description: 'Manage service types',
        link: '/admin/data-center/service-types',
        icon: 'ios-cog-outline',
        iconsPack: 'ionicons'
    },
]

export default function Page() {
    const { push, replace, back } = useRouter()

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title}`}
            description={`${item.description}`}
            accessoryLeft={<Icon name={`${item.icon}`} pack={`${item.iconsPack}`} />}
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
                    data={data}
                    renderItem={renderItem}
                    ItemSeparatorComponent={Divider}
                />
            </MotiView>

        </Layout>
    )
}
