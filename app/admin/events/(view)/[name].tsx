import React, { useState, useEffect,useRef } from 'react'
import { Image, SafeAreaView } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle,IndexPath, Select, SelectItem } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView } from 'moti'
import { StyleSheet, ImageBackground, TouchableOpacity, ImageProps } from "react-native"
import { useRouter, useSearchParams, Link } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEvent, updateEvents, getCorporatesList, getServiceProvidersList, getEventCategories, getEventSubCategories, } from 'apis/admin/events'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/admin/events/reaction'
import CustomTagInput from 'components/admin/events/tags'
import { useSearch } from '@tanstack/react-location'
import PlaceholderImage from 'assets/images/favicon.png'
import ErrorImage from 'assets/images/Error404.png'

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

const schema = z.object({
  id: z.string(),
  title: z.string().min(3, { message: 'Event title is required' }).max(256, { message: 'Event title is too long' }),
  content: z.string().min(3, { message: 'Event content is required' }).max(256, { message: 'Event content is too long' }),
  image: z.object({}).optional(),
  speakar: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  price: z.number().finite().optional(),
  organization: z.string().optional(),
  event_type: z.string().optional(),
  location: z.string().optional(),
  show_attendees: z.number().min(0).max(1),
  is_approved: z.number().min(0).max(1),
  is_public: z.number().min(0).max(1),
  is_published:z.number().min(0).max(1),
  createdby: z.string().optional(),
  event_subcategory: z.object({
    row: z.number().gte(0, { message: 'Selecte event subcategory' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  event_category: z.object({
    row: z.number().gte(0, { message: 'Selecte event category' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  created_at: z.string().optional(),
  visible: z.object({
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
    const {id} = useSearchParams();
  //Image Picker
  const [eventsdata = {}, setEventsData] = useMMKVObject('eventsdata', storage)
  const { push, replace, back, parseNextPath } = useRouter()
  const queryClient = useQueryClient()
  const theme = useTheme();
  const [listEnabled, setListEnabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showLayout1, setShowLayout1] = useState(true);
  const [created_at, setCreatedAt] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [eventContent, setEventContent] = useMMKVObject('');
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
  // }
  // function editorInitializedCallback() {
  //   RichText.current?.registerToolbar(function (items) {
  //     // items contain all the actions that are currently active
  //     // 
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
      mutationFn: (events) => updateEvents(events),
      onSuccess(data) {
        const { id, title,
          content,
          image,
          speakar,
          start_time,
          end_time,
          price,
          organization,
          event_type,
          location,
          show_attendees,
          is_approved,
          is_public,
          is_published,
          createdby,
          event_category,
          event_subcategory,
          created_at,
          visible,
          tags, } = data?.data?.data;

        const events = {
          id,
          title: title?.en,
          content: content?.en,
          image,
          speakar,
          start_time,
          end_time,
          price,
          organization,
          event_type,
          location,
          show_attendees,
          is_approved,
          is_published,
          is_public,
          createdby,
          event_category,
          event_subcategory,
          created_at,
          visible,
          tags,
        }
        setEventsData(events);
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
  const { control, handleSubmit, formState: { errors }, setValue, getValues, setError, reset } = useForm({
    defaultValues: {
      id: id,
      title: '',
      content: '',
      image: PlaceholderImage,
      created_at: '',
      is_approved: true,
      is_public: true,
      speakar: '',
      start_time: '',
      end_time: '',
      price: '',
      organization: '',
      event_type: '',
      location: '',
      show_attendees: true,
      is_published:true,
      createdby: '',
      event_category: new IndexPath(0),
      event_subcategory: new IndexPath(0),
      tags: [],
      visible: new IndexPath(0),
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    enabled: true,
    queryKey: ['events', id],
    queryFn: ({ queryKey }) => getEvent(queryKey[1]),
    onSuccess(data) {
      const { id, title, content,
        image, speakar,
        start_time,
        end_time,
        price,
        organization,
        event_type,
        location,
        show_attendees,
        is_approved,
        is_public,
        is_published,
        createdby,
        event_category,
        event_subcategory,
        visible,
        created_at, } = data?.data?.data;

      const events = {
        id,
        title: title?.en,
        content: content?.en,
        image: { uri: image, width: 100, height: 100, },
        speakar,
        start_time,
        end_time,
        price,
        organization,
        event_type,
        location,
        show_attendees,
        is_published,
        is_approved,
        is_public,
        createdby: createdby?.first_name,
        event_category,
        event_subcategory,
        created_at,
        visible,
      }

      reset(events)
    }
  })

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Events details updated'
    });
  }

  const onSubmit = data => {
    // console.log(data)
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

  const { data: categoriesData, } = useQuery({
    queryKey: ['eventCategories'],
    queryFn: () => getEventCategories(),
    onSuccess(data) {
      setCategories([{ id: "1234", name: { 'en': 'Select Category' } }, ...data?.data?.data])
    }
  })

  const {
    fetchStatus,
    data: eventSubCategoriesData,
    refetch: subCategoryRefetch
  } = useQuery({
    queryKey: ['eventSubCategories', getValues('event_category').row],
    queryFn: () => getEventSubCategories(categories[getValues('event_category').row].id),
    enabled: categories.length > 0,
    onSuccess(data) {
      setValue('event_subcategory', new IndexPath(0))
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
        const croppedImage = { uri: image.sourceURL, width: 100, height: 100, mime: image.mime }
        setValue('image', croppedImage)

      });
  }

  //----------------------------------------------------

  // React.useEffect(() => {
  //   refetch();
  // }, [])

  // console.log("Errors " + JSON.stringify(errors))

  if (isLoading) {
    return <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </MotiView>
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
      <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get events.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()}
        style={{ width: "50%" }} accessoryLeft={
          <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
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
                  {getValues('title')}
                </Text>
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

                <Reaction id={'id'} />
              </MotiView>

              <Text category='s1' style={{ marginLeft: 8, }}>Content</Text>
              <Text category='s1' style={{ padding: 8, color: theme['color-primary-600'] }}>
                {getValues('content')}
                {/* hswgdvhwdvjwdhb hdbjvchsdbvihw hbsdjfhbwkfhw */}
              </Text>

              <MotiView style={{ flexDirection: 'row', padding: 8 }}>
                <Text category='s2' >Author :</Text>
                <Text style={{ marginLeft: 8, color: theme['color-primary-500'] }} category='s2'>
                  {/* {getValues('author')} */} Eldersindia
                </Text>
              </MotiView>

              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Start time : </Text>
                <Text category='s2' style={{ color: theme['color-success-600'] }}>
                  {getValues('start_time')}
                  12.00 pm
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>End time : </Text>
                <Text category='s2' style={{ color: theme['color-success-600'] }}>
                  {getValues('end_time')}
                  02.00 pm
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Creadted at : </Text>
                <Text category='s2' style={{ color: theme['color-success-600'] }}>
                  {formatDate(getValues('created_at'))}
                  {/* 26-Feb-2023 12.00 pm */}
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Organization : </Text>
                <Text category='s2' style={{ color: theme['color-warning-600'] }}>
                  {getValues('organization')}
                  {/* Elders India. */}
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Location : </Text>
                <Text category='s2'>
                  {getValues('location')}
                  {/* Bangalore */}
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Event type : </Text>
                <Text category='s2' style={{ color: theme['color-warning-600'] }}>
                  {getValues('event_type')}
                  {/* Social awareness. */}
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Price for the event : </Text>
                <Text category='h6' style={{ color: theme['color-danger-800'], marginLeft: 12 }}>
                  {getValues('price')}
                  {/* Free */}
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Creadted by : </Text>
                <Text category='s2' style={{ color: theme['color-primary-600'] }}>
                  {/* {getValues('creadted_by')}  */}
                  Manoj
                </Text>
              </MotiView>
              {/* <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Event category : </Text>
                <Text category='s2' style={{ color: theme['color-warning-600'] }}>
                  {getValues('event_category')}
                  
                </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text category='s1' style={{ marginLeft: 8, }}>Event subcategory : </Text>
                <Text category='s2' style={{ color: theme['color-warning-600'] }}>
                  {getValues('event_subcategory')}
                  
                </Text>
              </MotiView> */}
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
                <Text category='s1'>{getValues('is_approved') ? 'This event is  approved.' : 'This event is not approved.'}</Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
                {getValues('is_public') ? (
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
                <Text category='s1'>{getValues('is_public') ? 'This event is  public.' : 'This event is not public.'}</Text>
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
                <Text category='s1'>{getValues('is_published') ? 'This event is  public.' : 'This event is not published.'}</Text>
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
                      placeholder={"Event title"}
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
                            initialContentHTML={eventContent}
                            disabled={false}
                            containerStyle={styles.editor}
                            ref={RichText}
                            initialHeight={150}
                            placeholder={"Start Writing Here"}
                            onChange={(text) => setEventContent(text)}
                            // editorInitializedCallback={editorInitializedCallback}
                            // onHeightChange={handleHeightChange}
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

                <Text category='s1' style={{ marginBottom: 4, }}>Events category</Text>

                {categories.length > 0 && <Controller
                  control={control}
                  name="event_category"
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Select
                        value={categories[value - 1].name?.en}
                        selectedIndex={value}
                        onSelect={(value) => {
                          onChange(value)
                          queryClient.invalidateQueries({ queryKey: ['eventSubCategories'] })
                        }}
                      >
                        {categories.map((category, index) => (
                          <SelectItem key={index} title={category.name?.en} />
                        ))}
                      </Select>
                    )
                  }}
                />}

                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Events subcategory</Text>
                {subCategories.length > 0 && (
                  <Controller
                    control={control}
                    name="event_subcategory"
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
                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Event visible for Corporates</Text>
                {visibleCorporates.length > 0 && <Controller
                  control={control}
                  name="visible"
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

                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Event visible for service providers</Text>
                {visibleServiceProviders.length > 0 && <Controller
                  control={control}
                  name="visible"
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Select
                        value={visibleServiceProviders[value - 1].name?.en}
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
                <Controller
                  control={control}
                  name="speakar"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Speakar'
                      placeholder={"Event speakar"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.speakar ? 'danger' : 'success'}`}
                      caption={`${errors?.speakar ? errors.speakar?.message : ''}`}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="created_at"
                  render={({ field: { onChange, onBlur, value } }) => {
                    setCreatedAt(formatDate(value));
                    return (
                      <Input
                        style={styles.marginVertical}
                        label='Created At'
                        placeholder={"News created at"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={created_at}
                        size='large'
                        status={`${errors?.created_at ? 'danger' : 'success'}`}
                        caption={`${errors?.created_at ? errors.created_at?.message : ''}`}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="start_time"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Start time'
                      placeholder={"Event start time"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.start_time ? 'danger' : 'success'}`}
                      caption={`${errors?.start_time ? errors.start_time?.message : ''}`}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="end_time"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='End time'
                      placeholder={"Event end time"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.end_time ? 'danger' : 'success'}`}
                      caption={`${errors?.end_time ? errors.end_time?.message : ''}`}
                    />
                  )}
                />
                {/* <MotiView style={{ flexDirection: 'row' }}>
              <Button
                onPress={() => {
                  setIsClicked(!isClicked);
                  setListEnabled(!listEnabled);
                }}
                status="primary"
                appearance="ghost"
                style={{ width: 4, marginTop: 4 }}
                accessoryLeft={
                  isClicked ? (
                    <PriceIconFilled color={theme['color-success-600']} />
                  ) : (

                    <PriceIcon color={theme['color-success-700']} />
                  )
                }
              />
              <Text style={{ marginTop: 20 }}>Is there a charge for attending this event?</Text></MotiView>
            {listEnabled && (
              <MotiView>
                <Input
                  style={styles.marginVertical}
                  label='Price'
                  placeholder={"What is the cost per person for this event?"}
                  // onBlur={onBlur}
                  // onChangeText={onChange}
                  // value={value}
                  size='large'
                  status={`${errors?.price ? 'danger' : 'success'}`}
                  caption={`${errors?.price ? errors.price?.message : ''}`}
                />
              </MotiView>
  
            )} */}

                <Controller
                  control={control}
                  name="organization"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Organization'
                      placeholder={"Event organization"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.organization ? 'danger' : 'success'}`}
                      caption={`${errors?.organization ? errors.organization?.message : ''}`}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="location"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='location'
                      placeholder={"Event location"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.location ? 'danger' : 'success'}`}
                      caption={`${errors?.location ? errors.location?.message : ''}`}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="event_type"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Event type'
                      placeholder={"Event event type"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.event_type ? 'danger' : 'success'}`}
                      caption={`${errors?.event_type ? errors.event_type?.message : ''}`}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="show_attendees"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Toggle
                      style={[styles.marginVertical, styles.alignSelf]}
                      checked={value === 1}
                      onChange={(newValue) => {
                        onChange(newValue ? 1 : 0);
                      }}
                      status={`${errors?.is_approved ? 'danger' : 'primary'}`}
                    >
                      Do you want to show attendees of this event?
                    </Toggle>
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
                      Is this event approved?
                    </Toggle>
                  )}
                />
                {/* <MotiView style={{ flexDirection: 'row' }}>
                  <Icon
                    style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                    fill={theme['color-warning-500']}
                    name={'checkmark-outline'}
                    pack={'ionicons'}
                  />
                  <Text>Public</Text>
                </MotiView> */}

                <Controller
                  control={control}
                  name="is_public"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Toggle
                      style={[styles.marginVertical, styles.alignSelf]}
                      checked={value === 1}
                      onChange={(newValue) => {
                        onChange(newValue ? 1 : 0);
                      }}
                      status={`${errors?.is_approved ? 'danger' : 'primary'}`}
                    >
                      Is this event public?
                    </Toggle>
                  )}
                />
                <Controller
                  control={control}
                  name="createdby"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Created by'
                      placeholder={"Event created by"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.createdby ? 'danger' : 'success'}`}
                      caption={`${errors?.createdby ? errors.createdby?.message : ''}`}
                    />
                  )}
                />

                <MotiView
                  style={{ flexDirection: 'row', marginBottom: 40 }}
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