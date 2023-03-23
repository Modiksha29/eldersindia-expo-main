import React from 'react'
import { Link, useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { StyleSheet } from "react-native"
import { Layout, Button, Icon, Text, Input, Toggle, } from '@ui-kitten/components'
import Toast from 'react-native-toast-message';

export default function Page() {
  const { push, replace, back, } = useRouter()
  const [location, setLocation] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [latitude, setLatitude] = React.useState(null)
  const [longtude, setLongitude] = React.useState(null)
  const [status, setStatus] = React.useState(true);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Created',
      text2: 'Location created'
    });
  }



  return (
    <Layout level='1' style={{ flex: 1}}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}
      >
        <Text category='s1' style={{ textAlign: 'left', margin: 8, }}>{`Create Locations.`}</Text>
        <Input
          placeholder={'Location'}
          value={location}
          onChange={nextValue => setLocation(nextValue)}
          style={styles.marginVertical}
        />
        <Input
          placeholder={`Description`}
          value={description}
          onChange={nextValue => setDescription(nextValue)}
          caption="Not visible to customers"
          style={styles.marginVertical}
        />
        <Toggle
          style={[styles.marginVertical, styles.alignSelf]}
          status='primary'
          checked={status}
          onChange={isChecked => setStatus(isChecked)}
        >
          Is Location active?
        </Toggle>
        <Input
          placeholder={`Latitude`}
          value={description}
          onChange={nextValue => setLatitude(nextValue)}
          caption="Optional"
          style={styles.marginVertical}
        />
        <Input
          placeholder={`Longitude`}
          value={description}
          onChange={nextValue => setLongitude(nextValue)}
          caption="Optional"
          style={styles.marginVertical}
        />
        <Button status='primary' style={styles.marginVertical} onPress={() => showToast()}>Save</Button>
      </MotiView>

    </Layout>
  )
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 4,
  },
  alignSelf: {
    alignSelf: 'flex-start'
  },
})