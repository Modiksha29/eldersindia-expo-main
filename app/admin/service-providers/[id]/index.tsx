import React, { useState } from 'react'
import { MotiView } from 'moti'
import { useRouter } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, Card, ListItem, Input, useTheme, Divider, IconProps, IconElement } from '@ui-kitten/components'
import { useQuery, } from '@tanstack/react-query'
import getServiceProviders from 'apis/admin/service-provider'
import { SheetManager } from 'react-native-actions-sheet'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { faker } from '@faker-js/faker';

const data =[
  {"id":"cf65ca3d-6929-372f-823c-1d91791cb0f1","logo":faker.image.business(),"name":faker.name.fullName(),"headquarter":"Oregon","spoc":"Nigel Gottlieb","website":"http://www.fisher.com/debitis-ipsum-aut-qui-et-aliquam.html","address":"India","status":true,"about":"Maiores eveniet maxime beatae voluptatem facilis quia.","term_condition":"Sapiente veniam blanditiis magni voluptatem dolorum eius.","link":"/admin/service-providers/view/cf65ca3d-6929-372f-823c-1d91791cb0f1/Althea Kulas I","backgroundColor":"#F7F9FC"},

{"id":"240d00f3-23ff-38b5-9f03-f515e817f05a","logo":"https://via.placeholder.com/150x150.jpg/CCCCCC?text=animals+dogs+repellat","name":faker.name.fullName(),"headquarter":"Rhode Island","spoc":"Electa Turcotte","website":"http://www.kerluke.com/","address":"India","status":true,"about":"Aut nemo sit odit.","term_condition":"Itaque possimus non sed rerum eum est eligendi.","link":"/admin/service-providers/view/240d00f3-23ff-38b5-9f03-f515e817f05a/Jean Bauch","backgroundColor":"#F7F9FC"},

{"id":"415fe1a3-012f-3086-8a92-bd14f330c0cd","logo":faker.image.avatar(),"name":faker.name.fullName(),"headquarter":"Wyoming","spoc":"Miss Delilah Stehr DVM","website":"http://deckow.com/possimus-in-eum-porro-iusto-sed-adipisci-qui.html","address":"India","status":true,"about":"Voluptatem alias autem voluptatem vel voluptate in.","term_condition":"Esse itaque aut nisi.","link":"/admin/service-providers/view/415fe1a3-012f-3086-8a92-bd14f330c0cd/Ms. Theodora Balistreri III","backgroundColor":"#F7F9FC"},

{"id":"42051728-9a65-3bf2-8d25-2eb80535d980","logo":faker.image.people(),"name":faker.name.fullName(),"headquarter":"Oregon","spoc":"Dr. Easter Batz DDS","website":"http://king.com/necessitatibus-nemo-aut-recusandae.html","address":"India","status":true,"about":"Libero est eveniet odio tempore ducimus.","term_condition":"Illo quo facere at distinctio soluta tempora optio.","link":"/admin/service-providers/view/42051728-9a65-3bf2-8d25-2eb80535d980/Prof. Diana Johns","backgroundColor":"#F7F9FC"},

{"id":"981837be-2b0c-43d3-9e43-ec95f02259bb","logo":faker.image.image(),"name":faker.name.fullName(),"headquarter":"Bengalur","spoc":"Amruth","website":"serviceprovider.com","address":"india","status":true,"about":"sdnmsbd jnbndbns jdfhkd dsdsjj jdfjdj","term_condition":"hsjdhfjhf djfkjdskf dskfjkdjf kdsjkfj","link":"/admin/service-providers/view/981837be-2b0c-43d3-9e43-ec95f02259bb/service provider","backgroundColor":"#F7F9FC"},

{"id":"97f66db5-f0fe-44df-9ab6-aefe93c834f9","logo":faker.image.abstract(),"name":faker.name.fullName(),"headquarter":"Bengalur","spoc":"Amruth","website":"serviceprovider.com","address":"india","status":true,"about":"sdnmsbd jnbndbns jdfhkd dsdsjj jdfjdj","term_condition":"hsjdhfjhf djfkjdskf dskfjkdjf kdsjkfj","link":"/admin/service-providers/view/97f66db5-f0fe-44df-9ab6-aefe93c834f9/service provider 1","backgroundColor":"#F7F9FC"},

{"id":"cf65ca3d-6929-372f-823c-1d91791cb0f1","logo":faker.image.business(),"name":faker.name.fullName(),"headquarter":"Oregon","spoc":"Nigel Gottlieb","website":"http://www.fisher.com/debitis-ipsum-aut-qui-et-aliquam.html","address":"India","status":true,"about":"Maiores eveniet maxime beatae voluptatem facilis quia.","term_condition":"Sapiente veniam blanditiis magni voluptatem dolorum eius.","link":"/admin/service-providers/view/cf65ca3d-6929-372f-823c-1d91791cb0f1/Althea Kulas I","backgroundColor":"#F7F9FC"},


]

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />
const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />
const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />
const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />
const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />

export default function Page() {
  const [serviceProvidersdata, setServiceProvidersdata] = useState([])
  const [page = 1, setPage] = useState()
  const [sort = 'name-asc', setSort] = useState()
  const [search = '', setSearch] = useState()
  const list = React.useRef(null)
  const { push } = useRouter()
  const theme = useTheme();
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const fetchServiceProviders = (page = 1, sort, search) => getServiceProviders(page, sort, search)

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: serviceProviders,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['serviceProviders', page, sort, search],
    queryFn: () => fetchServiceProviders(page, sort, search),
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
          headquarter: l.headquarter,
          spoc: l.spoc,
          // branches:l.branches,
          website: l.website,
          address: l.address?.country,
          // banner:l.banner,
          status: l.status,
          about: l.about,
          term_condition: l.term_condition,
          link: `/admin/service-providers/${l.id}/${l.name['en']}`,
          backgroundColor: theme[`background-basic-color-${l.is_active ? 1 : 2}`],
          iconLeft: (props) => (<Icon {...props} style={[props.style,
          { tintColor: theme['color-primary-400'] }]} name="news-variant-outline" pack="material-community"
          />)
        })

      })
      console.log('end')
      list.length > 0 && setServiceProvidersdata(serviceProvidersdata.concat(list));
    },

  })
  console.log('last')
  console.log(JSON.stringify(serviceProvidersdata));

  const onDelete = () => {
    setServiceProvidersdata(serviceProvidersdata => serviceProvidersdata.filter(item => !item.isSelected));
    setSelectedCount(0);
    console.log(setSelectedItems)
    console.log('checkbox item deleted')
  };
  const handleSelectAll = () => {
    setSelectedCount(serviceProvidersdata.length);
    setServiceProvidersdata(serviceProvidersdata => serviceProvidersdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };
  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setServiceProvidersdata(serviceProvidersdata => serviceProvidersdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };
  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setServiceProvidersdata(serviceProvidersdata => serviceProvidersdata.map((item) => {
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
          // source={faker.image.business()}
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
          data={serviceProvidersdata}
          renderItem={renderNewItem}
        />
      }

    </Layout>
  )
}
