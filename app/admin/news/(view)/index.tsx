import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, IndexPath} from '@ui-kitten/components'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
// import { storage } from 'provider/storageProvider'
import getAllNews, { destroyNews,newsReaction, newsBookmark,updateNews } from 'apis/admin/news'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Reaction } from 'components/admin/news/reaction'
import { Bookmark } from 'components/admin/news/bookmark'
import ErrorImage from 'assets/images/Error404.png'

const TagsIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='pricetags-outline' width={32} heigth={32} />

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />

const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />

const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />

const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />

const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />

const placements = ['top'];

export default function Page() {

  const { push, replace, back, parseNextPath } = useRouter()
  const fetchNews = (page = 1, sort, search) => getAllNews(page, sort, search)
  const [page, setPage] = React.useState(1)
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
  const [reactions, setReactions] = useState(['like'])
  const queryClient = useQueryClient()


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
    queryKey: ['adminNews', page, sort, search],
    queryFn: () => fetchNews(page, sort, search),
    onSuccess(data) {
      // console.log('Called')
      let list = []
      data.data?.data?.data?.map((l, i) => {
        // console.log('inside')
        list.push({
          id: l.id,
          title: l.title,
          content: l.content,
          isSelected: false,
          image: l.image,
          tags: l.tags,
          link: `/admin/news/${l.title['en']}?id=${l.id}&name=${l.title['en']}`,
          backgroundColor: theme[`background-basic-color-${l.is_active ? 1 : 2}`],
          iconLeft: (props) => (<Icon {...props} style={[props.style,
          { tintColor: theme['color-primary-400'] }]} name="news-variant-outline" pack="material-community"
          />)
        })
      })
      list.length > 0 && setNewsData([...new Set(newsdata.concat(list))]);
    },
  })

  useMutation({
    mutationFn: updateNews,
    
    onMutate: async (newCounts) => {
      await queryClient.cancelQueries({ queryKey: ['count'] })
  
      const previousCount = queryClient.getQueryData(['count'])
  
      queryClient.setQueryData(['count'], (old) => [...old, newCounts])

      return { previousCount }
    },
    onError: (err, newCount, context) => {
      queryClient.setQueryData(['count'], context.previousCount)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['count'] })
    },
  })

  const newsReactionMutation = useMutation(newsReaction, {
    onSuccess: (data, variables) => {
      const { id } = data?.data?.data;

      const news = {
        id,
      }
      queryClient.setQueryData('news', (prevData) => {
        return prevData.map((news) => {
          if (news.id === id) {
            return news;
          }
          return news;
        });
      });
      showToast();
      back();
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

  const newsBookmarkMutation = useMutation({
    mutationFn: (news) => newsBookmark(news),
    onSuccess(data) {
      const { id } = data?.data?.data;

      const news = {
        id,
      }
      setNewsData(news);
      showToast();
      back();
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


  const newsDeleteMutation = useMutation(destroyNews, {
    onSuccess: (data, variables) => {
      // console.log('API response data:', data);
      const { id } = data?.data?.data;
      // console.log('Extracted ID:', id);

      const news = {
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
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Blogs details updated'
    });
  }

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

  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

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
    // console.log("Reacted")
  }
  const handleReactionClick = async (id) => {
    // console.log(id)
    try {
      newsReactionMutation.mutate(id, reactions[0]);
      console.log('Reaction clicked');
    } catch (error) {
      console.error(error);
    }
  }
  const handleBookmarkClick = async (id) => {
    // console.log(id)
    try {
      newsBookmarkMutation.mutate(id);
      console.log('Bookmark clicked');
    } catch (error) {
      console.error(error);
    }
  }

  const handleNewsDelete = async () => {
    try {
      let ids = '';
      newsdata.map(b => {
        if (b.isSelected) {
          ids = `${ids}, ${b.id}`
        }
      })

      newsDeleteMutation.mutate(ids);
      // newsDeleteMutation.mutate([id]);
      // console.log('Blogs deleted successfully');
    } catch (error) {
      // console.error(error);
    }
  }

  const renderNewItem = React.useCallback(({ item, index }) => (

    <Card
      onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
      onLongPress={() => handelSection(item.id, item.isSelected)}
      style={{
        backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
        marginBottom: 4,
      }}
    >
      <MotiView
        style={{ flexDirection: "column", flex: 0 }}
      >
        <Image
          source={item.image}
          alt="A cool artist's image."
          style={{ borderRadius: 12, width: "100%", height: 200 }}
        />

        <MotiView style={{ backgroundColor: 'tranparent' }}>

          <Text category='h5' style={{ marginTop: 8 }}>
            {`${item.title?.en}`}
          </Text>
          <Text style={{ color: theme['color-basic-600'], marginTop: 4 }} category='s1'>
            {`${item.content?.en}`}
          </Text>
          <Text style={{ color: 'blue', alignSelf: "flex-end", marginRight: 8, marginTop: 4 }}
            category='c1'>...Read more</Text>
          <MotiView style={{ flexDirection: "row", alignSelf: 'flex-start' }}>

            <Button
              // onPress={share}
              status="primary"
              appearance="ghost"
              style={{ width: 4 }}
              size='small'
              accessoryLeft={<TagsIcon color={theme['color-primary-700']} />} />
            <Text category='p1' style={{ marginTop: 8 }}>
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

            <Bookmark id={item.id}
              // bookmark={item.bookmark.includes(r => r.user_id === "92ea3fcd-4052-3490-8bb8-26e9105cd945")} 
              onBookmarkClick={handleBookmarkClick}
            />

            <Reaction id={item.id} count={item.reaction?.length} 
            // liked={item.reaction.includes(r => r.user_id === "a92e20f3-f69d-3969-80cb-fd2914576b00")} 
            onReactionClick={handleReactionClick} />

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
      <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get news.</Text>
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
            <Button onPress={() => handleNewsDelete()}
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

          <Input size='medium' placeholder='Search a news' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }

      {isSuccess && <List
        ref={list}
        data={newsdata}
        renderItem={renderNewItem}
        keyExtractor={keyExtractor}
        onEndReached={() => {
          news?.data?.data?.total - 1 > newsdata.length ? setPage(page + 1) : ''
        }}
        onEndReachedThreshold={.3}
        initialNumToRender={10}
        windowSize={15}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={20}
        removeClippedSubviews={false}
        ListEmptyComponent={<Text category='s1' status='primary' style={{ textAlign: 'center', margin: 8 }}>No news found</Text>}
        ListFooterComponent={news?.data?.data?.current_page === news?.data?.data?.last_page && newsdata.length > 0 ?
          (<Button onPress={() => list?.current.scrollToIndex({ animate: true, index: 0 })} appearance="outline" status='primary' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='arrowhead-up-outline'
          />}>{`That's all we have! Go to top`}</Button>
          ) : <></>}
      />
      }
      {isFetching && (
        <Text appearance='hint' status='primary' style={{ textAlign: 'center', margin: 8 }}>Loading more...</Text>
      )}

    </Layout>



  );
};

