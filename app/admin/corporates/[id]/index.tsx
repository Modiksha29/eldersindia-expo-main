import React, { useState } from 'react'
import { MotiView } from 'moti'
import { useRouter } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, Card, ListItem, Input, useTheme, Divider, IconProps, IconElement } from '@ui-kitten/components'
import { useQuery, } from '@tanstack/react-query'
import getCorporates from 'apis/admin/corporates'
import { SheetManager } from 'react-native-actions-sheet'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { faker } from '@faker-js/faker';

const data =[
  {
    "id": "2c7014e5-f7db-3980-ac30-13f4eac92c71",
    "name": {
      "en": "eldersindia"
    },
    "headquarter": "Deli",
    "branches": [
      {
        "location": "Bengalur",
        "contact_person": "Akash",
        "designation": "Sr manager",
        "contact_number": "9876587493",
        "contact_email": "krish@gmail.com"
      },
      {
        "location": "Hubli",
        "contact_person": "Aadi",
        "designation": "jr.manager",
        "contact_number": "7689567465",
        "contact_email": "Aadi@eldersindia.com"
      }
    ],
    "website": "pacocha.biz",
    "email_domain": "hotmail.com",
    "limit_elders": 1,
    "document": [
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg",
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
    ],
    "logo": "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg",
    "status": true,
    "black_list": {
      "locations_id": [
        "981ab105-88dd-471d-8a3e-5941bd56955c"
      ],
      "offering_by_sps_id": null,
      "services_providers_id": null
    },
    "created_by": "0d930a0e-8e91-3fc2-9a69-8f75556425ea",
    "deleted_at": null,
    "created_at": "2023-02-15T07:11:53.000000Z",
    "updated_at": 1676445296
  },

  {
    "id": "2c7014e5-f7db-3980-ac30-13f4eac92c71",
    "name": {
      "en": faker.name.fullName(),
    },
    "headquarter": "Deli",
    "branches": [
      {
        "location": "Bengalur",
        "contact_person": "Akash",
        "designation": "Sr manager",
        "contact_number": "9876587493",
        "contact_email": "krish@gmail.com"
      },
      {
        "location": "Hubli",
        "contact_person": "Aadi",
        "designation": "jr.manager",
        "contact_number": "7689567465",
        "contact_email": "Aadi@eldersindia.com"
      }
    ],
    "website": "pacocha.biz",
    "email_domain": "hotmail.com",
    "limit_elders": 1,
    "document": [
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg",
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
    ],
    "logo":faker.image.avatar(),
    "status": true,
    "black_list": {
      "locations_id": [
        "981ab105-88dd-471d-8a3e-5941bd56955c"
      ],
      "offering_by_sps_id": null,
      "services_providers_id": null
    },
    "created_by": "0d930a0e-8e91-3fc2-9a69-8f75556425ea",
    "deleted_at": null,
    "created_at": "2023-02-15T07:11:53.000000Z",
    "updated_at": 1676445296
  },
  {
    "id": "2c7014e5-f7db-3980-ac30-13f4eac92c71",
    "name": {
      "en": faker.name.fullName(),
    },
    "headquarter": "Deli",
    "branches": [
      {
        "location": "Bengalur",
        "contact_person": "Akash",
        "designation": "Sr manager",
        "contact_number": "9876587493",
        "contact_email": "krish@gmail.com"
      },
      {
        "location": "Hubli",
        "contact_person": "Aadi",
        "designation": "jr.manager",
        "contact_number": "7689567465",
        "contact_email": "Aadi@eldersindia.com"
      }
    ],
    "website": "pacocha.biz",
    "email_domain": "hotmail.com",
    "limit_elders": 1,
    "document": [
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg",
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
    ],
    "logo":faker.image.avatar(),
    "status": true,
    "black_list": {
      "locations_id": [
        "981ab105-88dd-471d-8a3e-5941bd56955c"
      ],
      "offering_by_sps_id": null,
      "services_providers_id": null
    },
    "created_by": "0d930a0e-8e91-3fc2-9a69-8f75556425ea",
    "deleted_at": null,
    "created_at": "2023-02-15T07:11:53.000000Z",
    "updated_at": 1676445296
  },
  {
    "id": "2c7014e5-f7db-3980-ac30-13f4eac92c71",
    "name": {
      "en": faker.name.fullName(),
    },
    "headquarter": "Deli",
    "branches": [
      {
        "location": "Bengalur",
        "contact_person": "Akash",
        "designation": "Sr manager",
        "contact_number": "9876587493",
        "contact_email": "krish@gmail.com"
      },
      {
        "location": "Hubli",
        "contact_person": "Aadi",
        "designation": "jr.manager",
        "contact_number": "7689567465",
        "contact_email": "Aadi@eldersindia.com"
      }
    ],
    "website": "pacocha.biz",
    "email_domain": "hotmail.com",
    "limit_elders": 1,
    "document": [
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg",
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
    ],
    "logo":faker.image.avatar(),
    "status": true,
    "black_list": {
      "locations_id": [
        "981ab105-88dd-471d-8a3e-5941bd56955c"
      ],
      "offering_by_sps_id": null,
      "services_providers_id": null
    },
    "created_by": "0d930a0e-8e91-3fc2-9a69-8f75556425ea",
    "deleted_at": null,
    "created_at": "2023-02-15T07:11:53.000000Z",
    "updated_at": 1676445296
  },
  {
    "id": "2c7014e5-f7db-3980-ac30-13f4eac92c71",
    "name": {
      "en": faker.name.fullName(),
    },
    "headquarter": "Deli",
    "branches": [
      {
        "location": "Bengalur",
        "contact_person": "Akash",
        "designation": "Sr manager",
        "contact_number": "9876587493",
        "contact_email": "krish@gmail.com"
      },
      {
        "location": "Hubli",
        "contact_person": "Aadi",
        "designation": "jr.manager",
        "contact_number": "7689567465",
        "contact_email": "Aadi@eldersindia.com"
      }
    ],
    "website": "pacocha.biz",
    "email_domain": "hotmail.com",
    "limit_elders": 1,
    "document": [
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg",
      "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
    ],
    "logo":faker.image.avatar(),
    "status": true,
    "black_list": {
      "locations_id": [
        "981ab105-88dd-471d-8a3e-5941bd56955c"
      ],
      "offering_by_sps_id": null,
      "services_providers_id": null
    },
    "created_by": "0d930a0e-8e91-3fc2-9a69-8f75556425ea",
    "deleted_at": null,
    "created_at": "2023-02-15T07:11:53.000000Z",
    "updated_at": 1676445296
  }


]

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />
const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />
const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />
const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />
const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />



export default function Page() {
  const [corporatesdata, setCorporatesdata] = useState([])
  const [page = 1, setPage] = useState()
  const [sort, setSort] = useState('name-asc')
  const [search, setSearch] = useState('')
  const list = React.useRef(null)
  const { push } = useRouter()
  const theme = useTheme();
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const fetchCorporates = (page = 1, sort, search) => getCorporates(page, sort, search)

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: corporates,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['corporates', page, sort, search],
    queryFn: () => fetchCorporates(page, sort, search),
    onSuccess(data) {
      console.log('Called')
      let list = []
      console.log(data.data?.data?.data)
      data.data?.data?.data?.map((l, i) => {
        //console.log('againcalled')
        list.push({
          id: l.id,
          logo: l.logo,
          name: l.name['en'],
          link: `/admin/corporates/${l.id}/${l.name['en']}`,
          
        })

      })
      console.log('end')
      list.length > 0 && setCorporatesdata(corporatesdata.concat(list));
    },

  })
  console.log('last')
  console.log(JSON.stringify(corporatesdata));

  const onDelete = () => {
    setCorporatesdata(corporatesdata => corporatesdata.filter(item => !item.isSelected));
    setSelectedCount(0);
    console.log(setSelectedItems)
    console.log('checkbox item deleted')
  };
  const handleSelectAll = () => {
    setSelectedCount(corporatesdata.length);
    setCorporatesdata(corporatesdata => corporatesdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };
  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setCorporatesdata(corporatesdata => corporatesdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };
  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setCorporatesdata(corporatesdata => corporatesdata.map((item) => {
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

    <Card
      onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
      onLongPress={() => handelSection(item.id, item.isSelected)}
      style={{
        backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
        marginBottom: 4,
      }}
    >
      <MotiView style={{flexDirection:"row"}}>
        <Image
          // src="https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
          source={{uri: `${item.logo}`}}
          alt="A cool artist's image."
          style={{ borderRadius: 12, width: 50, height: 50 }}
        />
        <>
          <Text category='s1' style={{marginLeft: 8, justifyContent:"center", alignSelf:"center"}}>
            {`${item.name}`}
          </Text>
        </>

      </MotiView>

    </Card>
  ), [selectedCount]);

  if (isLoading) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </Layout>
  }

  if (isError) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Divider />

      <Text category='s1' status="danger" style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get service provider.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()} accessoryLeft={
        <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
  }




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

          <Input size='medium' placeholder='Search your Service Providers' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }

      {isSuccess &&
        <List
          ref={list}
          data={corporatesdata}
          renderItem={renderNewItem}
        />
      }

    </Layout>
  )
}
