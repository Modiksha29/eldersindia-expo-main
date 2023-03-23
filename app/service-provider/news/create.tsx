import React, { useState, useEffect, useRef } from 'react'
import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle, Select, SelectItem, } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView } from 'moti'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions, Image } from "react-native"
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNewsRead, updateNews, createNews } from 'apis/admin/news'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/admin/news/reaction'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import PlaceholderImage from 'assets/images/favicon.png'

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />


const schema = z.object({

    title: z.string().min(3, { message: 'News title is required' }).max(256, { message: 'News title is too long' }),
    content: z.string().optional(),
    // .min(3, { message: 'News content is required' }).max(256, { message: 'News content is too long' }),
    image: z.object({}).optional(),
    createdby: z.string().optional(),
    news_category: z.string().optional(),
    news_subcategory: z.string().optional(),
});



export default function last_page() {
    const [image, setImage] = useState(null);
    const RichText = useRef();
    const [newsdata = {}, setNewsData] = useMMKVObject('newsdata', storage)
    const { push, replace, back } = useRouter()
    const queryClient = useQueryClient()
    const theme = useTheme();
    const [showLayout1, setShowLayout1] = useState(true);
    const [newsContent, setNewsContent] = useState('');
    const [selectedNewSubCategory, setSelectedNewSubCategory] = React.useState();
    const [selectedNewCategory, setSelectedNewsCategory] = React.useState();

    const toggleLayout = () => {
        setShowLayout1(!showLayout1);
    };
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
                const { id, title, content, slug, visible, image, is_approved, user_id,
                    published_at, is_published, is_current, tags,
                    news_subcategory, created_at, createdby, updated_at, news_category } = data?.data?.data;

                const news = {
                    title: '',
                    content: '',
                    image: PlaceholderImage,
                    news_category: '',
                    news_subcategory: '',
                    createdby: '',
                    // tags:'',
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
            news_category: '',
            news_subcategory: '',
            createdby: '',
            // tags:'',
        },
        resolver: zodResolver(schema),
    });

    // const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    //   enabled: true,
    //   queryKey: ['news', id],
    //   queryFn: ({ queryKey }) => getNewsRead(queryKey[1]),
    //   onSuccess(data) {
    //     const { id, title, content, slug, visible, image, is_approved, user_id,
    //       news_category, news_subcategory_id, draft_id, published_at, is_published,
    //       is_current, created_at, createdby, tags, news_subcategory } = data?.data?.data;

    //     const news = {
    //       id,
    //       title: title?.en,
    //       content: content?.en,
    //       is_approved,
    //       image: { uri: image, width: 100, height: 100, },
    //       is_published,
    //       created_at,
    //       news_category: news_category?.name.en,
    //       news_subcategory: news_subcategory?.name.en,
    //       published_at,
    //       createdby: createdby?.name,
    //       // tags:tags?.name.en,
    //     }

    //     reset(news)
    //   }
    // })

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Updated',
            text2: 'News details updated'
        });
    }
    const handleReset = () => {
        reset();
    };

    const handleSaveDraft = () => {
        // You can save the form data to a database or local storage
        const formData = getValues();
        console.log('Form data saved:', formData);
    };

    const onSubmit = data => {
        console.log(data)
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
                const croppedImage = { uri: image.sourceURL, width: 100, height: 100, mime: image.mime }
                setValue('image', croppedImage)
            });
    }

    //----------------------------------------------------

    // React.useEffect(() => {
    //   refetch();
    // }, [])

    console.log("Errors " + JSON.stringify(errors))

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

                        <MotiView style={{ marginBottom: 8, marginTop: 4 }}>
                            <SafeAreaView>
                                <ScrollView>
                                    <RichEditor
                                        initialContentHTML={newsContent}
                                        disabled={false}
                                        containerStyle={styles.editor}
                                        ref={RichText}
                                        initialHeight={150}
                                        style={styles.rich}
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
                        </MotiView>

                        <Text category='s1'>News category</Text>
                        <Controller
                            control={control}
                            // --------------------need to chnage------
                            name="news_category"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                    style={{ marginTop: 8, marginBottom: 8 }}
                                    placeholder='News category'
                                    selectedIndex={selectedNewCategory}
                                    // disabled={true}
                                    onSelect={index => setSelectedNewsCategory(index)}>
                                    <SelectItem title='Option 1' />
                                    <SelectItem title='Option 2' />
                                    <SelectItem title='Option 3' />
                                </Select>
                            )}
                        />

                        <Text category='s1'>News subcategory</Text>
                        <Controller
                            control={control}
                            // --------------------need to chnage------
                            name="news_subcategory"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                    style={{ marginTop: 8, marginBottom: 8 }}
                                    placeholder='News subcategory'
                                    selectedIndex={selectedNewSubCategory}
                                    //disabled={true}
                                    onSelect={index => setSelectedNewSubCategory(index)}>
                                    <SelectItem title='Option 1' />
                                    <SelectItem title='Option 2' />
                                    <SelectItem title='Option 3' />
                                </Select>
                            )}
                        />

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
        minHeight: 300,
        flex: 1,
    },
})
