import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar } from '@ui-kitten/components'
import { useQuery, } from '@tanstack/react-query'
import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import getPromocodes from 'apis/admin/promo-codes'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
// import { Reaction } from './components/reaction'

const data =[
  {"id":"985ed812-894c-4910-b7b6-27a0b160b3aa","code":"ITMQ-DK14","details":{"discount_type":"flat","discount":30,"value":600,"min_amount":1000,"max_amount":5000,"applicable_service_provider":["981837be-2b0c-43d3-9e43-ec95f02259bb","97f66db5-f0fe-44df-9ab6-aefe93c834f9"],"applicable_offerrings":["97f66d99-1fc3-4b50-ba57-041ecbe1ed6b","981890ef-6b78-4042-b14b-109a93cc4069"],"applicable_corporate":null},"link":"/admin/promo-codes/view/985ed812-894c-4910-b7b6-27a0b160b3aa/ITMQ-DK14","backgroundColor":"#F7F9FC"},


{"id":"985e9a9b-0e3c-47ce-8348-91c018c06301","code":"O1BZ-1HJ2","details":{"discount_type":"flat","discount":30,"value":600,"min_amount":1000,"max_amount":5000,"applicable_service_provider":["981837be-2b0c-43d3-9e43-ec95f02259bb","97f66db5-f0fe-44df-9ab6-aefe93c834f9"],"applicable_offerrings":["97f66d99-1fc3-4b50-ba57-041ecbe1ed6b","981890ef-6b78-4042-b14b-109a93cc4069"],"applicable_corporate":[[]]},"link":"/admin/promo-codes/view/985e9a9b-0e3c-47ce-8348-91c018c06301/O1BZ-1HJ2","backgroundColor":"#F7F9FC"},


{"id":"9816312c-d564-41a7-8bf4-23fa285591ba","code":"W2AA-UAS6","details":{"discount_type":"percentage","discount":30,"value":600,"min_amount":1000,"max_amount":5000,"applicable_service_provider":null,"applicable_offerrings":null,"applicable_corporate":null},"link":"/admin/promo-codes/view/9816312c-d564-41a7-8bf4-23fa285591ba/W2AA-UAS6","backgroundColor":"#F7F9FC"}
]
const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />

const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />

const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />

const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />

const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />


export default function Page() {
  const { push } = useRouter()
  const fetchPromocodesdata = (page = 1, sort, search) => getPromocodes(page, sort, search)
  const [page = 1, setPage] = useState();
  const [sort = 'updated_at', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [promocodesdata, setPromocodesData] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  const list = React.useRef(null)
  const pulseIconRef = React.useRef();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [count, setCount] = useState(0);

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: promocodes,
    isFetching,
    refetch
  } = useQuery({
    // enabled: true,
    queryKey: ['promocodes', page, sort, search],
    queryFn: () => fetchPromocodesdata(page, sort, search),
    onSuccess(data) {
      let list = []
      data.data?.data?.data?.map((l, i) => {
        console.log('inside')
        list.push({
          id: l.id,
          code: l.code,
          details: l.details,
          link: `/admin/promo-codes/${l.code}?id=${l.id}&name=${l.code}`,
          backgroundColor: theme[`background-basic-color-${l.is_active ? 1 : 2}`],
          iconLeft: (props) => (<Icon {...props} style={[props.style,
          { tintColor: theme['color-primary-400'] }]} name="promocode-variant-outline" pack="material-community"
          />)
        })
      })
      list.length > 0 && setPromocodesData(promocodesdata.concat(list));
    },
  })
  const onDelete = () => {
    setPromocodesData(promocodesdata => promocodesdata.filter(item => !item.isSelected));
    setSelectedCount(0);
  };

  const handleSelectAll = () => {
    setSelectedCount(promocodesdata.length);
    setPromocodesData(promocodesdata => promocodesdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };

  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setPromocodesData(promocodesdata => promocodesdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };

  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setPromocodesData(promocodesdata => promocodesdata.map((item) => {
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

  React.useEffect(() => {
    setPromocodesData([]);
    setPage(1);
  }, [sort, search])

  const handleReaction = () => {
    console.log("Reacted")
  }

  const renderNewItem = React.useCallback(({ item, index }) => (
    <Card
      onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
      onLongPress={() => handelSection(item.id, item.isSelected)}
      style={{
        backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
        marginBottom: 4,flex:1
      }}
    >
      <MotiView style={{ flexDirection: 'row', flex:20 }}>
        <Icon
        style={{ marginRight:8,width: 24, height: 24 ,tintColor: theme['color-warning-500'] }}
        fill={theme['color-succes-500']}
        name={'gift-outline'}
        pack={'ionicons'}
      />
        <MotiView style={{ flexDirection: "row",flex:80, justifyContent:'space-between'  }}>

          <Text category='s1' style={{ marginTop: 8 }}> {`${item.code}`}</Text>
          <Text category='s2' style={{ marginTop: 8, marginLeft:30}}> {`${item.details?.discount_type}`}</Text>
          <Text category='s2' style={{ marginTop: 8, color: 'green' }}> {`${item.details?.value}`} </Text>
        </MotiView>
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

      <Text category='s1' status="danger" style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get promocode.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()} accessoryLeft={
        <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
  }


  return (
    <Layout level='1' style={{ flex: 1, padding: 8 }}>
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

          <Input size='medium' placeholder='Search a promocode' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }
      {isSuccess && <List
        ref={list}
        data={promocodesdata}
        renderItem={renderNewItem}
      />
      }

    </Layout>
  )
}
