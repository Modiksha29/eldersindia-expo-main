import React, { useState, useEffect, useRef } from 'react'
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle, Select, SelectItem, IndexPath } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView, Image } from 'moti'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions, ImageLoadEventData } from "react-native"
import { useRouter, useSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import ImagePicker from 'react-native-image-crop-picker'
import PlaceholderImage from 'assets/images/favicon.png'
import { createBlog, saveBlogAsDraft, getBlogCategories, getBlogSubCategories, getCorporatesList, getServiceProvidersList } from 'apis/admin/blogs'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import CustomTagInput from "components/admin/blogs/tags";


const schema = z.object({
  title: z.string().min(3, { message: 'Blogs title is required' }).max(256, { message: 'Blogs title is too long' }),
  content: z.string().min(3, { message: 'Blogs content is required' }).max(256, { message: 'Blogs content is too long' }),
  image: z.object({}).optional(),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.object({
        en: z.string(),
      }),
    })
  ),
  visible_corporate: z.object({
    row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  visible_service_provider: z.object({
    row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  author: z.string().min(3, { message: 'Name is required' }).max(256, { message: 'Blogs created date is too long' }),
  blog_subcategory: z.object({
    row: z.number().gte(0, { message: 'Selecte blog subcategory' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  blog_category: z.object({
    row: z.number().gte(0, { message: 'Selecte blog category' }).lte(2, { message: 'Aleast select one' }),
    section: z.number().optional()
  }),
  is_published: z.number().min(0).max(1),

});

// const mainColor = '#3ca897';

export default function Page() {
  const params = useSearchParams()
  const { id } = params;
  const queryClient = useQueryClient()
  const [blogContent, setBlogContent] = useMMKVObject('');
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const RichText = useRef();
  const [blogsdata = {}, setBlogsData] = useMMKVObject('blogsdata', storage)
  const { back } = useRouter()
  const [visibleCorporates, setVisibleCorporates] = useState([])
  const [visibleServiceProviders, setVisibleServiceProviders] = useState([])


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
      mutationFn: (blog) => createBlog(blog),
      onSuccess(data) {
        const { id, title,
          content, is_published, visible_service_provider,
          image, author, tags, blog_subcategory, blog_category, visible_corporate } = data?.data?.data;

        const blogs = {
          title: '',
          content: '',
          image: '',
          author: '',
          tags: [],
          blog_subcategory: '',
          blog_category: '',
          visible_corporate: '',
          visible_service_provider: '',
          is_published: false,
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
      author: '',
      tags: [],
      blog_subcategory: new IndexPath(0),
      blog_category: new IndexPath(0),
      visible_corporate: new IndexPath(0),
      visible_service_provider: new IndexPath(0),
      is_published: 0,
    },
    resolver: zodResolver(schema),

  });
  console.log("blog create form validation error", errors)

  const { data: visibleCorporatesData, } = useQuery({
    queryKey: ['corporatesList'],
    queryFn: () => getCorporatesList(),
    onSuccess(data) {
      setVisibleCorporates([{ id: "123", name: { 'en': 'Select Corporate' } }, ...data?.data?.data])
    }
  })

  const { data: visibleServiceProvidersData, } = useQuery({
    queryKey: ['serviceProvidersList'],
    queryFn: () => getServiceProvidersList(),
    onSuccess(data) {
      setVisibleServiceProviders([{ id: "123", name: { 'en': 'Select Service provider' } }, ...data?.data?.data])
    }
  })

  const { data: blogCategoriesData, } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: () => getBlogCategories(),
    onSuccess(data) {
      setCategories([{ id: "123", name: { 'en': 'Select Category' } }, ...data?.data?.data])
    }
  })

  const {
    fetchStatus,
    data: blogSubCategoriesData,
    refetch: subCategoryRefetch
  } = useQuery({
    queryKey: ['blogSubCategories', getValues('blog_category').row],
    queryFn: () => getBlogSubCategories(categories[getValues('blog_category').row].id),
    enabled: categories.length > 0,
    onSuccess(data) {
      setValue('blog_subcategory', new IndexPath(0))
      setSubCategories([{ id: "87687", name: { 'en': 'Select Sub Category' } }, ...data?.data?.data]);
    }
  });

  // console.log("CATEGORYID", getValues('blog_category').row)
  // console.log('Categories length:', categories.length);

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Blogs details updated'
    });
  }


  const publish = async (data) => {
    data.blog_category = data.blog_category?.row + 1
    data.blog_subcategory = data.blog_subcategory?.row + 1

    data.visible_corporate = data.visible_corporate?.row + 1
    data.visible_service_provider = data.visible_service_provider?.row + 1

    data.is_published = true
    mutate(data)
  };

  const saveDraft = async (data) => {
    data.blog_category = data.blog_category?.row + 1
    data.blog_subcategory = data.blog_subcategory?.row + 1

    data.visible_corporate = data.visible_corporate?.row + 1
    data.visible_service_provider = data.visible_service_provider?.row + 1

    data.is_published = false
    mutate(data)
  };

  const handleTagsChange = (selectedTags) => {
    setValue('tags', selectedTags)
  };

  const uploadPhoto = async () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        // console.log(image)
        const croppedImage = { uri: image.sourceURL, width: 100, height: 100, mime: image.mime }
        setValue('image', croppedImage)
        // console.log("blog console", croppedImage)

      });
  }
  const handleReset = () => {
    reset();
    RichText.current?.setContentHTML("");
  };

  return (
    <Layout style={{ flex: 1, }}>
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
            <Text category='s1'>Content</Text>

            {/* <MotiView style={{ marginBottom: 8, marginTop: 4 }}>
              <Controller
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

            <Text category='s1' style={{ marginBottom: 4, marginTop: 4 }}>Tags</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTagInput onTagsChange={handleTagsChange}
                />
              )}
              name='tags'
            />

            <Text category='s1' style={{ marginBottom: 4, }}>Blog category</Text>

            {categories.length > 0 && <Controller
              control={control}
              name="blog_category"
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Select
                    value={categories[value - 1].name?.en}
                    selectedIndex={value}
                    onSelect={(value) => {
                      onChange(value)
                      queryClient.invalidateQueries({ queryKey: ['blogSubCategories'] })
                    }}
                  >
                    {categories.map((category, index) => (
                      <SelectItem key={index} title={category?.name?.en} />
                    ))}
                  </Select>
                )
              }}
            />}

            <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Blog subcategory</Text>
            {subCategories.length > 0 && (
              <Controller
                control={control}
                name="blog_subcategory"
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Select a subcategory"
                    value={subCategories[value - 1].name?.en}
                    // value={}
                    onSelect={onChange}
                  >
                    {subCategories.map((subcategory, index) => (
                      <SelectItem key={index} title={subcategory?.name?.en} />
                    ))}
                  </Select>
                )}
              />
            )}
            <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Blog visible for corporates</Text>
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

            <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Blog visible for service providers</Text>
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


            <Controller
              control={control}
              name="author"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Created by'
                  placeholder={"Blogs author"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.author ? 'danger' : 'success'}`}
                  caption={`${errors?.author ? errors.author?.message : ''}`}
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
              <Button status='warning' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }} onPress={() => handleSubmit(saveDraft)}
                size='small'>Save Draft</Button>
              <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                onPress={handleSubmit(publish)}
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
