import React from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { MotiView } from 'moti'
import { ImageProps } from 'react-native'
import { Layout, Button, Icon, Text, Input, useTheme, Card, IconProps, IconElement, Divider } from '@ui-kitten/components'
import RazorpayCheckout from 'react-native-razorpay';
import { LinearGradient } from "expo-linear-gradient";
import { selectFreePlan } from 'apis/auth/subscription'
import { useQuery } from '@tanstack/react-query'
import { useMMKVObject } from 'react-native-mmkv';
import { storage } from 'provider/storageProvider'
import { useAuth } from 'provider/auth-provider'

const freeFeatures = [
  { name: "Read premium blogs", quantity: 24 },
  { name: "Access to news", quantity: 24 },
  { name: "Access to premium events", quantity: 24 },
  { name: "View to unlimited short videos", quantity: 10000 },
  { name: "Access to public community" },
  { name: "Connect with people" },
]

const freedomFeatures = [
  { name: "Access to curated services" },
  { name: "Access to curated packages" },
  { name: "Access to curated products" },
  { name: "Access to premium blogs", },
  { name: "Access to news" },
  { name: "Access to premium events" },
  { name: "Access to unlimited short videos", },
  { name: "Onboard your elders" },
  { name: "Connect with people" },
]

const PaperPlaneIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: props.color }]} name='paper-plane-outline' width={16} heigth={16} />

export default function Page() {
  const { push, replace, back } = useRouter()
  const theme = useTheme()
  const { isElder } = useSearchParams();
  const [data, setData] = useMMKVObject('data', storage)
  const {signIn} = useAuth()

  const { refetch } = useQuery({
    enabled: false,
    queryKey: ['choose-plan'],
    queryFn: () => selectFreePlan(isElder),
    onSuccess(data) {
      const response = data?.data;
      console.log("Plan", response)
      if (response.success) {
        setData(response?.data)
        signIn(response.data.user)
      }
      else {
        alert(`There was a problem in activating your free plan.`)
      }
    },
    onError(error, variables, context) {
      const errors = error?.response?.data?.errors
      console.log(errors)
      alert(`There was a problem in activating your free plan.`)
    },
  })

  console.log("Is elder", isElder)

  return (
    <LinearGradient
      colors={[theme['color-basic-100'], theme['color-basic-100'], theme['color-primary-200']]}
      style={{ flex: 1 }}
    >
      <Layout style={{ flex: 1, backgroundColor: 'transparent' }}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing' }}
        >
          <Text category='h5' style={{ textAlign: 'center', margin: 8, }}>{`Choose your plan`}</Text>
        </MotiView>
        <MotiView style={{ padding: 16 }}>
          <Card
            status="info"
            header={<MotiView style={{ backgroundColor: theme['color-primary-default'] }}><Text status='info' category='h5'>Free</Text></MotiView>}
            footer={<MotiView><Button status="info" onPress={() => refetch(isElder)} >Select</Button></MotiView>}
          >
            {freeFeatures.map((feature, index) => (
              <MotiView key={feature.name + "free"} style={{ paddingBottom: 4, flexDirection: 'row', gap: 4 }}>
                <PaperPlaneIcon color={theme['color-info-700']} style={{ height: 20 }} />
                <Text category='s1' status='info'>{feature.name}</Text>
              </MotiView>
            ))}
          </Card>
          <Card
            status="primary"
            header={<MotiView><Text status='primary' category='h5'>Freedom</Text></MotiView>}
            footer={<MotiView><Button status="primary">Select</Button></MotiView>}
          >
            {freedomFeatures.map((feature, index) => (
              <MotiView key={feature.name + "freedom"} style={{ paddingBottom: 4, flexDirection: 'row', gap: 4 }}>
                <PaperPlaneIcon color={theme['color-primary-default']} style={{ height: 20 }} />
                <Text category='s1' status='basic'>{feature.name}</Text>
              </MotiView>
            ))}
          </Card>
        </MotiView>

      </Layout>
    </LinearGradient>
  )
}
