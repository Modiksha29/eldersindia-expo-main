import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, useTheme } from '@ui-kitten/components'
import { LinearGradient } from "expo-linear-gradient";

export default function Page() {
    const { push, replace, back } = useRouter()
    const theme = useTheme()

    return (
        <LinearGradient
            colors={[theme['color-basic-100'], theme['color-basic-100'], theme['color-primary-100']]}
            style={{ flex: 1 }}
        >
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 100, paddingHorizontal: 16, backgroundColor: 'transparent' }}>
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing' }}
                    style={{ alignContent: 'flex-end' }}
                >
                    <Text category='h5' style={{ textAlign: 'center', margin: 8, }}>{`Are you an elder?`}</Text>

                </MotiView>
                <MotiView style={{
                    flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', width: 320
                }}>
                    <Button status='warning' size='large' style={{ flex: 1, margin: 8 }} onPress={() => push({pathname: 'subscribe', params: {isElder: 0}})}>No</Button>
                    <Button status='primary' size='large' style={{ flex: 1, margin: 8 }} onPress={() =>push({pathname: 'subscribe', params: {isElder: 1}})}>Yes</Button>
                </MotiView>
            </Layout>
        </LinearGradient>
    )
}
