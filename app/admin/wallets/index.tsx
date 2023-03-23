import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, RangeDatepicker } from '@ui-kitten/components'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { faker } from '@faker-js/faker';
import getWallets from 'apis/admin/wallets'
import { useQuery, } from '@tanstack/react-query'

const WalletIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='book-outline' width={32} heigth={32} />
const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />

const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />

const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />

const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />

const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />



export default function Page() {
  const { push, replace, back, } = useRouter()
  const theme = useTheme();
  const [page = 1, setPage] = useState();
  const [sort = 'name', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [selectedCount, setSelectedCount] = useState(0);
  const [walletsdata, setWalletsData] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [range, setRange] = React.useState({});
  const fetchWallets = (page = 1, sort, search) => getWallets(page, sort, search)

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: wallets,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['wallets', page, sort, search],
    queryFn: () => fetchWallets(page, sort, search),
    onSuccess(data) {
      console.log('Called')
      let list = []
      console.log(data.data?.data?.data)
      data.data?.data?.data?.map((l, i) => {
        //console.log('againcalled')
        list.push({
          id: l.id,
          name: l.name,
          amount: l.amount,
          link: `/admin/wallets/${l.name['en']}?id=${l.id}&name=${l.name['en']}`,
          backgroundColor: theme[`background-basic-color-${l.is_active ? 1 : 2}`],
          iconLeft: (props) => (<Icon {...props} style={[props.style,
          { tintColor: theme['color-primary-400'] }]} name="news-variant-outline" pack="material-community"
          />)
        })

      })
      console.log('end')
      list.length > 0 && setWalletsData(walletsdata.concat(list));
    },

  })
  console.log('last')
  console.log(JSON.stringify(walletsdata));

  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setWalletsData(walletsdata => walletsdata.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        }
      }
      return item
    }))

  };

  const onDelete = () => {
    setWalletsData(eventsdata => eventsdata.filter(item => !item.isSelected));
    setSelectedCount(0);
    console.log(setSelectedItems)
    console.log('checkbox item deleted')
  };

  const handleSelectAll = () => {
    setSelectedCount(walletsdata.length);
    setWalletsData(eventsdata => eventsdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };

  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setWalletsData(eventsdata => eventsdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };


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
    <MotiView style={{flex:1}}>
      <Card
      onPress={() => push(`/admin/wallets/${item.id}/${item.name}`)}>

      <MotiView style={{ flexDirection: 'row', flex:20 }}>
      <Image
          source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlkYLhNz0MKKOvfkMAIiKeWm7uGK1KEfmgg&usqp=CAU", width: 30, height: 30}}
          alt="A cool artist's image."
          style={{ shadowColor:'red' }}
        />
      
        <MotiView style={{ flexDirection: "row",flex:80, justifyContent:'space-between', marginLeft:8 }}>

          <Text category='s1' style={{ marginTop: 8 }}> 
          {/* {faker.name.fullName()} */}
          {item.name}
          </Text>
          {/* <Text category='s2' style={{ marginTop: 8, marginLeft:30}}> {`${item.details?.discount_type}`}</Text> */}
          <Text category='s2' style={{ marginTop: 8, color: 'green' }}> 
          {item.amount} 
          </Text>
        </MotiView>
      </MotiView>
    </Card></MotiView>

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
        data={walletsdata}
        renderItem={renderNewItem}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  )
}