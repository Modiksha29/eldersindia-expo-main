import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { Layout, Button, Icon, Text, Input, Card, useTheme, IconProps, IconElement } from '@ui-kitten/components'

// const ApproveIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-circle-2-outline' width={32} heigth={32} />
// const RejectIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
// const EditIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='edit-2-outline' width={32} heigth={32} />

export default function Page() {
  const { push, replace, back } = useRouter()
  const theme = useTheme();
  return (
    <Layout level='1' style={{ flex: 1 }}>
      <ScrollView>
      <Card
        // onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
        // onLongPress={() => handelSection(item.id, item.isSelected)}
        style={{
          // backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
          marginBottom: 4,
        }}
      >
        <MotiView style={{ flexDirection: "row" }}>
          <Image
            source={{uri: "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"}}
            alt="A cool artist's image."
            style={{ borderRadius: 12, width: 50, height: 50 }}
          />

          <MotiView style={{marginRight:32}}>
            <>
              <Text category='s1' style={{ marginLeft: 8, justifyContent: "center", alignSelf: "center" }}>
                {/* {`${item.name}`} */}
                Bengaluru’s 63-yo landscaper spent rs 45 lakh to revive dying lake; 4000 saplings planted
              </Text>
            </>
            <MotiView style={{ flexDirection: 'row',alignSelf: "flex-end" , marginTop:8}} >
            
            <Button status='success' appearance='outline' style={{ marginHorizontal: 4, width:70 }} onPress={() => isPresented()}
            size='tiny'>Resotre</Button>
            <Button status='danger' appearance='outline' style={{ marginHorizontal: 4 }} onPress={() => isPresented()}
            size='tiny'>Delete Permanently</Button>
            </MotiView>

          </MotiView>

        </MotiView>

      </Card>

      <Card
        // onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
        // onLongPress={() => handelSection(item.id, item.isSelected)}
        style={{
          // backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
          marginBottom: 4,
        }}
      >
        <MotiView style={{ flexDirection: "row" }}>
          <Image
            source={{uri: "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"}}
            alt="A cool artist's image."
            style={{ borderRadius: 12, width: 50, height: 50 }}
          />

          <MotiView style={{marginRight:32}}>
            <>
              <Text category='s1' style={{ marginLeft: 8, justifyContent: "center", alignSelf: "center" }}>
                {/* {`${item.name}`} */}
                For centuries, 75-yo rajasthani artist’s family has handcrafted jewels for royalty
              </Text>
            </>
            
            <MotiView style={{ flexDirection: 'row',alignSelf: "flex-end" , marginTop:8}} >
            
            <Button status='success' appearance='outline' style={{ marginHorizontal: 4, width:70 }} onPress={() => isPresented()}
            size='tiny'>Resotre</Button>
            <Button status='danger' appearance='outline' style={{ marginHorizontal: 4 }} onPress={() => isPresented()}
            size='tiny'>Delete Permanently</Button>
            </MotiView>

          </MotiView>

        </MotiView>

      </Card>
     
      </ScrollView>

    </Layout>
  )
}
