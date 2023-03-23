import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, IndexPath } from '@ui-kitten/components'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useMMKVString, useMMKVNumber } from 'react-native-mmkv'
// import { storage } from 'provider/storageProvider'
import getAllBlogs, { blogsReaction, blogsBookmark, destroyBlogs, updateBlogs } from 'apis/admin/blogs'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Reaction } from 'components/admin/blogs/reaction'
import { Bookmark } from 'components/admin/blogs/bookmark'
import ErrorImage from 'assets/images/Error404.png'

const TagsIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='pricetags-outline' width={32} heigth={32} />
const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />
const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />
const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />
const DeleteIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='trash' width={32} heigth={32} />
const SelectAllIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-square-2-outline' width={32} heigth={32} />
const RemoveSelection = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-square-outline' width={32} heigth={32} />

export default function Page() {
  const { id } = useSearchParams()
  const { push, back } = useRouter()
  const fetchBlogs = (page = 1, sort, search) => getAllBlogs(page, sort, search)
  const [page, setPage] = React.useState(1)
  const [sort = 'title-desc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [blogsdata, setBlogsData] = useState([])
  const [selectedCount, setSelectedCount] = useState(0);
  const theme = useTheme();
  const list = React.useRef(null)
  const queryClient = useQueryClient()
  const [reactions, setReactions] = useState(['like'])


  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: blogs,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['blogs', page, sort, search],
    queryFn: () => fetchBlogs(page, sort, search),
    onSuccess(data) {

      let list = []
      data.data?.data?.data?.map((l, i) => {

        list.push({
          id: l.id,
          title: l.title,
          content: l.content,
          // is_approved: false,
          image: l.image,
          tags: l.tags,
          // published_at,
          // created_at,
          // author,
          link: `/admin/blogs/${l.title['en']}?id=${l.id}&name=${l.title['en']}`,
          reaction: l.reaction
        })
      })
      list.length > 0 && setBlogsData(blogsdata.concat(list));
    },
  })

  const blogsReactionCountMutation =
    useMutation({
      mutationFn: updateBlogs,

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

  const blogsReactionMutation = useMutation(blogsReaction, {
    onSuccess: (data, variables) => {
      const { id } = data?.data?.data;

      const blogs = {
        id,
      }
      queryClient.setQueryData('blogs', (prevData) => {
        return prevData.map((blog) => {
          if (blog.id === id) {
            return blogs;
          }
          return blog;
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

  const blogsBookmarkMutation = useMutation({
    mutationFn: (blogs) => blogsBookmark(blogs),
    onSuccess(data) {
      const { id } = data?.data?.data;

      const blogs = {
        id,
      }
      setBlogsData(blogs);
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

  const blogsDeleteMutation = useMutation(destroyBlogs, {
    onSuccess: (data, variables) => {
      // console.log('API response data:', data);
      const { id } = data?.data?.data;
      // console.log('Extracted ID:', id);

      const blogs = {
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

  const { control, handleSubmit, formState: { errors }, setValue, getValues, setError, reset } = useForm({
    defaultValues: {
      id: id,
      title: '',
      content: '',
      image: '',
      created_at: '',
      is_approved: true,
      is_published: true,
      is_featured: false,
      author: '',
      tags: '',
    },
    // resolver: zodResolver(schema),
  });

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Blogs details updated'
    });
  }

  const handelSection = (id, isSelected) => {
    isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)
    setBlogsData(blogsdata => blogsdata.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        }
      }
      return item
    }))
  };

  const handleSelectAll = () => {
    setSelectedCount(blogsdata.length);
    setBlogsData(blogsdata => blogsdata.map(item => ({
      ...item,
      isSelected: true,
    })));
  };
  const handleRemoveSelection = () => {
    setSelectedCount(0);
    setBlogsData(blogsdata => blogsdata.map(item => ({
      ...item,
      isSelected: false,
    })));
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

  const handleReactionClick = async (id) => {
    // console.log(id)
    try {
      blogsReactionMutation.mutate(id, reactions[0]);
      console.log('Reaction clicked');
    } catch (error) {
      console.error(error);
    }
  }
  const handleBookmarkClick = async (id) => {
    // console.log(id)
    try {
      blogsBookmarkMutation.mutate(id);
      console.log('Bookmark clicked');
    } catch (error) {
      console.error(error);
    }
  }
  const handleBlogDelete = async () => {
    try {
      let ids = '';
      blogsdata.map(b => {
        if (b.isSelected) {
          ids = `${ids}, ${b.id}`
        }
      })

      blogsDeleteMutation.mutate(ids);
      // blogsDeleteMutation.mutate([id]);
      // console.log('Blogs deleted successfully');
    } catch (error) {
      console.error(error);
    }
  }
  const optimizedFn = React.useCallback(debounce(handleSearch), []);

  React.useEffect(() => {
    setBlogsData([]);
    setPage(1);
  }, [sort, search])

  const renderNewItem = React.useCallback(({ item, index }) => {

    return (

      <MotiView style={{ flex: 1, padding: 4 }}>
        <Card
          onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
          onLongPress={() => handelSection(item.id, item.isSelected)}
          style={{
            backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
          }}
        >

          <MotiView style={{ flexDirection: 'row', flex: 1 }}>
            <MotiView style={{ width: 4 }}>
              <Image
                source={item.image}
                alt="A cool artist's image."
                style={{ borderRadius: 12, width: 335, height: 200 }}
              />

            </MotiView>
            <MotiView style={{ flex: 1 }}>
              <Text onPress={() => push(item.link)} category='h6' style={{ margin: 8, backgroundColor: theme['color-basic-400'], }}>
                {`${item.title?.en}`}
              </Text>
              <MotiView style={{ flex: 1 }}>
                <Text
                  numberOfLines={1} ellipsizeMode='tail'
                  style={{ margin: 8, position: 'absolute', bottom: 0, backgroundColor: theme['color-basic-400'] }}
                  onPress={() => push(item.link)}
                  category='s1'
                >
                  {`${item.content?.en}`}
                </Text>
                {/* <TouchableOpacity onPress={() => push(item.link)} style={{  marginRight: 16, bottom:0, marginTop:16}}>
        <Text style={{ color: theme['color-progress-100'], alignSelf: 'flex-end',margin: 8, position: 'absolute',bottom: 0, top:0 }} category='s1'>
              Read more...
            </Text>
        </TouchableOpacity> */}
              </MotiView>


            </MotiView>
          </MotiView>

          <MotiView style={{ flexDirection: "row", alignSelf: 'flex-start' }}>
            {item?.tags.length > 0 && item.tags.map((tag, index) => (
              <Text category='p1' style={{ marginTop: 8 }}>
                {`${tag?.name?.en}, `}
              </Text>
            ))}
          </MotiView>
          <MotiView style={{ flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
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
            <Reaction id={item.id} count={item.reaction?.length} liked={item.reaction.includes(r => r.user_id === "d2a0e52d-91bb-3960-b049-5c4db641632a")} onReactionClick={handleReactionClick} />

          </MotiView>
        </Card>

      </MotiView>

    )
  }, [selectedCount]);

  if (isLoading) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </Layout>
  }

  if (isError) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Divider />

      <MotiView style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Image
          source={ErrorImage}
          alt="A cool artist's image."
          style={{ borderRadius: 1, width: 300, height: 200 }}
        />
      </MotiView>
      <Text category='h6' status="success" style={{ textAlign: 'center', marginVertical: 8 }}>Oops something went wrong...</Text>
      <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get blogs.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()}
        style={{ width: "50%" }} accessoryLeft={
          <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
  }

  return (
    <Layout style={{ marginBottom: "25%" }}>
      {/* ---If Selected ? Action Button Section : Show Sort, Filter and Search Section------------------------ */}
      {selectedCount > 0
        ?
        <MotiView style={{ flexDirection: 'row', alignSelf: "flex-end" }} >
          {selectedCount > 0 && (
            <Button onPress={() => handleBlogDelete()}
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

        </MotiView>

          <Divider />

          {/* Search Section */}

          <Input size='medium' placeholder='Search your blogs' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

          <Divider />

        </MotiView>

      }
      {isSuccess && <List
        // style={{marginBottom:"30%"}}
        ref={list}
        data={blogsdata}
        renderItem={renderNewItem}
        keyExtractor={keyExtractor}
        onEndReached={() => {
          blogs?.data?.data?.total - 1 > blogsdata.length ? setPage(page + 1) : ''
        }}
        onEndReachedThreshold={.3}
        initialNumToRender={10}
        windowSize={15}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={20}
        removeClippedSubviews={false}
        ListEmptyComponent={<Text category='s1' status='primary' style={{ textAlign: 'center', margin: 8 }}>No blogs found</Text>}

        ListFooterComponent={blogs?.data?.data?.current_page === blogs?.data?.data?.last_page && blogsdata.length > 0 ?
          (<Button onPress={() => list?.current.scrollToIndex({ animate: true, index: 0 })} appearance="outline" status='primary' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='arrowhead-up-outline'
          />}>{`That's all we have! Go to top`}</Button>
          ) : <></>}
      />
      }
      {isFetching && (
        <Text appearance='hint' status='primary' style={{ textAlign: 'center', margin: 8 }}>Loading more...</Text>
      )}

    </Layout>
  )
}
