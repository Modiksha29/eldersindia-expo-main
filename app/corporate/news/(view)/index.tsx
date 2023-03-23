import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar } from '@ui-kitten/components'
import { useQuery, } from '@tanstack/react-query'
import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import getNews from 'apis/admin/news'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Reaction } from 'components/admin/news/reaction'
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

const placements = ['top'];

export default function Page() {

  const { push } = useRouter()
  const fetchNews = (page = 1, sort, search) => getNews(page, sort, search)
  const [page = 1, setPage] = useState();
  const [sort = 'title-asc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [newsdata, setNewsData] = useState([])
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
    data: news,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['news', page, sort, search],
    queryFn: () => fetchNews(page, sort, search),
    onSuccess(data) {
      console.log('Called')
      let list = []
      data.data?.data?.data?.map((l, i) => {
        console.log('inside')
        list.push({
          id: l.id,
          title: l.title,
          content: l.content,
          isSelected: false,
          image: l.image,
          tags: l.tags,
          link: `/admin/news/${l.title['en']}?id=${l.id}&name=${l.title['en']}}`,
          backgroundColor: theme[`background-basic-color-${l.is_active ? 1 : 2}`],
          iconLeft: (props) => (<Icon {...props} style={[props.style,
          { tintColor: theme['color-primary-400'] }]} name="news-variant-outline" pack="material-community"
          />)
        })
      })
      list.length > 0 && setNewsData(newsdata.concat(list));
    },
  })

  const onDelete = () => {
    setNewsData(newsdata => newsdata.filter(item => !item.isSelected));
    setSelectedCount(0);
    console.log(setSelectedItems)
    console.log('checkbox item deleted')
  };

  const handleSelectAll = () => {
    setSelectedCount(newsdata.length);
    setNewsData(newsdata => newsdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };

  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setNewsData(newsdata => newsdata.map(item => ({
      ...item,
      isSelected: false,
    })));
  };

  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

    setNewsData(newsdata => newsdata.map((item) => {
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
    setNewsData([]);
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
        marginBottom:4,
      }}
    >
      <MotiView 
      style={{ flexDirection: "column", flex: 0 }}
      >
        <Image
          // src="https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
          // src={faker.image.business()}
          source={{uri: item.image}}
          alt="A cool artist's image."
          style={{ borderRadius: 12, width:"100%", height:200}}
        />

        <MotiView>
          <ListItem
            style={{ margin: 0, borderRadius: 12 }}
            onPress={() => push(item.link)}
            key={item.id}
            title={
              <React.Fragment>
              <Text onPress={() => push(item.link)} category='h5'>
                {`${item.title?.en}`}
              </Text>
              </React.Fragment>
            }
            description={
              <React.Fragment>
                <Text style={{ color: theme['color-basic-600'], marginTop: 4 }} onPress={() => push(item.link)} category='s1'>
                  {`${item.content?.en}`}
                </Text>
                
                <TouchableOpacity onPress={() => push(item.link)}>
                  <Text style={{ color: 'blue', alignSelf: "flex-end", marginRight: 8 }}
                  category='c1'>...Read more</Text>
                </TouchableOpacity>
                </React.Fragment>
              
            }
          />
          <MotiView style={{flexDirection:"row", alignSelf: 'flex-start'}}>

            <Button
              // onPress={share}
              status="primary"
              appearance="ghost"
              style={{width:4 }}
              size='small'
              accessoryLeft={<TagsIcon color={theme['color-primary-700']} />} />
              <Text category='p1' style={{marginTop:8}}>
                {`${item.title?.en}`}
              </Text>
              
            {/* </Button> */}

          </MotiView>

          <MotiView style={{ flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

            <Button
              // onPress={share}
              status="primary"
              appearance="ghost"
              style={{ width: 4, marginTop: 4 }}
              accessoryLeft={<ShareIcon color={theme['color-basic-700']} />} />

            <Button
              //onPress={like}
              status="primary"
              appearance="ghost"
              style={{ width: 4, marginTop: 4 }}
              accessoryLeft={<BookmarkIcon color={theme['color-basic-700']} />} />
            
            {/* <Button
              onPress={() => setCount(count + 1)}
              status="primary"
              appearance="ghost"
              style={{ width: 4, marginTop: 4}}
              accessoryLeft={<HeartIcon color={theme['color-danger-700']} />} />
            <Text style={{marginTop: 20 }}>{count} Likes</Text> */}

            <Reaction id={item.id}/>

          </MotiView>
        </MotiView>
      </MotiView>
    </Card>
  ), [selectedCount]);
  //console.log(newsdata)


  if (isLoading) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </Layout>
  }

  if (isError) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Divider />

      <Text category='s1' status="danger" style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get news.</Text>
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

          <Input size='medium' placeholder='Search a news' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }

      {isSuccess && <List
        ref={list}
        data={newsdata}
        renderItem={renderNewItem}
      />
      }

    </Layout>



  );
};

