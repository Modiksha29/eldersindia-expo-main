import React, { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { MotiView } from 'moti'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { Layout, Button, Icon, Text, Input, Card, useTheme, Spinner, Divider, IconProps, IconElement, List } from '@ui-kitten/components'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from "react-hook-form";
import { SheetManager } from 'react-native-actions-sheet'
import { updateBlogs, getUnapprovedBlogs, destroyBlogs } from 'apis/admin/blogs'
import Toast from 'react-native-toast-message';
import ErrorImage from 'assets/images/Error404.png'
import NoDataFound from 'assets/images/NoDataFound.png'

const ApproveIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-circle-2-outline' width={32} heigth={32} />
const RejectIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const EditIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='edit-2-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

export default function Page() {
  const { id } = useSearchParams()
  const { push, replace, back, parseNextPath } = useRouter()
  const fetchBlogs = (page = 1, sort, search) => getUnapprovedBlogs(page, sort, search)
  const [page = 1, setPage] = useState();
  const [sort = 'title-desc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [blogsdata, setBlogsData] = useState([])
  const [selectedCount, setSelectedCount] = useState(0);
  const theme = useTheme();
  const list = React.useRef(null)
  const queryClient = useQueryClient()
  const [selectedItems, setSelectedItems] = useState([]);
  const [showEditComponent, setShowEditComponent] = useState(false);

  const [reactions, setReactions] = useState(['like'])

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: unapprovedblogs,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['unapprovedblogs', page, sort, search],
    queryFn: () => fetchBlogs(page, sort, search),
    onSuccess(data) {
      console.log('Called')
      let list = []
      data.data?.data?.data?.map((l, i) => {
        console.log('inside')
        list.push({
          id: l.id,
          title: l.title,
          is_approved: l.is_approved,
          image: l.image,
          link: `/admin/blogs/${l.id}/${l.title['en']}`,
          reaction: l.reaction
        })
      })
      list.length > 0 && setBlogsData(blogsdata.concat(list));
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

  useMutation({
    mutationFn: updateBlogs,
    onMutate: async (newBlog) => {
      await queryClient.cancelQueries({ queryKey: ['id, is_approved'] })

      const previousTodos = queryClient.getQueryData(['blogs'])

      queryClient.setQueryData(['id, is_approved'], (old) => [...old, newBlog])

      return { previousTodos }
    },

    onError: (err, newBlog, context) => {
      queryClient.setQueryData(['id, is_approved'], context.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['id, is_approved'] })
    },
  })

  const blogsApproveMutation = useMutation({
    mutationFn: (data) => updateBlogs(data),
    onSuccess(data) {
      console.log(data?.data?.data);
      // setBlogsData(blog);
      showToast();
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

  const blogsRejectMutation = useMutation({
    mutationFn: (data) => destroyBlogs(data),
    onSuccess(data) {
      console.log(data?.data?.data);
      // const { id } = data?.data?.data;
      // const blog = {
      //   id,
      // };
      // setBlogsData(blog);
      showToast();
      // back();
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

  const handleBlogDelete = async () => {
    // try {
    //   let ids = [];
    //   blogsdata.map(b => {
    //     if(b.isSelected) {
    //       ids.push(b.id)
    //     }
    //   })


    blogsRejectMutation.mutate([id]);
    console.log('Blogs deleted successfully');
    // } 
    // catch (error) {
    //   console.error(error);
    // }
  }


  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Blogs details updated'
    });
  }


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
  const renderNewItem = React.useCallback(({ item, index }) => {

    return (

      <MotiView style={{ flex: 1, padding: 4 }}>
        <Card
          style={{
            marginBottom: 4,
          }}
        >
          <MotiView style={{ flexDirection: "row" }}>
            <Image
              source={item.image}
              alt="A cool artist's image."
              style={{ borderRadius: 12, width: 50, height: 50 }}
            />

            {/* <MotiView style={{ marginRight: 32 }}> */}

            <Text category='s1' style={{ marginLeft: 8, justifyContent: "center", alignSelf: "center" }}>
              {`${item.title.en}`}
              {/* Estate planning takes care of family's wealth after you */}
            </Text>
            {/* </MotiView> */}

          </MotiView>
          <Divider />
          <MotiView style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }} >

            <Button
              onPress={() => blogsApproveMutation.mutate({ id: item.id, is_approved: 1 })}
              size='tiny' status='success' style={{ margin: 3, height: 30, width: 100, marginRight: 4, paddingHorizontal: 0 }}
              appearance="outline" accessoryLeft={<ApproveIcon color={theme['color-success-700']} />}>
              Approve
            </Button>
            <Button
              onPress={() => blogsRejectMutation.mutate(item.id)}
              size='tiny' status='danger' style={{
                margin: 3, height: 30,
                marginRight: 4, paddingHorizontal: 0
              }}
              appearance="outline" accessoryLeft={<RejectIcon color={theme['color-danger-700']} />} >
              Reject
            </Button>
            <Button
              // onPress={handleButtonPress}
              onPress={() => push(`/admin/blogs/${item.id}/${item.name}`)}
              size='tiny' status='primary' style={{
                margin: 3, height: 30,
                marginRight: 4, paddingHorizontal: 0
              }}
              appearance="outline" accessoryLeft={<EditIcon color={theme['color-basic-700']} />}>
              Edit
            </Button>
            {/* <Modal visible={showEditComponent} onRequestClose={handleCloseModal}>
              <EditBlogsScreen />
            </Modal> */}

          </MotiView>

        </Card>

      </MotiView>

    )
  }, []);

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
      <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get approved blogs deatils.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()}
        style={{ width: "50%" }} accessoryLeft={
          <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
  }

  return (
    <Layout style={{ flex: 1 }}>
      {blogsdata.length > 0 ? (
        <List
          ref={list}
          data={blogsdata}
          renderItem={renderNewItem}
        />
      ) : (
        <Layout style={{ marginTop: "50%", justifyContent: 'center', alignItems: 'center', }}>
          <Divider />

          <MotiView style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Image
              source={NoDataFound}
              alt="A cool artist's image."
              style={{ borderRadius: 1, width: 300, height: 200 }}
            />
          </MotiView>
          <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>No blogs for approval.</Text>
          <Button status='primary' appearance='outline' onPress={() => refetch()}
            style={{ width: "50%" }} accessoryLeft={
              <RetryIcon color={theme['color-primary-default']} />}>Retry
          </Button>
        </Layout>
      )}
    </Layout>
  )
}
