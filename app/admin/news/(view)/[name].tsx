import React, { useState, useEffect,useRef } from 'react'
import { Image, SafeAreaView } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle,IndexPath,Select, SelectItem } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView } from 'moti'
import { StyleSheet, ImageBackground, TouchableOpacity, ImageProps } from "react-native"
import { useRouter, useSearchParams, Link } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNews, updateNews, getCorporatesList, getServiceProvidersList, getNewsCategories, getNewsSubCategories, } from 'apis/admin/news'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/admin/news/reaction'
import CustomTagInput from 'components/admin/news/tags'
import { useSearch } from '@tanstack/react-location'
import PlaceholderImage from 'assets/images/favicon.png'
import ErrorImage from 'assets/images/Error404.png'

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

const schema = z.object({
  id: z.string(),
  title: z.string().min(3, { message: 'News title is required' }).max(256, { message: 'News title is too long' }),
  content: z.string().min(3, { message: 'News content is required' }).max(256, { message: 'News content is too long' }),
  image: z.object({}).optional(),
  published_at: z.string().optional(),
  createdby: z.string().optional(),
  is_published: z.number().min(0).max(1),
  is_approved: z.number().min(0).max(1),
  is_current: z.number().min(0).max(1),
  created_at: z.string().optional(),
  news_category: z.string().optional(),
  news_subcategory: z.string().optional(),
  visible_corporate: z.object({
    row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  visible_service_provider: z.object({
    row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.object({
        en: z.string(),
      }),
    })),
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-');
};

export default function Page({ navigation }) {

  //Image Picker
  const [image, setImage] = useState(null);

  const { id } = useSearchParams()
  const [newsdata = {}, setNewsData] = useMMKVObject('newsdata', storage)
  const { push, replace, back, parseNextPath } = useRouter()
  const queryClient = useQueryClient()
  const theme = useTheme();
  const [showLayout1, setShowLayout1] = useState(true);
  // const [created_at, setCreatedAt] = useState("");
  const [published_at, setPublishedAt] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [newsContent, setNewsContent] = useMMKVObject('');
  const RichText = useRef();
  const [visibleCorporates, setVisibleCorporates] = useState([])
  const [visibleServiceProviders, setVisibleServiceProviders] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  const toggleLayout = () => {
    setShowLayout1(!showLayout1);
  };
  const handleTagsChange = (selectedTags) => {
    setSelectedTags(selectedTags);
  };
  // function handleHeightChange(height) {
  //   // console.log("editor height change:", height);
  // }
  // function editorInitializedCallback() {
  //   RichText.current?.registerToolbar(function (items) {
  //     // items contain all the actions that are currently active
  //     // console.log(
  //     //   "Toolbar click, selected items (insert end callback):",
  //     //   items
  //     // );
  //   });
  // }
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
        const { id, title, content, slug, visible_corporate,
          visible_service_provider, image, is_approved, user_id,
          published_at, is_published, is_current, tags,
          news_subcategory, created_at, createdby, updated_at, news_category } = data?.data?.data;

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
          createdby: createdby?.first_name,
          tags,
          is_current,
          visible_corporate,
          visible_service_provider,
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
      news_category: '',
      news_subcategory: '',
      published_at: '',
      createdby: '',
      tags: [],
      is_current: true,
      visible_corporate: new IndexPath(0),
      visible_service_provider: new IndexPath(0),
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    enabled: true,
    queryKey: ['news', id],
    queryFn: ({ queryKey }) => getNews(queryKey[1]),
    onSuccess(data) {
      const { id, title, content, slug, visible, image, is_approved, user_id,
        news_category, news_subcategory_id, draft_id, published_at, is_published,
        is_current, created_at, createdby, tags, news_subcategory } = data?.data?.data;

      const news = {
        id,
        title: title?.en,
        content: content?.en,
        is_approved,
        image: { uri: image, width: 100, height: 100, },
        is_published,
        created_at,
        news_category: news_category?.name.en,
        news_subcategory: news_subcategory?.name.en,
        published_at,
        is_current,
        createdby: createdby?.first_name,
        visible,
        tags: tags.map(t => {
          return {
            id: t.id,
            name: t.name,
          }
        }),
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

    const onSubmit = async (data) => {
      data.news_category = data.news_category?.row + 1
      data.news_subcategory = data.news_subcategory?.row + 1
  
      data.visible_corporate = data.visible_corporate?.row + 1
      data.visible_service_provider = data.visible_service_provider?.row + 1
  
      data.is_published = true
      mutate(data)
    };

  const { data: visibleCorporatesData, } = useQuery({
    queryKey: ['corporatesList'],
    queryFn: () => getCorporatesList(),
    onSuccess(data) {
      setVisibleCorporates([{ id: "123", name: { 'en': 'Select Category' } }, ...data?.data?.data])
    }
  })

  const { data: visibleServiceProvidersData, } = useQuery({
    queryKey: ['serviceProvidersList'],
    queryFn: () => getServiceProvidersList(),
    onSuccess(data) {
      setVisibleServiceProviders([{ id: "123", name: { 'en': 'Select Category' } }, ...data?.data?.data])
    }
  })

  const { data: newsCategoriesData, } = useQuery({
    queryKey: ['newsCategories'],
    queryFn: () => getNewsCategories(),
    onSuccess(data) {
      setCategories([{ id: "123", name: { 'en': 'Select Category' } }, ...data?.data?.data])
    }
  })

  const {
    fetchStatus,
    data: newsSubCategoriesData,
    refetch: subCategoryRefetch
  } = useQuery({
    queryKey: ['newsSubCategories', getValues('news_category').row],
    queryFn: () => getNewsSubCategories(categories[getValues('news_category').row].id),
    enabled: categories.length > 0,
    onSuccess(data) {
      setValue('news_subcategory', new IndexPath(0))
      setSubCategories([{ id: "87687", name: { 'en': 'Select Sub Category' } }, ...data?.data?.data]);
    }
  });

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
          <MotiView style={{ padding: 8 }}>
            <ScrollView>
              <MotiView style={styles.cardContainer}>
                <Image
                  source={getValues('image')}
                  height={200}
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
                  <Text category='s2' style={{ marginLeft: 8, marginTop: 2, marginRight: "30%", color: theme['color-primary-600'] }}>{getValues('content')}</Text>
                </MotiView>

                {/* <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8 }}>News category : </Text>
                  <Text category='s2' style={{ marginLeft: 8, marginRight: "50%", color: theme['color-success-600'] }}>{getValues('news_category')}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8 }}>News subcategory : </Text>
                  <Text category='s2' style={{ marginLeft: 8, marginRight: "40%", color: theme['color-success-600'] }}>{getValues('news_subcategory')}</Text>
                </MotiView> */}

                <MotiView style={{ flexDirection: 'row', marginBottom: 20, marginTop: 8 }}>
                  <Text category='s1' style={{ marginLeft: 8, }}>Published at : </Text>
                  <Text category='s2'>{formatDate(getValues('published_at'))}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text category='s1' style={{ marginLeft: 8, }}>Created By : </Text>
                  <Text category='s2' style={{ marginLeft: 8, marginTop: 2, color: theme['color-primary-600'] }}>{getValues('createdby')}</Text>
                </MotiView>

                <MotiView style={{ flexDirection: 'row', padding: 8 }}>
                  <Text category='s2' style={{ marginTop: 4 }}>Tags :</Text>
                  {getValues('tags')?.length > 0 && getValues('tags').map((tag, index) => (
                    <Text category='p1' style={{ marginTop: 4, marginLeft: 4 }}>
                      {`${tag?.name?.en}, `}
                    </Text>
                  ))}
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
                  {getValues('is_approved') ? (
                    <Icon
                      style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                      fill={theme['color-warning-500']}
                      name={'checkmark-outline'}
                      pack={'ionicons'}
                    />
                  ) : (
                    <Icon
                      style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-danger-500'] }}
                      fill={theme['color-warning-500']}
                      name={'close-outline'}
                      pack={'ionicons'}
                    />
                  )}
                  <Text category='s1'>{getValues('is_approved') ? 'This news is  approved.' : 'This news is not approved.'}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
                  {getValues('is_published') ? (
                    <Icon
                      style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                      fill={theme['color-warning-500']}
                      name={'checkmark-outline'}
                      pack={'ionicons'}
                    />
                  ) : (
                    <Icon
                      style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-danger-500'] }}
                      fill={theme['color-warning-500']}
                      name={'close-outline'}
                      pack={'ionicons'}
                    />
                  )}
                  <Text category='s1'>{getValues('is_published') ? 'This news is  published.' : 'This news is not published.'}</Text>
                </MotiView>
                <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
                  {getValues('is_current') ? (
                    <Icon
                      style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                      fill={theme['color-warning-500']}
                      name={'checkmark-outline'}
                      pack={'ionicons'}
                    />
                  ) : (
                    <Icon
                      style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-danger-500'] }}
                      fill={theme['color-warning-500']}
                      name={'close-outline'}
                      pack={'ionicons'}
                    />
                  )}
                  <Text category='s1'>{getValues('is_current') ? 'This news is  currently available.' : 'This news is not currently available.'}</Text>
                </MotiView>


              </MotiView>
            </ScrollView>

          </MotiView>

        ) : (
          <MotiView style={{ flex: 1 }}>
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
                <Text category='s1'>Content</Text>

                {/* <MotiView style={{ marginBottom: 8, marginTop: 4 }}>
                  <Controller
                    control={control}
                    name="content"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <SafeAreaView>
                        <ScrollView>
                          <RichEditor
                            initialContentHTML={newsContent}
                            disabled={false}
                            containerStyle={styles.editor}
                            ref={RichText}
                            initialHeight={150}
                            placeholder={"Start Writing Here"}
                            onChange={(text) => setNewsContent(text)}
                            editorInitializedCallback={editorInitializedCallback}
                            onHeightChange={handleHeightChange}
                          />

                          <RichToolbar
                            editor={RichText}
                            actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList,
                            actions.insertOrderedList, actions.undo, actions.redo,
                            actions.insertImage, actions.keyboard,
                            ]}
                            iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
                          />
                        </ScrollView>
                      </SafeAreaView>
                    )}
                  />
                </MotiView> */}

                <MotiView style={{ flexDirection: 'row' }}>

                  <Controller
                    control={control}
                    name="image"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <React.Fragment>
                        <Image
                          source={value}
                          height={100}
                          width={100}
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

                <Text category='s1' style={{ marginTop: 8 }}>Tags</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTagInput onTagsChange={handleTagsChange} />
                  )}
                  name='tags'
                />
                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>visible
                </Text>
                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Corporates</Text>
                {visibleCorporates.length > 0 && <Controller
                  control={control}
                  name="visible_corporate"
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Select
                        value={visibleCorporates[value - 1].name?.en}
                        selectedIndex={value}
                        onSelect={(value) => {
                          onChange(value)
                          queryClient.invalidateQueries({ queryKey: ['corporatesList'] })
                        }}
                      >
                        {visibleCorporates.map((category, index) => (
                          <SelectItem key={index} title={category?.name?.en} />
                        ))}
                      </Select>
                    )
                  }}
                />}

                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Service providers</Text>
                {visibleServiceProviders.length > 0 && <Controller
                  control={control}
                  name="visible_service_provider"
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Select
                        value={visibleCorporates[value - 1].name?.en}
                        selectedIndex={value}
                        onSelect={(value) => {
                          onChange(value)
                          queryClient.invalidateQueries({ queryKey: ['serviceProvidersList'] })
                        }}
                      >
                        {visibleCorporates.map((category, index) => (
                          <SelectItem key={index} title={category?.name?.en} />
                        ))}
                      </Select>
                    )
                  }}
                />}
                <Text category='s1' style={{ marginBottom: 4,marginTop:8 }}>News category</Text>

                {categories.length > 0 && <Controller
                  control={control}
                  name="news_category"
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Select
                        value={categories[value - 1].name?.en}
                        selectedIndex={value}
                        onSelect={(value) => {
                          onChange(value)
                          queryClient.invalidateQueries({ queryKey: ['newsSubCategories'] })
                        }}
                      >
                        {categories.map((category, index) => (
                          <SelectItem key={index} title={category?.name?.en} />
                        ))}
                      </Select>
                    )
                  }} 
                />}

                <Text category='s1' style={{ marginTop: 8, marginBottom: 4 }}>News subcategory</Text>
                {subCategories.length > 0 && (
                  <Controller
                    control={control}
                    name="news_subcategory"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Select a subcategory"
                        // value={subCategories[value - 1].name?.en}
                        value={subCategories[value - 1]?.name?.en}
                        onSelect={onChange}
                      >
                        {subCategories.map((subcategory, index) => (
                          <SelectItem key={index} title={subcategory?.name?.en} />
                        ))}
                      </Select>
                    )}
                  />
                )}


                <Controller
                  control={control}
                  name="createdby"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Created by'
                      placeholder={"News created by"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.createdby ? 'danger' : 'success'}`}
                      caption={`${errors?.createdby ? errors.createdby?.message : ''}`}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="is_approved"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Toggle
                      style={[styles.marginVertical, styles.alignSelf]}
                      checked={value === 1}
                      onChange={(newValue) => {
                        onChange(newValue ? 1 : 0);
                      }}
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
                <Controller
                  control={control}
                  name="is_current"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Toggle
                      style={[styles.marginVertical, styles.alignSelf]}
                      checked={value === 1}
                      onChange={(newValue) => {
                        onChange(newValue ? 1 : 0);
                      }}
                      status={`${errors?.is_current ? 'danger' : 'primary'}`}
                    >
                      Is this news currently available?
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
                  style={{ flexDirection: 'row', marginTop: 8 }}
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
    marginBottom: 8,
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
  editor: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 1,
  },
  rich: {
    minHeight: 500,
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 3,
  },
})