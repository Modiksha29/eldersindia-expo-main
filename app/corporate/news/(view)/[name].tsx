import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Input, useTheme, Spinner, Toggle, IconProps, IconElement } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView, } from 'moti'
import { StyleSheet, ImageBackground, TouchableOpacity,ImageProps, Image } from "react-native"
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNewsRead, updateNews } from 'apis/admin/news'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/admin/news/reaction'


import PlaceholderImage from 'assets/images/favicon.png'

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />



const schema = z.object({
  id: z.string(),
  title: z.string().min(3, { message: 'News title is required' }).max(256, { message: 'News title is too long' }),
  content: z.string().min(3, { message: 'News content is required' }).max(256, { message: 'News content is too long' }),
  image: z.object({}).optional(),
  is_approved: z.boolean({
    required_error: "approved news is required",
    invalid_type_error: "approved news must be a boolean",
  }),
  published_at: z.string().optional(),
  createdby: z.string().optional(),
  is_published: z.boolean({
    required_error: "published news is required",
    invalid_type_error: "published news must be a boolean",
  }),
  created_at: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'News created date is too long' }),
  news_category:z.string().optional(),
  news_subcategory:z.string().optional(),
  // tags:z.object({}).optional(),
});

export default function Page({ navigation }) {

  //Image Picker
  const [image, setImage] = useState(null);

  const { id } = useSearchParams()
  const [newsdata = {}, setNewsData] = useMMKVObject('newsdata', storage)
  const { push, replace, back, } = useRouter()
  const queryClient = useQueryClient()
  const theme = useTheme();
  const [showLayout1, setShowLayout1] = useState(true);

  const toggleLayout = () => {
    setShowLayout1(!showLayout1);
  };

  const { data: mutateData,
    error: mutateError,
    isError: isMutateError,
    isIdle,
    isLoading: isMutationLoading,
    isPaused,
    isSuccess: isMutationSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset: mutateReset,
    status, } = useMutation({
      mutationFn: (news) => updateNews(news),
      onSuccess(data) {
        const { id, title, content, slug, visible, image, is_approved, user_id,
          published_at, is_published, is_current,tags,
          news_subcategory, created_at, createdby, updated_at,news_category } = data?.data?.data;

        const news = {
          id,
          title: title?.en,
          content: content?.en,
          is_approved,
          image,
          is_published,
          created_at,
          news_category,
          news_subcategory,
          published_at,
          createdby:createdby?.name,
          // tags,
        }
        setNewsData(news);
        showToast();
        back();
      },
      onError(error, variables, context) {
        const errors = error?.response?.data?.errors
        console.log(errors)
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
      image: PlaceholderImage,
      created_at: '',
      is_approved: true,
      is_published: true,
      news_category:'',
      news_subcategory:'',
      published_at:'',
      createdby:'',
      // tags:'',
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    enabled: true,
    queryKey: ['news', id],
    queryFn: ({ queryKey }) => getNewsRead(queryKey[1]),
    onSuccess(data) {
      const { id, title, content, slug, visible, image, is_approved, user_id,
        news_category, news_subcategory_id, draft_id, published_at, is_published,
        is_current, created_at, createdby,tags,news_subcategory } = data?.data?.data;

      const news = {
        id,
        title: title?.en,
        content: content?.en,
        is_approved,
        image: { uri: image, width: 100, height: 100, },
        is_published,
        created_at,
        news_category:news_category?.name.en,
        news_subcategory:news_subcategory?.name.en,
        published_at,
        createdby:createdby?.name,
        // tags:tags?.name.en,
      }

      reset(news)
    }
  })

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'News details updated'
    });
  }

  const onSubmit = data => {
    console.log(data?.is_approved)
    mutate(data)

  };

  //uploading image from user library using launchImageLibrary
  //----------------------------------------------------
  // const uploadPhoto = async () => {
  //    const image = await launchImageLibrary({
  //       maxHeight:1024,
  //       maxWidth:1024,
  //       mediaType:'photo',
  //     });
  //     console.log(image?.assets[0])
  //     setValue('image', image?.assets[0])

  // }

  //uploading image from user library using crop picker
  //----------------------------------------------------
  const uploadPhoto = async () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        console.log(image)
        const croppedImage = { uri: image.sourceURL, width: 100, height: 100, mime: image.mime }
        setValue('image', croppedImage)
        console.log("new console", croppedImage)

      });
    }

  //----------------------------------------------------

  // React.useEffect(() => {
  //   refetch();
  // }, [])

  console.log("Errors " + JSON.stringify(errors))

  if (isLoading) {
    return <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </MotiView>
  }

  if (isError) {
    return <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text category='s1' status="danger" style={{ textAlign: 'center' }}>Failed to get news.</Text>
    </MotiView>
  }
  if (isSuccess) {
    return (
      <Layout style={{ flex: 1 }}>
        <TouchableOpacity onPress={toggleLayout}>
          <Button size='small'
            style={{ backgroundColor: theme['color-primary-400'], borderRadius: 12, margin: 8, alignSelf: 'flex-end' }} onPress={toggleLayout}>
            {showLayout1 ? 'Edit mode..' : 'Read mode..'}
          </Button>
        </TouchableOpacity>

        {showLayout1 ? (
          <MotiView style={{ padding:8 }}>
            <ScrollView>
            <MotiView style={styles.cardContainer}>
                <Image
                  source={getValues('image')}
                  alt="A cool artist's image."
                  style={{ borderRadius: 12 }} />
                <Text style={styles.cardTitle} category="h5">
                  {getValues('title')}</Text>
              </MotiView>
              <MotiView style={{ alignSelf: 'flex-end', padding: 8, marginRight: 32, flexDirection: 'row' }}>
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

                <Reaction id={getValues('id')} />
              </MotiView>
              <MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8 }}>Content  : </Text>
                  <Text category='s2' style={{ marginLeft: 8,marginTop:2,marginRight:"30%",color:theme['color-primary-600'] }}>{getValues('content')}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8 }}>News category : </Text>
                  <Text category='s2'style={{ marginLeft: 8,marginRight:"50%",color:theme['color-success-600'] }}>{getValues('news_category')}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8 }}>News subcategory : </Text>
                  <Text category='s2'style={{ marginLeft: 8,marginRight:"40%",color:theme['color-success-600'] }}>{getValues('news_subcategory')}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Icon
                    style={{ width: 20, height: 20, marginRight: 16, tintColor: theme['color-success-500'] }}
                    fill={theme['color-warning-500']}
                    name={'checkmark-outline'}
                    pack={'ionicons'}
                  />
                  <Text category='s1'>Is news approved?</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Icon
                    style={{ width: 20, height: 20, marginRight: 16, tintColor: theme['color-success-500'] }}
                    fill={theme['color-warning-500']}
                    name={'checkmark-outline'}
                    pack={'ionicons'}
                  />
                  <Text category='s1'>Is news featured?</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8, }}>Published at : </Text>
                  <Text category='s2'>{getValues('published_at')}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8, }}>Created By : </Text>
                  <Text category='s2'style={{ marginLeft: 8,marginTop:2,color:theme['color-primary-600'] }}>{getValues('createdby')}</Text>
                </MotiView>
              </MotiView>
            </ScrollView>

          </MotiView>

          ) : (
      <MotiView style={{ flex: 1}}>
        {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}

        {!isPresented && <Link href="../">Dismiss</Link>}
        <ScrollView>
          <MotiView from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing' }}
            style={{ paddingVertical: 8, paddingHorizontal: 8 }}
          >

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Title'
                  placeholder={"News title"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.title ? 'danger' : 'success'}`}
                  caption={`${errors?.title ? errors.title?.message : ''}`}
                />
              )}
            />
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Content'
                  placeholder={"News content"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.content ? 'danger' : 'success'}`}
                  caption={`${errors?.content ? errors.content?.message : ''}`}
                />
              )}
            />

            <MotiView style={{ flexDirection: 'row' }}>

              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, onBlur, value } }) => (
                  <React.Fragment>
                    <Image
                      source={value}
                      alt="A cool artist's image."
                    //loader={}
                    />
                    <Button
                      onPress={uploadPhoto}
                      status='primary' style={{ marginHorizontal: 8, height: 20, marginTop: 28 }}>Upload Photo</Button>
                  </React.Fragment>
                )}
              />
            </MotiView>

            <Controller
              control={control}
              name="created_at"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Created At'
                  placeholder={"News created at"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.created_at ? 'danger' : 'success'}`}
                  caption={`${errors?.created_at ? errors.created_at?.message : ''}`}
                />
              )}
            />
            {/* <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                fill={theme['color-warning-500']}
                name={'checkmark-outline'}
                pack={'ionicons'}
              />
              <Text>Approved</Text>
            </MotiView> */}
            <Controller
            control={control}
            name="is_approved"
            render={({ field: { onChange, onBlur, value } }) => (
              <Toggle
                style={[styles.marginVertical, styles.alignSelf]}
                checked={value}
                onChange={onChange}
                status={`${errors?.is_approved ? 'danger' : 'primary'}`}
              >
                 Is news approved?
              </Toggle>
            )}
          />
          <Controller
            control={control}
            name="is_published"
            render={({ field: { onChange, onBlur, value } }) => (
              <Toggle
                style={[styles.marginVertical, styles.alignSelf]}
                checked={value}
                onChange={onChange}
                status={`${errors?.is_published ? 'danger' : 'primary'}`}
              >
                 Is news published?
              </Toggle>
            )}
          />
          
            {/* <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                fill={theme['color-warning-500']}
                name={'checkmark-outline'}
                pack={'ionicons'}
              />
              <Text>Published</Text>
            </MotiView> */}

            <MotiView
              style={{ flexDirection: 'row', marginTop:8 }}
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
              <Button status='danger' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }} onPress={() => isPresented()}
              >Cancel</Button>
              <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                onPress={handleSubmit(onSubmit)}
              >
                {`${isMutationLoading ? 'Updating' : 'Update'}`}
              </Button>

            </MotiView>
          </MotiView>
        </ScrollView>
        {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
        <StatusBar barStyle="light-content" />
      </MotiView>
    )}

    </Layout>
  );
}
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 4,
    marginBottom:8,
  },
  alignSelf: {
    alignSelf: 'flex-start',
  },
  cardContainer: {
    position: 'relative',

  },
  cardTitle: {
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // textAlign: 'center',
    color: 'black',
    // fontSize: 24,
    fontWeight: 'bold',
    padding: 4,
    zIndex: 1,
    backgroundColor: '#E4E9F2',
    marginBottom: 8,

  },
})