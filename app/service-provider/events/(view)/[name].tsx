import React, { useState, useEffect } from 'react'
import { Link, useRouter, useSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { createParam } from "solito"
import { Text, Input, Toggle, Button, Spinner, Select, SelectItem, IndexPath, Layout, useTheme, Icon, IconProps, IconElement } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView } from 'moti'
import { StyleSheet, ImageBackground, ImageProps, TouchableOpacity, Image } from "react-native"
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEventsRead, updateEvents } from 'apis/corporate/events'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/corporate/events/reaction'

const PriceIcon = (props: IconProps): IconElement<ImageProps> =>
  <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
    name='square' width={32} heigth={32} />

const PriceIconFilled = (props: IconProps): IconElement<ImageProps> =>
  <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
    name='checkmark-square-2' width={32} heigth={32} />
const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />


import PlaceholderImage from 'assets/images/favicon.png'
import { useSearch } from '@tanstack/react-location'


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
  show_attendees: z.boolean({
    required_error: "approved events is required",
    invalid_type_error: "approved events must be a boolean",
  }),
  is_approved: z.boolean({
    required_error: "approved events is required",
    invalid_type_error: "approved events must be a boolean",
  }),
  is_public: z.boolean({
    required_error: "published events is required",
    invalid_type_error: "published events must be a boolean",
  }),
  createdby: z.string().optional(),
  event_category: z.string().optional(),
  event_subcategory: z.string().optional(),
  created_at: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'Events created date is too long' }),
});

export default function Page({ navigation }) {
    const {id} = useSearchParams();
  //Image Picker
  const [image, setImage] = useState(null);
  const [eventsdata = {}, setEventsData] = useMMKVObject('eventsdata', storage)
  const { push, replace, back } = useRouter()
  const queryClient = useQueryClient()
  const theme = useTheme();
  const [listEnabled, setListEnabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
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
          createdby,
          event_category,
          event_subcategory,
          created_at, } = data?.data?.data;

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
          is_public,
          createdby,
          event_category,
          event_subcategory,
          created_at,
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
      createdby: '',
      event_category: '',
      event_subcategory: '',
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    enabled: true,
    queryKey: ['events', id],
    queryFn: ({ queryKey }) => getEventsRead(queryKey[1]),
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
        createdby,
        event_category,
        event_subcategory,
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
        is_approved,
        is_public,
        createdby: createdby?.name,
        event_category: event_category?.name?.en,
        event_subcategory: event_subcategory?.name?.en,
        created_at,
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
        console.log("blog console", croppedImage)

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
      <Text category='s1' status="danger" style={{ textAlign: 'center' }}>Failed to get event details.</Text>
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
              <SolitoImage
                src={getValues('image')}
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
                      <Text category='s2' style={{color:theme['color-success-600']}}>
                        {getValues('start_time')} 
                        12.00 pm
                      </Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text category='s1' style={{ marginLeft: 8, }}>End time : </Text>
                      <Text category='s2'style={{color:theme['color-success-600']}}>   
                        {getValues('end_time')} 
                        02.00 pm
                      </Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text category='s1' style={{ marginLeft: 8, }}>Creadted at : </Text>
                      <Text category='s2'style={{color:theme['color-success-600']}}>   
                        {getValues('created_at')} 
                        {/* 26-Feb-2023 12.00 pm */}
                      </Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text category='s1' style={{ marginLeft: 8, }}>Organization : </Text>
                      <Text category='s2'style={{color:theme['color-warning-600']}}>   
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
                      <Text category='s2'style={{color:theme['color-warning-600']}}>   
                        {getValues('event_type')} 
                        {/* Social awareness. */}
                      </Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text category='s1' style={{ marginLeft: 8, }}>Price for the event : </Text>
                      <Text category='h6'style={{color:theme['color-danger-800'], marginLeft:12}}>   
                        {getValues('price')}
                        {/* Free */}
                      </Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text category='s1' style={{ marginLeft: 8, }}>Creadted by : </Text>
                      <Text category='s2'style={{color:theme['color-primary-600']}}>   
                        {/* {getValues('creadted_by')}  */}
                        Manoj
                      </Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text category='s1' style={{ marginLeft: 8, }}>Event category : </Text>
                      <Text category='s2'style={{color:theme['color-warning-600']}}>   
                        {getValues('event_category')} 
                        {/* Social awareness. */}
                      </Text>
                    </MotiView>
                    <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text category='s1' style={{ marginLeft: 8, }}>Event subcategory : </Text>
                      <Text category='s2'style={{color:theme['color-warning-600']}}>   
                        {getValues('event_subcategory')} 
                        {/* Elders health. */}
                      </Text>
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
                <Controller
                  control={control}
                  name="content"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Content'
                      placeholder={"Event content"}
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
                        <SolitoImage
                          src={value}
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

                {/* <Controller
              control={control}
              name="created_at"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Created at'
                  placeholder={"Event created at"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.created_at ? 'danger' : 'success'}`}
                  caption={`${errors?.created_at ? errors.created_at?.message : ''}`}
                />
              )}
            /> */}
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
                  checked={value}
                  onChange={onChange}
                  status={`${errors?.is_approved ? 'danger' : 'primary'}`}
                >
                  Show attendees?
                </Toggle>
              )}
            />
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
                  Approved
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
                  checked={value}
                  onChange={onChange}
                  status={`${errors?.is_approved ? 'danger' : 'primary'}`}
                >
                  Public
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
                <Controller
                  control={control}
                  name="event_category"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Event category'
                      placeholder={"Event category"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.event_category ? 'danger' : 'success'}`}
                      caption={`${errors?.event_category ? errors.event_category?.message : ''}`}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="event_subcategory"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Event subcategory'
                      placeholder={"Event subcategory"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      size='large'
                      status={`${errors?.event_subcategory ? 'danger' : 'success'}`}
                      caption={`${errors?.event_subcategory ? errors.event_subcategory?.message : ''}`}
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
})