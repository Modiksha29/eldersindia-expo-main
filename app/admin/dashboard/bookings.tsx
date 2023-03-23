import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input } from '@ui-kitten/components'

export default function Page() {
  ////  const sx = useSx()
  const { push, replace, back } = useRouter()


  return (
    <Layout level='1' style={{ flex: 1}}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}
      >
        <Text category='h3' style={{ textAlign: 'center', margin: 8, }}>{`Bookings`}</Text>
      </MotiView>

    </Layout>
  )
}
