import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar } from '@ui-kitten/components'
import { useQuery, } from '@tanstack/react-query'
import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import getSupportTicket from 'apis/corporate/support-tickets'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
// import { Reaction } from './components/reaction'
import { faker } from '@faker-js/faker';

const data =[
  {id: 1,issue_title: {"en":"booking ticket" },logo:faker.image.business() ,},
  {id: 2,issue_title: {"en":"non-booking ticket"},logo: faker.image.business(),},
  {id: 3,issue_title: {"en":"booking ticket"},logo: faker.image.business(),},
  {id: 4,issue_title:{"en": "non-booking ticket"},logo: faker.image.business(),},
  {id: 5,issue_title:{"en": "booking ticket"},logo: faker.image.business(),},
  {id: 6,issue_title: {"en":"non-booking ticket"},logo: faker.image.business(),},
]

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />
const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />
const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />
const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />
const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />


export default function Page() {
  
  const { push } = useRouter()
  const fetchSupportTicket = (page = 1, sort, search) => getSupportTicket(page, sort, search)
  const [page = 1, setPage] = useState();
  const [sort = 'issue_title-desc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [supportTicketdata, setSupportTicketData] = useState([])
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
    // enabled: false,
    queryKey: ['supportTicket', page, sort, search],
    queryFn: () => fetchSupportTicket(page, sort, search),
    onSuccess(data) {
      console.log('Called')
      let list = []
      data.data?.data?.data?.map((l, i) => {
        console.log('inside')
        list.push({
          id: l.id,
          issue_title: l.issue_title,
          issue_description: l.issue_description,          
          link: `/corporate/support-tickets/${l.id}/${l.issue_title['en']}`,
        })
      })
      list.length > 0 && setSupportTicketData(supportTicketdata.concat(list));
    },
  })
  console.log(JSON.stringify(supportTicketdata));

  const onDelete = () => {
    setSupportTicketData(supportTicketdata => supportTicketdata.filter(item => !item.isSelected));
    setSelectedCount(0);
    console.log(setSelectedItems)
    console.log('checkbox item deleted')
  };
  const handleSelectAll = () => {
    setSelectedCount(supportTicketdata.length);
    setSupportTicketData(supportTicketdata => supportTicketdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };
  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setSupportTicketData(supportTicketdata => supportTicketdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };
  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setSupportTicketData(supportTicketdata => supportTicketdata.map((item) => {
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
          sourec={{uri: "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg", width: 50, height: 50 }}
          // src={`${item.logo}`}
          // src={faker.image.business()}
          alt="A cool artist's image."
          style={{ borderRadius: 12, }}
        />
        <>
          <Text category='s1' style={{marginLeft: 8, justifyContent:"center", alignSelf:"center"}}>
            {`${item.issue_title?.en}`}
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

      <Text category='s1' status="danger" style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get support ticket.</Text>
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
          data={supportTicketdata}
          renderItem={renderNewItem}
        />
      }

    </Layout>
  )
}
