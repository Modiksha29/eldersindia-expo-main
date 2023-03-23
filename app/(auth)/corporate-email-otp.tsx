import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, useTheme } from '@ui-kitten/components'
import LinearGradient from "react-native-linear-gradient";
import { useMMKVObject, useMMKVBoolean } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'

export default function Page() {
    const theme = useTheme()
    const { push, replace, back, } = useRouter()
    const [auth, setAuth] = useMMKVObject('auth', storage)
    const [value, setValue] = React.useState('');

    return (
        <LinearGradient
            colors={[theme['color-basic-100'], theme['color-basic-100'], theme['color-primary-100']]}
            style={{ flex: 1 }}
        >
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 100, backgroundColor: 'transparent' }}>
                <Text category='h6' style={{ textAlign: 'center', width: 340 }}>Please enter OTP that your received on your work email ID</Text>
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing' }}
                    style={{ paddingVertical: 8, width: 340 }}
                >
                    <Input
                        placeholder='One time password'
                        value={value}
                        onChangeText={nextValue => setValue(nextValue)}
                        style={{ paddingVertical: 8 }}
                        size='large'
                    />
                    <Button
                        size='medium'><Text >{`Verify work email`}</Text></Button>
                </MotiView>
            </Layout>
        </LinearGradient>
    )
}
