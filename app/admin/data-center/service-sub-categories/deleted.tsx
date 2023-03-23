import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input } from '@ui-kitten/components'

export default function Page() {
  const { push, replace, back } = useRouter()
  return (
    <Layout level='1' style={{ flex: 1}}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}
      >
        <Text category='s1' style={{ textAlign: 'center', margin: 8, }}>{`Deleted service sub categories.`}</Text>
      </MotiView>

    </Layout>
  )
}
