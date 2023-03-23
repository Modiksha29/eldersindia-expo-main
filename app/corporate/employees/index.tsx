import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { MotiScrollView, MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, List, Card, IconProps, IconElement, useTheme, Divider } from '@ui-kitten/components'
import { ImageProps, Image } from 'react-native'
import { faker } from '@faker-js/faker';
import {LinearGradient} from "expo-linear-gradient";


const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />

const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash-2-outline' />

const EditIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='ios-pencil-outline' pack='ionicons' />

const employees = Array.from({ length: 12 }, (_, i) => {
  return {
    uuid: faker.datatype.uuid,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    get email() { return faker.internet.email(this.first_name, '', 'elderswealth.com') },
    mobile: faker.phone.number('+91 ##########'),
    number_of_elders_onboarded: faker.mersenne.rand(0, 5),
    employee_id: faker.datatype.string(6),
    profile_photo: faker.image.avatar()
  }
})

export default function Page() {
  const theme = useTheme()
  const [search, setSearch] = useState('')
  const { push, replace, back, } = useRouter()

  const renderItem = ({ item, index }) => (
    <Card
      appearance="filled"
      style={{ margin: 8, }}>
      <MotiView style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 0, marginBottom: 8 }}>
          <MotiView style={{ paddingVertical: 8, }}>
            <Image
              source={{uri: item?.profile_photo, height:80, width: 80}}
              alt={`${item?.first_name}'s profile photo`}
              style={{borderRadius: 8,}}
            />
          </MotiView>
        <MotiView style={{ flex: 1, marginLeft: 8 }}>
          <MotiView style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', marginBottom: 4 }}>
            <Icon
              style={{ width: 18, height: 18, marginRight: 8, tintColor: theme['color-basic-800'] }}
              fill={theme['color-basic-800']}
              name={'ios-person-outline'}
              pack={'ionicons'}
            />
            <Text category='s1'>{`${item?.first_name} ${item?.last_name}`}</Text>
          </MotiView>
          <MotiView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 4 }}>
            <Icon
              style={{ width: 18, height: 18, marginRight: 8, tintColor: theme['color-basic-800'] }}
              fill={theme['color-basic-800']}
              name={'ios-call-outline'}
              pack={'ionicons'}
            />
            <Text category='p1'>{item?.mobile}</Text>
          </MotiView>
          <MotiView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 4 }}>
            <Icon
              style={{ width: 18, height: 18, marginRight: 8, tintColor: theme['color-basic-800'] }}
              fill={theme['color-basic-800']}
              name={'ios-mail-outline'}
              pack={'ionicons'}
            />
            <Text status='primary' category='p1'>{item?.email}</Text>
          </MotiView>
        </MotiView>
      </MotiView>

      <Divider />
      <MotiView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8 }}>

        <Button size='small' status="warning" appearance='outline' style={{ marginRight: 8 }} accessoryLeft={<DeleteIcon color={theme['color-warning-default']} />}>Delete</Button>
        <Button size='small' status='primary' accessoryLeft={<EditIcon color={theme['color-basic-100']} />}>Edit</Button>
      </MotiView>

    </Card>
  );


  return (
    <Layout level='2' style={{ flex: 1 }}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}
      >
        <MotiView
          style={{ flexDirection: 'row', backgroundColor: theme['color-basic-100'] }}
          from={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'timing',
          }}
        >
          <Button status='primary' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='ios-swap-vertical-outline' pack='ionicons'
          />}
          // onPress={openSortSheet}
          >Sort</Button>
          <Button status='basic' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-basic-600'] }]} name='ios-filter-outline' pack='ionicons'
          />}>Filter</Button>
        </MotiView>
        <Input value={search} onChangeText={nextValue => setSearch(nextValue)} size='medium' placeholder='Search' accessoryRight={<SearchIcon color={theme['color-primary-default']} />} style={{ padding: 4, backgroundColor: theme['color-basic-100'] }} />
        <List
          data={employees}
          renderItem={renderItem}
        />
      </MotiView>

    </Layout>
  )
}
