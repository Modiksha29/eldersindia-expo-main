import React, { useState, useEffect, useRef } from 'react'
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle, Select, SelectItem,IndexPath } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView, Image } from 'moti'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions, ImageLoadEventData } from "react-native"
import { useRouter, useSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent } from 'apis/admin/events'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import ImagePicker from 'react-native-image-crop-picker'
import PlaceholderImage from 'assets/images/favicon.png'
import  { createEvents, getEventCategories, getEventSubCategories, saveEventAsDraft,getCorporatesList, getServiceProvidersList, }from 'apis/admin/events'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import CustomTagInput from "components/admin/events/tags";

const PriceIcon = (props: IconProps): IconElement<ImageProps> =>
  <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
    name='square' width={32} heigth={32} />

const PriceIconFilled = (props: IconProps): IconElement<ImageProps> =>
  <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
    name='checkmark-square-2' width={32} heigth={32} />

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />

const schema = z.object({
  title: z.string().min(3, { message: 'Event title is required' }).max(256, { message: 'Event title is too long' }),
  content: z.string().min(3, { message: 'Event content is required' }).max(256, { message: 'Event content is too long' }),
  image: z.object({}).optional(),
  speakar: z.string().optional(),
  start_time: z.string(),
  end_time: z.string(),
  price: z.number().finite().optional(),
  organization: z.string().optional(),
  event_type: z.string().optional(),
  location: z.string().optional(),
  is_published:z.number().min(0).max(1),
  show_attendees: z.boolean({
    required_error: "approved events is required",
    invalid_type_error: "approved events must be a boolean",
  }),
  createdby: z.string().optional(),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.object({
        en: z.string(),
      }),
    })),
  event_subcategory: z.object({
    row: z.number().gte(0, { message: 'Selecte event subcategory' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  event_category: z.object({
    row: z.number().gte(0, { message: 'Selecte event category' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  visible_corporate: z.object({
    row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  visible_service_provider: z.object({
    row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
});

export default function Page() {
  const params = useSearchParams()
  const { id } = params;
  const { push, replace, back } = useRouter()
  const queryClient = useQueryClient()
  const [eventsdata = {}, setEventsData] = useMMKVObject('eventsdata', storage)
  const [eventContent, setEventContent] = useState('');
  const RichText = useRef();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const theme = useTheme();
  const [listEnabled, setListEnabled] = useState(false);
  const [listPriceEnabled, setListPriceEnabled] = useState(false);
  const [eventPrice, seteventPrice] = useState(false);
  const [showAttendees, setshowAttendees] = useState(false);
  const [showLayout1, setShowLayout1] = useState(true);
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [visibleCorporates, setVisibleCorporates] = useState([])
  const [visibleServiceProviders, setVisibleServiceProviders] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);

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
      mutationFn: (events) => createEvents(events),
      onSuccess(data) {
        const {
          id,
          title,
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
          createdby,
          event_category,
          event_subcategory,
          tags,
          visible_corporate,
          visible_service_provider,
          is_published,
        } = data?.data?.data;

        const events = {
          id,
          title: '',
          content: '',
          image: PlaceholderImage,
          speakar: '',
          start_time: '',
          end_time: '',
          price: '',
          organization: '',
          event_type: '',
          location: '',
          show_attendees: true,
          createdby: '',
          event_category: '',
          event_subcategory: '',
          visible_corporate: '',
          visible_service_provider:'',
          tags: [],
          is_published: false,
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
      id:'',
      title: '',
      content: '',
      image: PlaceholderImage,
      speakar: '',
      start_time: '',
      end_time: '',
      price: '',
      organization: '',
      event_type: '',
      location: '',
      show_attendees: true,
      createdby: '',
      event_category: new IndexPath(0),
      event_subcategory: new IndexPath(0),
      tags: [],
      visible_corporate: new IndexPath(0),
      visible_service_provider: new IndexPath(0),
      is_published: false,
    },
    resolver: zodResolver(schema),
  });
  console.log("event create form validation error",errors)

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
      console.log(data?.data?.data)
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

  // console.log("CATEGORYID", getValues('event_category').row)
  // console.log('Categories length:', categories.length);

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Events details updated'
    });
  }

  const publish = async (data) => {
    data.event_category = data.event_category?.row + 1
    data.event_subcategory = data.event_subcategory?.row + 1

    data.visible_corporate = data.visible_corporate?.row + 1
    data.visible_service_provider = data.visible_service_provider?.row + 1

    data.is_published = true
    mutate(data)
  };

  const saveDraft = async (data) => {
    data.event_category = data.event_category?.row + 1
    data.event_subcategory = data.event_subcategory?.row + 1

    data.visible_corporate = data.visible_corporate?.row + 1
    data.visible_service_provider = data.visible_service_provider?.row + 1

    data.is_published = false
    mutate(data)
  };

  const handleTagsChange = (selectedTags) => {
    setValue('tags', selectedTags)
  };

  const handleReset = () => {
    reset();
    RichText.current?.setContentHTML("");
  };

  // const handleSaveDraft = async () => {
  //   const formData = getValues();
  //   console.log('Form data saved:', formData);
  
  //   try {
  //     const response = await saveEventAsDraft(formData);
  //     console.log('This event saved as draft:', response.data);
  //   } catch (error) {
  //     console.error('Error saving event as draft:', error);
  //   }
  // };
  

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
        console.log("event console", croppedImage)

      });
  }

  //----------------------------------------------------

  // React.useEffect(() => {
  //   refetch();
  // }, [])

  // console.log("Errors " + JSON.stringify(errors))


  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      // console.log(
      //   "Toolbar click, selected items (insert end callback):",
      //   items
      // );
    });
  }



  return (
    <Layout style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
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
            <Text>Content</Text>

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

            <Text category='s1'>Tags</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTagInput onTagsChange={handleTagsChange} />
              )}
              name='tags'
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

            <MotiView style={{ flexDirection: 'row' }}>
              <Button
                onPress={() => {
                  seteventPrice(!eventPrice);
                  setListPriceEnabled(!listPriceEnabled);
                }}
                status="primary"
                appearance="ghost"
                style={{ width: 4, marginTop: 4 }}
                accessoryLeft={
                  eventPrice ? (
                    <PriceIconFilled color={theme['color-success-600']} />
                  ) : (

                    <PriceIcon color={theme['color-success-700']} />
                  )
                }
              />
              <Text style={{ marginTop: 20 }}>Is there a charge for attending this event?</Text></MotiView>
            {listPriceEnabled && (
              <MotiView>
                <Input
                  style={styles.marginVertical}
                  label='Price'
                  placeholder={"What is the cost per person for this event?"}
                  // onBlur={onBlur}
                  // onChangeText={onChange}
                  // value={value}
                  size='large'
                // status={`${errors?.price ? 'danger' : 'success'}`}
                // caption={`${errors?.price ? errors.price?.message : ''}`}
                />
              </MotiView>

            )}

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

            <MotiView style={{ flexDirection: 'row', marginBottom: 4 }}>
              <Button
                onPress={() => {
                  setshowAttendees(!showAttendees);
                  setListEnabled(!listEnabled);
                }}
                status="primary"
                appearance="ghost"
                style={{ width: 4, marginTop: 4, }}
                accessoryLeft={
                  showAttendees ? (
                    <PriceIconFilled color={theme['color-success-600']} />
                  ) : (

                    <PriceIcon color={theme['color-success-700']} />
                  )
                }
              />
              <Text style={{ marginTop: 20 }} category='c1'> Would you like to see a list of attendees for this event?</Text>
            </MotiView>
            {listEnabled && (
              <MotiView>
                <Select
                  selectedIndex={selectedIndex}
                  onSelect={index => setSelectedIndex(index)}>
                  <SelectItem title='Option 1' />
                  <SelectItem title='Option 2' />
                  <SelectItem title='Option 3' />
                </Select>
              </MotiView>
            )}


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

                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Event visible for service providers</Text>
                {visibleServiceProviders.length > 0 && <Controller
                  control={control}
                  name="visible_service_provider"
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


            <MotiView
              style={{ flexDirection: 'row', marginTop: 12, marginBottom: "10%" }}
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
              <Button status='danger' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }} onPress={() => handleReset()}
                size='small'>Reset</Button>
              <Button status='warning' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }} onPress={() => handleSubmit(saveDraft)}
                size='small'>Save Draft</Button>
              <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                onPress={handleSubmit(publish)}
                size='small'>
                Publish
              </Button>

            </MotiView>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 4,
    marginBottom: 8,
  },
  alignSelf: {
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#F5FCFF",
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
  tag: {
    backgroundColor: '#fff',
  },
  tagText: {
    // color: mainColor,
  },
})

