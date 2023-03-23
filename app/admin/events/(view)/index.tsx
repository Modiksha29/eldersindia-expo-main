import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, IndexPath } from '@ui-kitten/components'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
// import { storage } from 'provider/storageProvider'
import getAllEvents,{destroyEvents} from 'apis/admin/events'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Reaction } from 'components/admin/events/reaction'
import { Bookmark } from 'components/admin/events/bookmark'
import ErrorImage from 'assets/images/Error404.png'

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />

const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />

const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />

const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />

const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />



export default function Page() {

  const { push } = useRouter()
  const fetchEvents = (page = 1, sort, search) => getAllEvents(page, sort, search)
  // const [page = 1, setPage] = useState();
  const [page, setPage] = React.useState(1)
  const [sort = 'title-asc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [eventsdata, setEventsData] = useState([])
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
    data: events,
    isFetching,
    refetch
  } = useQuery({
    // enabled: true,
    queryKey: ['events', page, sort, search],
    queryFn: () => fetchEvents(page, sort, search),
    onSuccess(data) {
      // console.log('Called')
      let list = []
      data.data?.data?.data?.map((l, i) => {
        // console.log('inside')
        list.push({
          id: l.id,
          title: l.title,
          content: l.content,
          image: l.image,
          tags: l.tags,
          location: l.location,
          link: `/admin/events/${l.title['en']}?id=${l.id}&name=${l.title['en']}`,
        })
      })
      list.length > 0 && setEventsData(eventsdata.concat(list));
      
    },
  })
  // console.log(JSON.stringify(eventsdata));

  const eventsDeleteMutation = useMutation(destroyEvents, {
    onSuccess: (data, variables) => {
      // console.log('API response data:', data);
      const { id } = data?.data?.data;
      // console.log('Extracted ID:', id);

      const events = {
        id,
      }
    },
    onError(error, variables, context) {
      const errors = error?.response?.data?.errors
      Object.keys(errors).map((key, i) => {
        errors[key].map(e => {
          setError(key, { type: 'custom', message: e })
        })
      })
    },
  })

  const handleSelectAll = () => {
    setSelectedCount(eventsdata.length);
    setEventsData(eventsdata => eventsdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };

  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setEventsData(eventsdata => eventsdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };

  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setEventsData(eventsdata => eventsdata.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        }
      }
      return item
    }))

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

  const handleEventDelete = async () => {
    try {
      let ids = '';
      eventsdata.map(b => {
        if(b.isSelected) {
          ids = `${ids}, ${b.id}`
        }
      })
      
      eventsDeleteMutation.mutate(ids);
      console.log('Events deleted successfully');
    } catch (error) {
      console.error(error);
    }
  }
  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const optimizedFn = React.useCallback(debounce(handleSearch), []);

  const handleReaction = () => {
    // console.log("Reacted")
  }

  const renderNewItem = React.useCallback(({ item, index }) => (
    <Card
      onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
      onLongPress={() => handelSection(item.id, item.isSelected)}
      // onPress={item.link}
      style={{
        backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
        marginBottom: 4,
      }}
    >
      <MotiView style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Icon
          style={{ width: 48, height: 48, marginRight: 16, tintColor: theme['color-warning-500'] }}
          fill={theme['color-warning-500']}
          name={'ios-calendar-outline'}
          pack={'ionicons'}
        />
        <MotiView style={{ flexDirection: 'column', flex: 1 }}>
          <Text category='s1' style={{ marginBottom: 4 }}>
            {`${item.title.en}`}

            </Text>
          <Text category='p2'>Sun, Oct 1, 2023</Text>
          <MotiView style={{ flexDirection: 'row' , justifyContent: 'space-between', marginTop:8}}>
            <MotiView style={{ flexDirection: 'row'}}>
            <Icon
              style={{ width: 12, height: 12, marginRight: 4, tintColor: theme['color-warning-500'] }}
              fill={theme['color-warning-500']}
              name={'ios-location-outline'}
              pack={'ionicons'}
            />
            <Text category='p2'>{item.location}</Text>
            </MotiView>
            <Text category='p2' >100 participants</Text>
          </MotiView>
        </MotiView>

      </MotiView>

    </Card>
  ), [selectedCount]);


  React.useEffect(() => {
    setEventsData([]);
    setPage(1);
  }, [sort, search])

  if (isLoading) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </Layout>
  }

  if (isError) {
    return <Layout level='1' style={{ flex: 1 , justifyContent:'center', alignItems: 'center',}}>
      <Divider />

      <MotiView style={{ justifyContent:'center', alignItems: 'center', }}>
        <Image
          source={ErrorImage}
          alt="A cool artist's image."
          style={{ borderRadius: 1, width: 300, height: 200 }}
        />
      </MotiView>
      <Text category='h6' status="success" style={{ textAlign: 'center', marginVertical: 8 }}>Oops something went wrong...</Text>
      <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get events.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()}
      style={{width:"50%"}} accessoryLeft={
        <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
  }

  return (
    <Layout style={{ backgroundColor: theme[`color-basic-200`], marginBottom:"25%" }}>

      {/* ---If Selected ? Action Button Section : Show Sort, Filter and Search Section------------------------ */}
      {selectedCount > 0
        ?
        <MotiView style={{ flexDirection: 'row', alignSelf: "flex-end" }} >
          {selectedCount > 0 && (
            <Button onPress={() => handleEventDelete()}
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
            <Button status='basic' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-basic-600'] }]} name='ios-filter-outline' pack='ionicons'
            />}
            onPress={()=>push('/admin/(filters)/location-filters')}
            >Filter</Button>

          </MotiView>

          <Divider />

          {/* Search Section */}

          <Input size='medium' placeholder='Search a events' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }

      <List
        ref={list}
        data={eventsdata}
        renderItem={renderNewItem}
        keyExtractor={keyExtractor}
        onEndReached={() => {
          events?.data?.data?.total - 1 > eventsdata.length ? setPage(page + 1) : ''
        }}
        onEndReachedThreshold={.3}
        initialNumToRender={10}
        windowSize={15}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={20}
        removeClippedSubviews={false}
        ListEmptyComponent={<Text category='s1' status='primary' style={{ textAlign: 'center', margin: 8 }}>No events found</Text>}
        ListFooterComponent={events?.data?.data?.current_page === events?.data?.data?.last_page && eventsdata.length > 0 ?
          (<Button onPress={() => list?.current.scrollToIndex({ animate: true, index: 0 })} appearance="outline" status='primary' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='arrowhead-up-outline'
          />}>{`That's all we have! Go to top`}</Button>
          ) : <></>}
      />
      {isFetching && (
        <Text appearance='hint' status='primary' style={{ textAlign: 'center', margin: 8 }}>Loading more...</Text>
      )}

    </Layout>
  )
}
