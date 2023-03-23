import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, useTheme } from '@ui-kitten/components'
import { LinearGradient } from "expo-linear-gradient";

export default function Page() {
  const { push, replace, back } = useRouter()
  const theme = useTheme()
  const [value, setValue] = React.useState('');


  return (
    <LinearGradient
      colors={[theme['color-basic-100'], theme['color-basic-100'], theme['color-primary-100']]}
      style={{ flex: 1 }}
    >
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 100, backgroundColor: 'transparent' }}>

        <Text category='h6' style={{ textAlign: 'center' }}>Please enter your work email ID</Text>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing' }}
          style={{ paddingVertical: 8, width: 340 }}
        >
          <Input
            placeholder='Work email ID'
            value={value}
            onChangeText={nextValue => setValue(nextValue)}
            style={{ paddingVertical: 8 }}
            size='large'
          />
          <Button
            size='medium' onPress={() => push('/corporate-email-otp')}><Text>{`Send OTP`}</Text></Button>
        </MotiView>
      </Layout>
    </LinearGradient>
  )
}
