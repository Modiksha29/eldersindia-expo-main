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
import { saveNewsAsDraft, createNews, getNewsSubCategories, getNewsCategories, getCorporatesList, getServiceProvidersList } from 'apis/admin/news'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import CustomTagInput from "components/admin/news/tags";

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />


const schema = z.object({

    title: z.string().min(3, { message: 'News title is required' }).max(256, { message: 'News title is too long' }),
    content: z.string().optional(),
    // .min(3, { message: 'News content is required' }).max(256, { message: 'News content is too long' }),
    image: z.object({}).optional(),
    createdby: z.string().optional(),
    tags: z.array(
        z.object({
            id: z.string(),
            name: z.object({
                en: z.string(),
            }),
        })
    ),
    news_subcategory: z.object({
        row: z.number().gte(0, { message: 'Selecte news subcategory' }).lte(2, { message: 'Aleast select one' }),
        section: z.number().optional()
    }),
    news_category: z.object({
        row: z.number().gte(0, { message: 'Selecte news category' }).lte(2, { message: 'Aleast select one' }),
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
    is_published: z.number().min(0).max(1),
});

export default function last_page() {
    const [image, setImage] = useState(null);
    const params = useSearchParams()
    const { id } = params;
    const RichText = useRef();
    const [newsdata = {}, setNewsData] = useMMKVObject('newsdata', storage)
    const { push, replace, back, parseNextPath } = useRouter()
    const queryClient = useQueryClient()
    const theme = useTheme();
    const [showLayout1, setShowLayout1] = useState(true);
    const [newsContent, setNewsContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [visibleCorporates, setVisibleCorporates] = useState([])
    const [visibleServiceProviders, setVisibleServiceProviders] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    // const toggleLayout = () => {
    //   setShowLayout1(!showLayout1);
    // };
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
            mutationFn: (news) => createNews(news),
            onSuccess(data) {
                const { id, title, content, slug, visible_corporate,
                    visible_service_provider, image, is_approved, user_id,
                    published_at, is_published, is_current, tags,
                    news_subcategory, created_at, createdby, updated_at, news_category } = data?.data?.data;

                const news = {
                    title: '',
                    content: '',
                    image: '',
                    news_category: '',
                    news_subcategory: '',
                    createdby: '',
                    tags: '',
                    visible_corporate: '',
                    visible_service_provider: '',
                    is_published: false,
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
            title: '',
            content: '',
            image: PlaceholderImage,
            news_category: new IndexPath(0),
            news_subcategory: new IndexPath(0),
            visible_corporate: new IndexPath(0),
            visible_service_provider: new IndexPath(0),
            createdby: '',
            tags: [],
            is_published: false,
        },
        resolver: zodResolver(schema),
    });

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

    // console.log("CATEGORYID", getValues('news_category').row)
    // console.log('Categories length:', categories.length);


    const isPresented = () => back();

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Updated',
            text2: 'News details updated'
        });
    }
    const handleReset = () => {
        reset();
        RichText.current?.setContentHTML("");
    };

    const handleTagsChange = (selectedTags) => {
        setValue('tags', selectedTags)
    };

    // const handleSaveDraft = async () => {
    //   const formData = getValues();
    //   console.log('Form data saved:', formData);

    //   try {
    //     const response = await saveNewsAsDraft(formData);
    //     console.log('This event saved as draft:', response.data);
    //   } catch (error) {
    //     console.error('Error saving event as draft:', error);
    //   }
    // };

    const publish = async (data) => {
        data.news_category = data.news_category?.row + 1
        data.news_subcategory = data.news_subcategory?.row + 1

        data.visible_corporate = data.visible_corporate?.row + 1
        data.visible_service_provider = data.visible_service_provider?.row + 1

        data.is_published = true
        mutate(data)
    };

    const saveDraft = async (data) => {
        data.news_category = data.news_category?.row + 1
        data.news_subcategory = data.news_subcategory?.row + 1

        data.visible_corporate = data.visible_corporate?.row + 1
        data.visible_service_provider = data.visible_service_provider?.row + 1

        data.is_published = false
        mutate(data)
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
                console.log("new console", croppedImage)

            });
    }

    //----------------------------------------------------

    // React.useEffect(() => {
    //   refetch();
    // }, [])

    // console.log("Errors " + JSON.stringify(errors))
    console.log('Categories length:', categories.length);

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

                        <Text category='s1'>Tags</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTagInput onTagsChange={handleTagsChange} />
                            )}
                            name='tags'
                        />

                        <Text category='s1' style={{ marginBottom: 4, }}>News category</Text>

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
                        <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>News visible for Corporates</Text>
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

                        <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>News visible for service providers</Text>
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
                            style={{
                                flexDirection: 'row',
                                marginTop: 8
                            }}
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
        minHeight: 300,
        flex: 1,
    },
})
