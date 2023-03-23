import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar } from '@ui-kitten/components'
import { useQuery, } from '@tanstack/react-query'
import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import getEvents from 'apis/corporate/events'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Reaction } from 'components/corporate/events/reaction'
import { faker } from '@faker-js/faker';

const TagsIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='pricetags-outline' width={32} heigth={32} />

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />

const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />

// const HeartIcon = (props: IconProps): IconElement<ImageProps> => <Icon{...props} color={props.isFilled ? ['color-danger-500'] : ['color-basic-700']} style={[props.style, { tintColor: props.color }]} name={props.isFilled ? 'heart' : 'heart-outline'} width={28}
//   height={28} />

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />

const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />

const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />

const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />

const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />


export default function Page() {

  const { push } = useRouter()
  const fetchEvents = (page = 1, sort, search) => getEvents(page, sort, search)
  const [page = 1, setPage] = useState();
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
      let list = []
      data.data?.data?.data?.map((l, i) => {
        list.push({
          id: l.id,
          title: l.title,
          content: l.content,
          image: l.image,
          tags: l.tags,
          link: `/corporate/events/${l.title['en']}?id=${l.id}&name=${l.title['en']}`
        })
      })
      list.length > 0 && setEventsData(eventsdata.concat(list));
      
    },
  })

  const onDelete = () => {
    setEventsData(eventsdata => eventsdata.filter(item => !item.isSelected));
    setSelectedCount(0);
  };

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
  const optimizedFn = React.useCallback(debounce(handleSearch), []);


  const handleReaction = () => {
    console.log("Reacted")
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
            <Text category='p2'>{faker.address.cityName()}</Text>
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

          <Input size='medium' placeholder='Search a events' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }

      <List
        ref={list}
        data={eventsdata}
        renderItem={renderNewItem}
      />

    </Layout>
  )
}
