import React,{useState, useCallback} from 'react'
import { useRouter,useSearchParams } from 'expo-router'
import { MotiView } from 'moti'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { Layout, Button, Icon, Text, Input, Card, useTheme, Spinner, Divider, IconProps, IconElement, List } from '@ui-kitten/components'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from "react-hook-form";
import { SheetManager } from 'react-native-actions-sheet'
import { updateNews, getUnapprovedNews, destroyNews, getDestroiedNewsRecord }  from 'apis/admin/news'
import Toast from 'react-native-toast-message';
import ErrorImage from 'assets/images/Error404.png'
import NoDataFound from 'assets/images/NoDataFound.png'

const ApproveIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='checkmark-circle-2-outline' width={32} heigth={32} />
const RejectIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />
const EditIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='edit-2-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

export default function Page() {
  
  const { push, replace, back, parseNextPath } = useRouter()
  const { id } = useSearchParams()
  const fetchNews = (page = 1, sort, search) => getUnapprovedNews(page, sort, search)
  const [page = 1, setPage] = useState();
  const [sort = 'title-desc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [newsdata, setNewsData] = useState([])
  const theme = useTheme();
  const list = React.useRef(null)
  const queryClient = useQueryClient()
  const [selectedItems, setSelectedItems] = useState([]);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [currentNewsData, setCurrentNewsData] = useState([]);
  const [reactions, setReactions] = useState(['like'])

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: unapprovednews,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['unapprovednews', page, sort, search],
    queryFn: () => fetchNews(page, sort, search),
    onSuccess(data) {

      let list = []
      data.data?.data?.data?.map((l, i) => {
        // console.log('inside')
        list.push({
          id: l.id,
          title: l.title,
          is_approved: l.is_approved,
          image: l.image,
          link: `/admin/news/${l.id}/${l.title['en']}`,
          reaction: l.reaction
        })
      })
      list.length > 0 && setNewsData(newsdata.concat(list));
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
      news_category: '',
      news_subcategory: '',
      published_at: '',
      createdby: '',
      // tags:'',
    },
    // resolver: zodResolver(schema),
  });

  const handleButtonPress = () => {
    setShowEditComponent(true);
  };

  const handleCloseModal = () => {
    setShowEditComponent(false);
  };

  const newsApproveMutation = useMutation({
    mutationFn: (data) => updateNews(data),
    onSuccess(data, variables, context) {
      const newsUpdated = data?.data?.data
      console.log(newsUpdated)
      // setNewssData(blog);
      queryClient.invalidateQueries({ queryKey: ['adminNews'] })
      // queryClient.invalidateQueries({ queryKey: ['unapprovednews'] });
      setNewsData(old => old.filter(n => {
        if (n.id === newsUpdated.id) {
          return false
        }
        return true
      }))
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

  const newsRejectMutation = useMutation({
    mutationFn: (data) => destroyNews(data),
    onSuccess(data) {
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

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'News details updated'
    });
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
              onPress={() => newsApproveMutation.mutate({ id: item.id, is_approved: 1 })}
              size='tiny' status='success' style={{ margin: 3, height: 30, width: 100, marginRight: 4, paddingHorizontal: 0 }}
              appearance="outline" accessoryLeft={<ApproveIcon color={theme['color-success-700']} />}>
              Approve
            </Button>
            <Button
              onPress={() => newsRejectMutation.mutate(item.id)}
              size='tiny' status='danger' style={{
                margin: 3, height: 30,
                marginRight: 4, paddingHorizontal: 0
              }}
              appearance="outline" accessoryLeft={<RejectIcon color={theme['color-danger-700']} />} >
              Reject
            </Button>
            <Button
              onPress={() => push(`/admin/news/${item.id}/${item.name}`)}
              size='tiny' status='primary' style={{
                margin: 3, height: 30,
                marginRight: 4, paddingHorizontal: 0
              }}
              appearance="outline" accessoryLeft={<EditIcon color={theme['color-basic-700']} />}>
              Edit
            </Button>

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
        <SolitoImage
          src={ErrorImage}
          alt="A cool artist's image."
          style={{ borderRadius: 1, width: 300, height: 200 }}
        />
      </MotiView>
      <Text category='h6' status="success" style={{ textAlign: 'center', marginVertical: 8 }}>Oops something went wrong...</Text>
      <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get approved news details.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()}
        style={{ width: "50%" }} accessoryLeft={
          <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
  }

  return (
    <Layout style={{flex:1}}>
      {newsdata.length > 0 ? (
        <List
          ref={list}
          data={newsdata}
          renderItem={renderNewItem}
        />
      ) : (
        <Layout style={{ marginTop:"50%",justifyContent: 'center', alignItems: 'center', }}>
        <Divider />

          <MotiView style={{ justifyContent: 'center', alignItems: 'center', }}>
            <SolitoImage
              src={NoDataFound}
              alt="A cool artist's image."
              style={{ borderRadius: 1, width: 300, height: 200 }}
            />
          </MotiView>
          <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>No news for approval.</Text>
          <Button status='primary' appearance='outline' onPress={() => refetch()}
            style={{ width: "50%" }} accessoryLeft={
              <RetryIcon color={theme['color-primary-default']} />}>Retry
          </Button>
        </Layout>
      )}
    </Layout>
  )
}


