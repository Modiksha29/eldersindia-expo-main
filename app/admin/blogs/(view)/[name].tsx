import React, { useState, useEffect, useRef } from 'react'
import { Image, SafeAreaView } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle, IndexPath,Select, SelectItem } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView } from 'moti'
import { StyleSheet, ImageBackground, TouchableOpacity, ImageProps } from "react-native"
import { useRouter, useSearchParams, Link } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBlog, updateBlogs, getBlogCategories, getBlogSubCategories, getCorporatesList, getServiceProvidersList  } from 'apis/admin/blogs'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/admin/blogs/reaction'
import CustomTagInput from 'components/admin/blogs/tags'
import ErrorImage from 'assets/images/Error404.png'
import PlaceholderImage from 'assets/images/favicon.png'

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />


const schema = z.object({
    id: z.string(),
    title: z.string().min(3, { message: 'Blogs title is required' }).max(256, { message: 'Blogs title is too long' }),
    content: z.string().min(3, { message: 'Blogs content is required' }).max(256, { message: 'Blogs content is too long' }),
    image: z.object({}).optional(),
    tags: z.array(
        z.object({
            id: z.string(),
            name: z.object({
                en: z.string(),
            }),
        })),
    visible_corporate: z.object({
        row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
        section: z.number().optional()
    }),
    visible_service_provider: z.object({
        row: z.number().gte(0, { message: 'Selecte ' }).lte(2, { message: 'Aleast select one' }),
        section: z.number().optional()
    }),
    is_approved: z.number().min(0).max(1),
    published_at: z.string().optional(),
    is_published: z.boolean({
        required_error: "published blogs is required",
        invalid_type_error: "published blogs must be a boolean",
    }),
    is_featured: z.number().min(0).max(1),
    created_at: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'Blogs created date is too long' }),
    author: z.string().optional(),
    blog_subcategory: z.object({
        row: z.number().gte(0, { message: 'Selecte blog subcategory' }).lte(2, { message: 'Aleast select one' }),
        section: z.number().optional()
    }),
    blog_category: z.object({
        row: z.number().gte(0, { message: 'Selecte blog category' }).lte(2, { message: 'Aleast select one' }),
        section: z.number().optional()
    }),
    name: z.string().min(3, { message: 'Corporate name is required' }).max(256, { message: 'Corporate name is too long' }),
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
    const { id, name} = useSearchParams()
    const [blogsdata = {}, setBlogsData] = useMMKVObject('blogsdata', storage)
    const [blogContent, setBlogContent] = useMMKVObject('');
    const { push, replace, back, parseNextPath } = useRouter()
    const queryClient = useQueryClient()
    const theme = useTheme();
    const [showLayout1, setShowLayout1] = useState(true);
    const [published_at, setPublishedAt] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [visibleCorporates, setVisibleCorporates] = useState([])
    const [visibleServiceProviders, setVisibleServiceProviders] = useState([])
    const RichText = useRef();

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
            mutationFn: (blogs) => updateBlogs(blogs),
            onSuccess(data) {
                const { id, title, content, image, is_approved, is_published, created_at, author, tags, published_at, blog_subcategory, visible_corporate,
                    visible_service_provider,
                    blog_category } = data?.data?.data;

                const blogs = {
                    id,
                    title: title?.en,
                    content: content?.en,
                    is_approved,
                    image,
                    is_published,
                    created_at,
                    author: author?.first_name,
                    tags,
                    published_at,
                    blog_subcategory,
                    blog_category,
                    visible_corporate,
                    visible_service_provider,
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
            id: id,
            title: '',
            content: '',
            image: PlaceholderImage,
            created_at: '',
            is_approved: true,
            is_published: true,
            is_featured: false,
            author: '',
            tags: [],
            published_at: '',
            blog_subcategory: new IndexPath(0),
            blog_category: new IndexPath(0),
            visible_corporate: new IndexPath(0),
            visible_service_provider: new IndexPath(0),
        },
        resolver: zodResolver(schema),
    });

    const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
        enabled: true,
        queryKey: ['blogs', id],
        queryFn: ({ queryKey }) => getBlog(queryKey[1]),
        onSuccess(data) {
            const { id, title, content, image, is_approved, is_published, visible,
                created_at, author, is_featured, published_at, blog_subcategory,
                blog_category,
                tags, } = data?.data?.data;

            const blog = {
                id,
                title: title?.en,
                content: content?.en,
                is_approved,
                image: { uri: image, width: 100, height: 100, },
                is_published,
                is_featured,
                visible,
                created_at,
                published_at,
                blog_subcategory,
                blog_category,
                author: author?.first_name,
                tags: tags.map(t => {
                    return {
                        id: t.id,
                        name: t.name,
                    }
                }),
            }

            reset(blog)
        }
    })

    const isPresented = () => back();

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Updated',
            text2: 'Blogs details updated'
        });
    }

    const onSubmit = async (data) => {
        data.blog_category = data.blog_category?.row + 1
        data.blog_subcategory = data.blog_subcategory?.row + 1

        data.visible_corporate = data.visible_corporate?.row + 1
        data.visible_service_provider = data.visible_service_provider?.row + 1

        data.is_published = true
        mutate(data)
    };

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
                // console.log(image)
                const croppedImage = { uri: image.sourceURL, width: 100, height: 100, mime: image.mime }
                setValue('image', croppedImage)
                // console.log("blog console", croppedImage)

            });
    }

    //----------------------------------------------------

    // React.useEffect(() => {
    //   refetch();
    // }, [])

    // console.log("Errors " + JSON.stringify(errors))

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
                <Image
                    source={ErrorImage}
                    alt="A cool artist's image."
                    style={{ borderRadius: 1, width: 300, height: 200 }}
                />
            </MotiView>
            <Text category='h6' status="success" style={{ textAlign: 'center', marginVertical: 8 }}>Oops something went wrong...</Text>
            <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get blogs.</Text>
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
                            <MotiView style={{ flex: 1 }}>
                                <MotiView style={styles.cardContainer}>
                                    <Image
                                        source={getValues('image')}
                                        height={200}
                                        alt="A cool artist's image."
                                        style={{ borderRadius: 12 }} />
                                    <Text style={styles.cardTitle} category="h5">
                                        {getValues('title')}</Text></MotiView>


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

                                <Text category='s1' style={{ marginLeft: 8, }}>Content</Text>
                                <Text category='s1' style={{ padding: 8, color: theme['color-primary-600'] }}>{getValues('content')}</Text>

                                <MotiView style={{ flexDirection: 'row', padding: 8 }}>
                                    <Text category='s2' >Author :</Text>
                                    <Text style={{ marginLeft: 8, color: theme['color-primary-500'] }} category='s2'>{getValues('author')}</Text>
                                </MotiView>

                                <MotiView style={{ flexDirection: 'row', padding: 8 }}>
                                    <Text category='s2' style={{ marginTop: 4 }}>Tags :</Text>
                                    {getValues('tags')?.length > 0 && getValues('tags').map((tag, index) => (
                                        <Text category='p1' style={{ marginTop: 4, marginLeft: 4 }}>
                                            {`${tag?.name?.en}, `}
                                        </Text>
                                    ))}
                                </MotiView>

                                <MotiView style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Published at : </Text>
                                    <Text category='s2'>{formatDate(getValues('published_at'))}</Text>
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
                                    <Text category='s1'>{getValues('is_approved') ? 'This blog is  approved.' : 'This blog is not approved.'}</Text>
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
                                    <Text category='s1'>{getValues('is_published') ? 'This blog is  published.' : 'This blog is not published.'}</Text>
                                </MotiView>

                                <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
                                    {getValues('is_featured') ? (
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
                                    <Text category='s1'>{getValues('is_featured') ? 'This blog is  featured.' : 'This blog is not featured.'}</Text>
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
                                            placeholder={"Blogs title"}
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
                                    name="author"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Author name'
                                            placeholder={"Blogs author name"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.author ? 'danger' : 'success'}`}
                                            caption={`${errors?.author ? errors.author?.message : ''}`}
                                        />
                                    )}
                                />
                                <Text category='s1' style={{ marginBottom: 4, }}>Blogs category</Text>

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

                                <Text category='s1' style={{ marginBottom: 4, marginTop: 8 }}>Blogs subcategory</Text>
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
                                <Text category='s1'>Tags</Text>
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

                                {/* <MotiView style={{ flexDirection: 'row', marginLeft: 4 }}>
                      <Text category='s2' >Tags :</Text>
                      {getValues('tags')?.length > 0 && getValues('tags').map((tag, index) => (
                        <Text category='p1' style={{ marginLeft: 4 }}>
                          {`${tag?.name?.en}, `}
                        </Text>
                      ))}
                    </MotiView> */}

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
                                            Is blog approved?
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
                                            Is blog published?
                                        </Toggle>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="is_featured"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Toggle
                                            style={[styles.marginVertical, styles.alignSelf]}
                                            checked={value === 1}
                                            onChange={(newValue) => {
                                                onChange(newValue ? 1 : 0);
                                            }}
                                            status={`${errors?.is_approved ? 'danger' : 'primary'}`}
                                        >
                                            Is blog featured?
                                        </Toggle>
                                    )}
                                />


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