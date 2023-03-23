import React, { useState, useEffect, useRef } from 'react'
import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle, Select, SelectItem, } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView, } from 'moti'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions, Image } from "react-native"
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEventsRead, updateEvents } from 'apis/admin/events'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/admin/events/reaction'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

const PriceIcon = (props: IconProps): IconElement<ImageProps> =>
  <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
    name='square' width={32} heigth={32} />

const PriceIconFilled = (props: IconProps): IconElement<ImageProps> =>
  <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]}
    name='checkmark-square-2' width={32} heigth={32} />

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />

import PlaceholderImage from 'assets/images/favicon.png'

const schema = z.object({
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
  createdby: z.string().optional(),
  event_category: z.string().optional(),
  event_subcategory: z.string().optional(),
});

export default function Page() {
  const { push, replace, back, } = useRouter()
  const [eventsdata = {}, setEventsData] = useMMKVObject('eventsdata', storage)
  const [eventContent, setEventContent] = useState('');
  const RichText = useRef();
  const [selectedIndex, setSelectedIndex] = React.useState();
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
        const {
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
        } = data?.data?.data;

        const events = {
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
    },
    resolver: zodResolver(schema),
  });

  // const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
  //   enabled: true,
  //   queryKey: ['events', id],
  //   queryFn: ({ queryKey }) => getEventsRead(queryKey[1]),
  //   onSuccess(data) {
  //     const { id, title, content, 
  //       image, speakar,
  //       start_time,
  //       end_time,
  //       price,
  //       organization,
  //       event_type,
  //       location,
  //       show_attendees,
  //       is_approved,
  //       is_public,
  //       createdby,
  //       event_category,
  //       event_subcategory,
  //       created_at, } = data?.data?.data;

  //     const events = {
  //       id,
  //       title: title?.en,
  //       content: content?.en,
  //       image: { uri: image, width: 100, height: 100, },
  //       speakar,
  //       start_time,
  //       end_time,
  //       price,
  //       organization,
  //       event_type,
  //       location,
  //       show_attendees,
  //       is_approved,
  //       is_public,
  //       createdby: createdby?.name,
  //       event_category: event_category?.name?.en,
  //       event_subcategory: event_subcategory?.name?.en,
  //       created_at,
  //     }

  //     reset(events)
  //   }
  // })

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Events details updated'
    });
  }

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = () => {
    reset();
  };

  const handleSaveDraft = () => {
    // You can save the form data to a database or local storage
    const formData = getValues();
    console.log('Form data saved:', formData);
  };

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


  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log(
        "Toolbar click, selected items (insert end callback):",
        items
      );
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

            <MotiView style={{ marginBottom: 8, marginTop: 4 }}>
              <Controller
                control={control}
                name="content"
                render={({ field: { onChange, onBlur, value } }) => (
                  <SafeAreaView>
                    <ScrollView>
                      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
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
                      </KeyboardAvoidingView>
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
            </MotiView>

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
                // status={`${errors?.price ? 'danger' : 'success'}`}
                // caption={`${errors?.price ? errors.price?.message : ''}`}
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

            <MotiView style={{ flexDirection: 'row', marginBottom: 4 }}>
              <Button
                onPress={() => {
                  setIsClicked(!isClicked);
                  setListEnabled(!listEnabled);
                }}
                status="primary"
                appearance="ghost"
                style={{ width: 4, marginTop: 4, }}
                accessoryLeft={
                  isClicked ? (
                    <PriceIconFilled color={theme['color-success-600']} />
                  ) : (

                    <PriceIcon color={theme['color-success-700']} />
                  )
                }
              />
              <Text style={{ marginTop: 20 }} category='c1'> Would you like to see a list of attendees for this event?</Text>
              {/* {listEnabled && (
            <Text category='s1' style={{marginTop: 20, marginLeft:20}}>20</Text>            
          )} */}
            </MotiView>

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
              style={{ flexDirection: 'row', marginBottom:"10%"}}
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
              <Button status='warning' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }} onPress={() => handleSaveDraft()}
                size='small'>Save Draft</Button>
              <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                onPress={handleSubmit(onSubmit)}
                size='small'>
                {/* {`${isMutationLoading ? 'Updating' : 'Update'}`} */}
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