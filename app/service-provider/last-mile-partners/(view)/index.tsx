import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar } from '@ui-kitten/components'
import { useQuery, } from '@tanstack/react-query'
import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import getLastMilePartner from 'apis/service-provider/last-mile-partners'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { faker } from '@faker-js/faker';

const data =[
  {id: 1,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
    phone: faker.phone.number(),
    age: faker.datatype.number({ min: 10, max: 100 }),
  },
  {id:2,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
    phone: faker.phone.number(),
    age: faker.datatype.number({ min: 10, max: 100 }),
  },
  {id: 3,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
    phone: faker.phone.number(),
    age: faker.datatype.number({ min: 10, max: 100 }),
  },
  {id: 4,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
    phone: faker.phone.number(),
    age: faker.datatype.number({ min: 10, max: 100 }),
  },
  {id: 5,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
    phone: faker.phone.number(),
    age: faker.datatype.number({ min: 10, max: 100 }),
  },
  {id: 6,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
    phone: faker.phone.number(),
    age: faker.datatype.number({ min: 10, max: 100 }), 
  },
]

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />
const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />
const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />
const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />
const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />



export default function Page() {
  const { push } = useRouter()
  const fetchLastMilePartner = (page = 1, sort, search) => getLastMilePartner(page, sort, search)
  const [page = 1, setPage] = useState();
  const [sort = 'first_name-desc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [lastMilePartnerdata, setLastMilePartnerData] = useState([])
  const [selectedCount, setSelectedCount] = useState(0);
  const theme = useTheme();
  const list = React.useRef(null)

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: supportTicket,
    isFetching,
    refetch
  } = useQuery({
    enabled: false,
    queryKey: ['supportTicket', page, sort, search],
    queryFn: () => fetchLastMilePartner(page, sort, search),
    onSuccess(data) {
      console.log('Called')
      let list = []
      data.data?.data?.data?.map((l, i) => {
        console.log('inside')
        list.push({
          id: l.id,
          first_name:l.first_name,
          last_name:l.last_name, 
          email:l.email,
          phone:l.phone, 
          gender:l.gender,
          age:l.age,
          link: `/service-provider/last-mile-partner/${l.first_name}?id=${l.id}&name=${l.first_name}`,
        })
      })
      list.length > 0 && setLastMilePartnerData(lastMilePartnerdata.concat(list));
    },
  })

  const onDelete = () => {
    setLastMilePartnerData(lastMilePartnerdata => lastMilePartnerdata.filter(item => !item.isSelected));
    setSelectedCount(0);
  };
  const handleSelectAll = () => {
    setSelectedCount(lastMilePartnerdata.length);
    setLastMilePartnerData(lastMilePartnerdata => lastMilePartnerdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };
  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setLastMilePartnerData(lastMilePartnerdata => lastMilePartnerdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };
  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setLastMilePartnerData(lastMilePartnerdata => lastMilePartnerdata.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        }
      }
      return item
    }))

  };
  //const keyExtractor = React.useCallback((item) => item.id.toString(), []);
  const openSortSheet = async () => {
    const sortType = await SheetManager.show('locations-sort-sheet', { payload: sort })
    if (sortType !== undefined) {
      setSort(sortType)
      // list?.current.scrollToIndex({ animated: true, index: 0 })
    }
  }
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  };
  const handleSearch = (value) => {
    setSearch(value)
  }
  const optimizedFn = React.useCallback(debounce(handleSearch), []);
  const renderNewItem = React.useCallback(({ item, index }) => (
    <Card onPress={() => push(`/service-provider/last-mile-partners/${item.name}?id=${item.id}&name=${item.name}`)}>
      {/* <Card
      onPress={() => push(`/admin/wallets/${item.id}/${item.name}`)}></Card> */}
      <MotiView style={{flexDirection:"row"}}>
        <Image
          source={{uri: "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg", width: 50, height: 50}}
          // src={`${item.logo}`}
          // src={faker.image.business()}
          alt="A cool artist's image."
          style={{ borderRadius: 12 }}
        />
        <>
          <Text category='s1' style={{marginLeft: 8, justifyContent:"center", alignSelf:"center"}}>
            {`${item.first_name}`}
          </Text>
        </>

      </MotiView>

    </Card>
    
    ), []);

  return (
    <Layout style={{ backgroundColor: theme[`color-basic-200`] }}>

      {/* ---If Selected ? Action Button Section : Show Sort, Filter and Search Section------------------------ */}
      {selectedCount > 0
        ?
        <MotiView style={{ flexDirection: 'row', alignSelf: "flex-end" }} >
          {selectedCount > 0 && (
            <Button onPress={onDelete}
              status="primary"
              appearance="ghost"
              style={{ width: 20 }}
              accessoryLeft={<DeleteIcon color={theme['color-basic-700']} />} />
          )}

          {selectedCount > 0 && (
            <Button onPress={handleSelectAll} status='primary'
              appearance="ghost"
              style={{ width: 20 }}
              accessoryLeft={<SelectAllIcon color={theme['color-basic-700']} />} />
          )}

          {selectedCount > 0 && (
            <Button onPress={handleRemoveSelection}
              appearance="ghost" status='primary'
              style={{ width: 20 }}
              accessoryLeft={<RemoveSelection color={theme['color-basic-700']} />} />
          )}

        </MotiView>
        :
        <MotiView>
          {/* Sort and Filter section */}
          <MotiView
            style={{ flexDirection: 'row' }}
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
              onPress={openSortSheet}
            >Sort</Button>
            <Button status='warning' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-warning-default'] }]} name='ios-filter-outline' pack='ionicons'
            />}>Filter</Button>

          </MotiView>

          <Divider />

          {/* Search Section */}

          <Input size='medium' placeholder='Search a wallet' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }

      <List
        data={data}
        renderItem={renderNewItem}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  )
}


