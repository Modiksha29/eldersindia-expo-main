import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { Layout, Button, Icon, Text, Input, Card, useTheme, IconProps, IconElement } from '@ui-kitten/components'

const ApproveIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-circle-2-outline' width={32} heigth={32} />
const RejectIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const EditIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='edit-2-outline' width={32} heigth={32} />

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
                Estate planning takes care of family's wealth after you
              </Text>
            </>
            <MotiView style={{ flexDirection: 'row',alignSelf: "flex-end" }} >
              <Button
                // onPress={onDelete}
                status="primary"
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<ApproveIcon color={theme['color-success-700']} />} />

              <Button
                // onPress={handleSelectAll} status='primary'
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<RejectIcon color={theme['color-danger-700']} />} />

              <Button
                // onPress={handleRemoveSelection}
                appearance="ghost" status='primary'
                style={{ width: 20 }}
                accessoryLeft={<EditIcon color={theme['color-basic-700']} />} />

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
                Watch this insightful video by javagal srinath on alzheimer's disease.
              </Text>
            </>
            <MotiView style={{ flexDirection: 'row',alignSelf: "flex-end" }} >
              <Button
                // onPress={onDelete}
                status="primary"
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<ApproveIcon color={theme['color-success-700']} />} />

              <Button
                // onPress={handleSelectAll} status='primary'
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<RejectIcon color={theme['color-danger-700']} />} />

              <Button
                // onPress={handleRemoveSelection}
                appearance="ghost" status='primary'
                style={{ width: 20 }}
                accessoryLeft={<EditIcon color={theme['color-basic-700']} />} />

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
                Know alzheimer's - the caregiver's perspective
              </Text>
            </>
            <MotiView style={{ flexDirection: 'row',alignSelf: "flex-end" }} >
              <Button
                // onPress={onDelete}
                status="primary"
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<ApproveIcon color={theme['color-success-700']} />} />

              <Button
                // onPress={handleSelectAll} status='primary'
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<RejectIcon color={theme['color-danger-700']} />} />

              <Button
                // onPress={handleRemoveSelection}
                appearance="ghost" status='primary'
                style={{ width: 20 }}
                accessoryLeft={<EditIcon color={theme['color-basic-700']} />} />

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
                Know alzheimer's for caregivers and patients - dr sushma chawla
              </Text>
            </>
            <MotiView style={{ flexDirection: 'row',alignSelf: "flex-end" }} >
              <Button
                // onPress={onDelete}
                status="primary"
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<ApproveIcon color={theme['color-success-700']} />} />

              <Button
                // onPress={handleSelectAll} status='primary'
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<RejectIcon color={theme['color-danger-700']} />} />

              <Button
                // onPress={handleRemoveSelection}
                appearance="ghost" status='primary'
                style={{ width: 20 }}
                accessoryLeft={<EditIcon color={theme['color-basic-700']} />} />

            </MotiView>

          </MotiView>

        </MotiView>

      </Card>

      <Card
        style={{
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
                Dream of becoming self-sustained led harbhajan kaur from chandigarh to make 100-year-old delicacy, ‘besan di barfi’ into a business at 94!
              </Text>
            </>
            <MotiView style={{ flexDirection: 'row',alignSelf: "flex-end" }} >
              <Button
                // onPress={onDelete}
                status="primary"
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<ApproveIcon color={theme['color-success-700']} />} />

              <Button
                // onPress={handleSelectAll} status='primary'
                appearance="ghost"
                style={{ width: 20 }}
                accessoryLeft={<RejectIcon color={theme['color-danger-700']} />} />

              <Button
                // onPress={handleRemoveSelection}
                appearance="ghost" status='primary'
                style={{ width: 20 }}
                accessoryLeft={<EditIcon color={theme['color-basic-700']} />} />

            </MotiView>

          </MotiView>

        </MotiView>

      </Card>

      </ScrollView>

    </Layout>
  )
}
