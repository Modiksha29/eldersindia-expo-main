import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { ImageProps } from 'react-native'
import { Layout, Button, Icon, Text, Input, Spinner, List, ListItem, Divider, useTheme, IconProps, IconElement } from '@ui-kitten/components'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { SheetManager } from 'react-native-actions-sheet'
import { useQuery, useMutation } from '@tanstack/react-query'
import getLocations, { destroyLocation } from 'apis/admin/data-center/locations'
import { useMMKVListener } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import { Swipeable, FlatList, RectButton, ActionText } from 'react-native-gesture-handler';
// import RightButtonsHandler from 'react-native-gesture-handler';

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />
const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />
const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash-2-outline' width={32} heigth={32} />
const CityIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name="city-variant-outline" pack="material-community" />
const SelectedIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name="checkmark-square-2-outline"/>

export default function Page(navigate) {
  const [page, setPage] = React.useState(1)
  const list = React.useRef(null)
  const [sort, setSort] = React.useState('name-asc')
  const [search, setSearch] = React.useState('')
  const [tier, setTier] = React.useState('1,2,3')
  const [cities, setCities] = React.useState([])
  const [fromDate, setFromDate] = React.useState(undefined)
  const [toDate, setToDate] = React.useState(undefined)
  const theme = useTheme()
  const { push, replace, back } = useRouter()
  const { showActionSheetWithOptions } = useActionSheet()
  const fetchLocations = (page, sort, search) => getLocations(page, sort, search, tier, fromDate, toDate)

  let row: Array<any> = [];
  let prevOpenedRow;

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: locations,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['locations', page, sort, search],
    queryFn: () => fetchLocations(page, sort, search),
    onSuccess(data) {
      let list = []
      data.data?.data?.data?.marp((l, i) => {
        list.push({
          id: l.id,
          name: l.name['en'],
          description: `Tier ${l.tier} | Status: ${l?.is_active ? 'Active': 'Inactive'} | Updated on: ${new Date(l.updated_at * 1000)?.toLocaleString()}`,
          tier: l.tier,
          link: `/admin/data-center/locations/${l.id}/${l.name['en']}`,
          created_at: new Date(l.created_at),
          updated_at: new Date(l.updated_at * 1000),
          backgroundColor: l?.isSelected ? theme['color-success-100'] : theme[`background-basic-color-${l.is_active ? 1 : 2}`],
          accessoryLeft: l?.isSelected ? <SelectedIcon color={theme['color-success-default']} /> : <CityIcon color={theme['color-primary-default']} />,
          isDeleted: false,
          isSelected: false,
        })
      })
      list.length > 0 && setCities(cities.concat(list));
    },
  })

  const {
    mutate: deleteMutate } = useMutation({
      mutationFn: (deleteLocationId: string) => destroyLocation(deleteLocationId),
      onSuccess(data) {
        const deletedLocation = data?.data?.data;
        setCities(cities.filter(c => c.id !== deletedLocation.id))
      },
      onError(error, variables, context) {
        const id = error?.response?.data?.data?.id;
        setCities(cities.map(c => {
          if(c.id === id) {
            return {
              ...c,
              isDeleted: false,
            }
          }
          return c
        }))
        console.log(id, row[id])
        row[id].close()
        alert("Couldn't delete the location.")
      }
    })

  const openSheet = () => {
    const options = ['Delete', 'Inactive', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex: number) => {
      switch (selectedIndex) {
        case 1:
          //Delete
          break;

        case destructiveButtonIndex:
          // Inactive
          break;

        case cancelButtonIndex:
        // Canceled
      }
    });
  }

  const LeftSwipeActions = () => {
    return (
      <MotiView
        style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            // paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Make Inactive
        </Text>
      </MotiView>
    );
  };
  const RightSwipeActions = () => {
    return (
      <MotiView
        style={{
          flex: 1,
          backgroundColor: theme['color-danger-default'],
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Button appearance='ghost' accessoryLeft={<DeleteIcon appearance="ghost" color={theme['color-basic-100']} />}></Button>
      </MotiView>
    );
  };
  const swipeFromLeftOpen = () => {

  };
  const swipeFromRightOpen = (id: string, index: number) => {
    deleteMutate(id);
  };

  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const renderItem = React.useCallback(({ item, index }) => (
        <Swipeable
          ref={ref => row[item.id] = ref}
          // renderLeftActions={LeftSwipeActions}
          renderRightActions={RightSwipeActions}
          onSwipeableRightOpen={() => swipeFromRightOpen(item.id, index)}
          rightThreshold={400}
          overshootRight={false}
          friction={1.1}
        // onSwipeableLeftOpen={swipeFromLeftOpen}
        >
          <ListItem
            style={{ backgroundColor: item.backgroundColor, height: 60 }}
            key={item.id}
            title={`${item.name}`}
            description={item?.description}
            accessoryLeft={item.accessoryLeft}
            onPress={() => push(`${item.link}`)}
            onLongPress={openSheet}
          />
        </Swipeable>
      ), []);

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
    setCities([]);
    setPage(1);
  }, [sort, search])

  useMMKVListener((key) => {
    if (key === 'location') {
      const location = JSON.parse(storage.getString(key))
      setCities(cities.map(c => {
        if (c.id === location.id) {
          return {
            ...c,
            ...location,
            backgroundColor: theme[`background-basic-color-${location.is_active ? 1 : 2}`]
          }
        }
        return c
      }))
    }
  }, storage)

  if (isLoading) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </Layout>
  }

  if (isError) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Divider />

      <Text category='s1' status="danger" style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get locations.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()} accessoryLeft={<RetryIcon color={theme['color-primary-default']} />}>Retry</Button>
    </Layout>
  }

  return (
    <Layout level='1' style={{ flex: 1 }}>
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
        <Button status='basic' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-basic-600'] }]} name='ios-filter-outline' pack='ionicons'
            />}
            onPress={()=>push('/admin/(filters)/location-filters')}
            >Filter</Button>
      </MotiView>
      <Divider />

      <Input size='medium' placeholder='Search a location' value={search} onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

      <Divider />

      {isSuccess && <FlatList
        ref={list}
        data={cities}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Divider}
        onEndReached={() => {
          locations?.data?.data?.total - 1 > cities.length ? setPage(page + 1) : ''
        }}
        onEndReachedThreshold={.3}
        initialNumToRender={10}
        windowSize={15}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={20}
        removeClippedSubviews={false}
        ListEmptyComponent={<Text category='s1' status='primary' style={{ textAlign: 'center', margin: 8 }}>No locations found</Text>}
        // ListHeaderComponent={locations?.data?.data?.current_page === locations?.data?.data?.last_page ?
        //   (<Button onPress={() => list?.current.scrollToIndex({ animate: true, index: cities.length - 1 })} appearance="ghost" status='primary' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='arrowhead-down-outline'
        //   />}>{`Go to last`}</Button>
        //   ) : <></>}
        ListFooterComponent={locations?.data?.data?.current_page === locations?.data?.data?.last_page && cities.length > 0 ?
          (<Button onPress={() => list?.current.scrollToIndex({ animate: true, index: 0 })} appearance="outline" status='primary' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='arrowhead-up-outline'
          />}>{`That's all we have! Go to top`}</Button>
          ) : <></>}
      />}

      {isFetching && (
        <Text appearance='hint' status='primary' style={{ textAlign: 'center', margin: 8 }}>Loading more...</Text>
      )}

    </Layout>
  )
}