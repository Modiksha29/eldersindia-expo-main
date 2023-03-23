import React from 'react'
import { useRouter, useSegments } from 'expo-router'
import { MotiView } from 'moti'
import { Button, Icon, Text, Card, List, ListItem, Divider, IconProps, IconElement, useTheme, Modal } from '@ui-kitten/components'
import { ImageProps } from 'react-native'
const CheckmarkCircleIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: props.color }]} name='checkmark-circle-outline' width={32} heigth={32} />

export default function SwitchAccount({ roles }) {
    const { replace } = useRouter();
    const segments = useSegments();
    const [visible, setVisible] = React.useState(false)
    const routes = {
        "developer": "/admin",
        "director": "/admin",
        "operation-executive": "/admin",
        "business-developer": "/admin",
        "accountant": "/admin",
        "service-provider-admin": "/service-provider",
        "last-mile-partner": "/last-mile-partner",
        "corporate-admin": "/corporate",
        "corporate-employee": "/customer",
        "corporate-elder": "/customer",
        "solo-employee": "/customer",
        "solor-employee-elder": "/customer",
        "solo-elder": "/customer",
    }

    if (roles === undefined) {
        return <></>
    }
    if (roles.length > 1) {
        const renderItem = ({ item, index }) => (
            <ListItem
                title={`${item?.name?.replace('-', ' ')?.toUpperCase()}`}
                accessoryLeft={<CheckmarkCircleIcon />}
                onPress={() => replace(routes[item?.name])}
            />
        );
        return (
            <MotiView style={{ padding: 16, }}>
                <Button appearance='ghost' size='large' accessoryRight={<Icon name='ios-repeat-outline' pack='ionicons' />} onPress={() => setVisible(true)} >Switch Account</Button>
                <Modal visible={visible} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', }} onBackdropPress={() => setVisible(false)}>
                    <Card
                        style={{ minWidth: 320 }}
                        header={<Text category='h6'>Switch to</Text>}
                        footer={<Button status='danger' appearance='ghost' onPress={() => setVisible(false)}>
                            Cancel
                        </Button>}
                    >
                        <List
                            data={roles.filter(r => `/${segments[0]}` !== routes[r.name])}
                            renderItem={renderItem}
                            ItemSeparatorComponent={Divider}
                        />
                    </Card>
                </Modal>
            </MotiView>
        )
    }
    return (
        <></>
    )
}