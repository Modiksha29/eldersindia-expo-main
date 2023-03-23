import React, { useState, useEffect, useRef } from 'react'
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle, Select, SelectItem, } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView, Image } from 'moti'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions, ImageLoadEventData } from "react-native"
import { useRouter, useSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlogs } from 'apis/service-provider/blogs'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import ImagePicker from 'react-native-image-crop-picker'
// import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import PlaceholderImage from 'assets/images/favicon.png'

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />

const schema = z.object({

  title: z.string().min(3, { message: 'Blogs title is required' }).max(256, { message: 'Blogs title is too long' }),
  content: z.string().min(3, { message: 'Blogs content is required' }).max(256, { message: 'Blogs content is too long' }),
  image: z.object({}).optional(),
  tags: z.object({}).optional(),
  created_by: z.string().min(3, { message: 'Name is required' }).max(256, { message: 'Blogs created date is too long' }),
});

// const mainColor = '#3ca897';

export default function Page() {
  const params = useSearchParams()
  const { id } = params;
  const [blogContent, setBlogContent] = useState('');
  // const RichText = useRef();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [blogsdata = {}, setBlogsData] = useMMKVObject('blogsdata', storage)
  const { push, replace, back } = useRouter()
  // const [tags, setTags] = useState({
  //   tag: '',
  //   tagsArray: [],
  // });
  // const [tagsColor, setTagsColor] = useState(mainColor);
  // const [tagsText, setTagsText] = useState('#fff');

  // const updateTagState = (state) => {
  //   setTags(state);
  // };

  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }
  // function editorInitializedCallback() {
  //   RichText.current?.registerToolbar(function (items) {
  //     // items contain all the actions that are currently active
  //     console.log(
  //       "Toolbar click, selected items (insert end callback):",
  //       items
  //     );
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
      mutationFn: (blog) => createBlogs(blog),
      onSuccess(data) {
        const { id, title, content, image, created_by, author, tags } = data?.data?.data;

        const blogs = {
          title: '',
          content: '',
          image: PlaceholderImage,
          created_by: '',
          author: '',
          tags: '',
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
  const { control, handleSubmit, formState: { errors }, setValue, getValues, setError, reset } = useForm({
    defaultValues: {
      title: '',
      content: '',
      image: PlaceholderImage,
      created_by: '',
      author: '',
      tags: '',
    },
    resolver: zodResolver(schema),
  });


  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Blogs details updated'
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

  const handleReset = () => {
    reset();
  };

  const handleSaveDraft = () => {
    // You can save the form data to a database or local storage
    const formData = getValues();
    console.log('Form data saved:', formData);
  };

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
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  placeholder={"Blogs title"}
                  label='Title'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  status={`${errors?.title ? 'danger' : 'success'}`}
                  caption={`${errors?.title ? errors.title?.message : ''}`}
                />
              )}
              name='title'
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
            <Text>Content</Text>

            <MotiView style={{ marginBottom: 8, marginTop: 4 }}>
              {/* <Controller
                control={control}
                name="content"
                render={({ field: { onChange, onBlur, value } }) => (
                  <SafeAreaView>
                    <ScrollView>
                        <RichEditor
                          initialContentHTML={blogContent}
                          disabled={false}
                          containerStyle={styles.editor}
                          ref={RichText}
                          initialHeight={150}
                          placeholder={"Start Writing Here"}
                          onChange={(text) => setBlogContent(text)}
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
              /> */}

            </MotiView>

            <Text>Blogs category</Text>

            <Controller
              control={control}
              // --------------------need to chnage------
              name="tags"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  style={{ marginTop: 8, marginBottom: 8 }}
                  placeholder='Blogs category'
                  selectedIndex={selectedIndex}
                  //disabled={true}
                  onSelect={index => setSelectedIndex(index)}>
                  <SelectItem title='Option 1' />
                  <SelectItem title='Option 2' />
                  <SelectItem title='Option 3' />
                </Select>
              )}
            />

            {/* <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.marginVertical}
                label='Tags name'
                placeholder={"Blogs tags name"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                size='large'
                status={`${errors?.tags ? 'danger' : 'success'}`}
                caption={`${errors?.tags ? errors.tags?.message : ''}`}
              />
            )}
          /> */}
            {/* <TagInput
              updateState={updateTagState}
              tags={tags}
              placeholder="Tags..."
              label="Press comma & space to add a tag"
              labelStyle={{ color: '#fff' }}
              leftElement={
                <Icon
                  name={'tag-multiple'}
                  type={'material-community'}
                  color={tagsText}
                />
              }
              leftElementContainerStyle={{ marginLeft: 3 }}
              containerStyle={{ width: Dimensions.get('window').width - 40 }}
              inputContainerStyle={[
                styles.textInput,
                { backgroundColor: tagsColor },
              ]}
              inputStyle={{ color: tagsText }}
              onFocus={() => {
                setTagsColor('#fff');
                setTagsText(mainColor);
              }}
              onBlur={() => {
                setTagsColor(mainColor);
                setTagsText('#fff');
              }}
              autoCorrect={false}
              tagStyle={styles.tag}
              tagTextStyle={styles.tagText}
              keysForTag={', '}
            /> */}

            <Controller
              control={control}
              name="created_by"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Created by'
                  placeholder={"Blogs created by"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.created_by ? 'danger' : 'success'}`}
                  caption={`${errors?.created_by ? errors.created_by?.message : ''}`}
                />
              )}
            />

            <MotiView
              style={{ flexDirection: 'row', marginBottom: 50 }}
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
  );
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 4,
    marginBottom: 16,
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