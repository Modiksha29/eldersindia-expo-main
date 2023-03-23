import React, { useState, useEffect } from 'react'
import {Image} from 'react-native'
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView } from 'moti'
import { StyleSheet, ImageBackground, TouchableOpacity, ImageProps } from "react-native"
import { useRouter, useSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBlogsRead, updateBlogs } from 'apis/corporate/blogs'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/corporate/blogs/reaction'

import PlaceholderImage from 'assets/images/favicon.png'

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />



const schema = z.object({
    id: z.string(),
    title: z.string().min(3, { message: 'Blogs title is required' }).max(256, { message: 'Blogs title is too long' }),
    content: z.string().min(3, { message: 'Blogs content is required' }).max(256, { message: 'Blogs content is too long' }),
    image: z.object({}).optional(),
    tags: z.object({}).optional(),
    is_approved: z.boolean({
        required_error: "approved blogs is required",
        invalid_type_error: "approved blogs must be a boolean",
    }),
    published_at: z.string().optional(),
    is_published: z.boolean({
        required_error: "published blogs is required",
        invalid_type_error: "published blogs must be a boolean",
    }),
    is_featured: z.boolean({
        required_error: "published blogs is required",
        invalid_type_error: "published blogs must be a boolean",
    }),
    created_at: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'Blogs created date is too long' }),
});

export default function Page({ navigation }) {
    const { id } = useSearchParams()

    //Image Picker
    const [image, setImage] = useState(null);

    const [blogsdata = {}, setBlogsData] = useMMKVObject('blogsdata', storage)
    const { push, replace, back } = useRouter()
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
            mutationFn: (blogs) => updateBlogs(blogs),
            onSuccess(data) {
                const { id, title, content, image, is_approved, is_published, created_at, author, tags } = data?.data?.data;

                const blogs = {
                    id,
                    title: title?.en,
                    content: content?.en,
                    is_approved,
                    image,
                    is_published,
                    created_at,
                    author,
                    tags,
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
            tags: '',
        },
        resolver: zodResolver(schema),
    });

    const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
        enabled: true,
        queryKey: ['blogs', id],
        queryFn: ({ queryKey }) => getBlogsRead(queryKey[1]),
        onSuccess(data) {
            const { id, title, content, image, is_approved, is_published,
                created_at, author, is_featured,
                tags, } = data?.data?.data;

            const blogs = {
                id,
                title: title?.en,
                content: content?.en,
                is_approved,
                image: { uri: image, width: 200, height: 100, },
                is_published,
                is_featured,
                created_at,
                author: author?.name,
                tags: tags?.name?.en,
            }

            reset(blogs)
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

    const onSubmit = data => {
        console.log(data)
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
            width: 200,
            height: 100,
            cropping: true,
            mediaType: 'photo',
        })
            .then(image => {
                const croppedImage = { uri: image.sourceURL, width: 200, height: 100, mime: image.mime }
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
            <Text category='s1' status="danger" style={{ textAlign: 'center' }}>Failed to get blogs.</Text>
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
                            <MotiView style={{ flex: 1 }}>
                                <MotiView style={styles.cardContainer}>
                                    <Image
                                        source={{ ...getValues('image') }}
                                        
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
                                    <Text category='s2'>Tags :</Text>
                                    {/* <Text>{getValues('tags')}</Text> */}
                                    <Text style={{ marginLeft: 8, color: theme['color-primary-500'] }} category='s2'>Elders Wealth</Text>
                                </MotiView>

                                {/* <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                fill={theme['color-warning-500']}
                name={'checkmark-outline'}
                pack={'ionicons'}
              />
              <Text>Approved</Text>
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
                                            name={'share-outline'}
                                            pack={'ionicons'}
                                        />
                                    )}
                                    <Text category='s1'>{getValues('is_approved') ? 'This blog is  approved.' : 'Not This blog is not approved.'}</Text>
                                </MotiView>

                                <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Icon
                                        style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                                        fill={theme['color-warning-500']}
                                        name={'checkmark-outline'}
                                        pack={'ionicons'}
                                    />
                                    <Text category='s1'>This blog is published.</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Icon
                                        style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                                        fill={theme['color-warning-500']}
                                        name={'checkmark-outline'}
                                        pack={'ionicons'}
                                    />
                                    <Text category='s1'>This blog is featured.</Text>
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
                                <Controller
                                    control={control}
                                    name="content"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Content'
                                            placeholder={"Blogs content"}
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
                                                    source={{ uri: value, height:200,
                                                    width: 200 }}
                                                    
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
                                <Controller
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
                                />
                                {/* 
               <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                fill={theme['color-warning-500']}
                name={'checkmark-outline'}
                pack={'ionicons'}
              />
              <Text>Approved</Text>
            </MotiView>
            <MotiView style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ width: 24, height: 24, marginRight: 16, tintColor: theme['color-success-500'] }}
                fill={theme['color-warning-500']}
                name={'checkmark-outline'}
                pack={'ionicons'}
              />
              <Text>Published</Text>
            </MotiView>  */}
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
                                            Is blogs approved?
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
                                            Is blogs published?
                                        </Toggle>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="is_featured"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Toggle
                                            style={[styles.marginVertical, styles.alignSelf]}
                                            checked={value}
                                            onChange={onChange}
                                            status={`${errors?.is_featured ? 'danger' : 'primary'}`}
                                        >
                                            Is news featured?
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
})