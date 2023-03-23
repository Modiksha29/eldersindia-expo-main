import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, List, ListItem, Divider } from '@ui-kitten/components'

const data = [
    {
        title: 'Sales Reports',
        description: 'All about sales',
        link: '/admin/financial-reports/sales',
        icon: 'currency-rupee',
        iconsPack: 'material-community'
    },
    {
        title: 'Reconcialiation Reports',
        description: 'Settlement reports with Service partners',
        link: '/admin/financial-reports/reconciliation',
        icon: 'ios-swap-horizontal-outline',
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
            style={{height: 60}}
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
