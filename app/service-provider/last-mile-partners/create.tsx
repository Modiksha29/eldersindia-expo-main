import React, { useState, useEffect, useRef } from 'react'
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, Toggle, Select, SelectItem, } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView, Image } from 'moti'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions } from "react-native"
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLastMilePartnerRead, createLastMilePartner } from 'apis/service-provider/last-mile-partners'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/service-provider/last-mile-partners/reaction'
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
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    gender: z.string().optional(),
    language_spoken: z.string().optional(),
    age: z.number().finite().optional(),
    phone: z.number().finite().optional(),
});

export default function Page() {
    const { push, replace, back, } = useRouter()
    const [lastmilepartnerdata = {}, setLastMilePartnerData] = useMMKVObject('lastmilepartnerdata', storage)
    const [lastmilepartnerContent, setLastMilePartnerContent] = useState('');
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
            mutationFn: (lastmilepartner) => createLastMilePartner(lastmilepartner),
            onSuccess(data) {
                const {
                    first_name,
                    last_name,
                    gender,
                    language_spoken,
                    age,
                    phone,
                } = data?.data?.data;

                const lastmilepartner = {
                    first_name: '',
                    last_name: '',
                    gender: '',
                    language_spoken: '',
                    age: '',
                    phone: '',
                }
                setLastMilePartnerData(lastmilepartner);
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
            first_name: '',
            last_name: '',
            gender: '',
            language_spoken: '',
            age: '',
            phone: '',
        },
        resolver: zodResolver(schema),
    });
    const isPresented = () => back();

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Updated',
            text2: 'LastMilePartner details updated'
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
            <KeyboardAvoidingView
                style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView>
                    <MotiView style={{ padding: 12 }}>
                        {/* <Controller
              // control={control}
              render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"First name"}
                            label='First name'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.first_name ? 'danger' : 'success'}`}
                        // caption={`${errors?.first_name ? errors.first_name?.message : ''}`}
                        />
                        {/* )}
              name='first_name'
            /> */}

                        {/* <Controller
              // control={control}
              render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Last name"}
                            label='Last name'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.last_name ? 'danger' : 'success'}`}
                        // caption={`${errors?.last_name ? errors.last_name?.message : ''}`}
                        />
                        {/* )}
              name='last_name'
            /> */}

                        {/* <Controller
              // control={control}
              render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Phone number"}
                            label='Phone'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.phone ? 'danger' : 'success'}`}
                        // caption={`${errors?.phone ? errors.phone?.message : ''}`}
                        />
                        {/* )}
              name='phone'
            /> */}

                        {/* <Controller
              // control={control}
              render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Age"}
                            label='Age'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.age ? 'danger' : 'success'}`}
                        // caption={`${errors?.age ? errors.age?.message : ''}`}
                        />
                        {/* )}
              name='age'
            /> */}

                        {/* <Controller
              // control={control}
              render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Gender"}
                            label='Gender'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.gender ? 'danger' : 'success'}`}
                        // caption={`${errors?.gender ? errors.gender?.message : ''}`}
                        />
                        {/* )}
              name='gender'
            /> */}
                        {/* <Controller
              // control={control}
              render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Language spoken"}
                            label='Language spoken'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.language_spoken ? 'danger' : 'success'}`}
                        // caption={`${errors?.language_spoken ? errors.language_spoken?.message : ''}`}
                        />
                        {/* )}
              name='first_name'
            /> */}

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
                            <Button status='danger' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }}
                                onPress={() => handleReset()}
                                size='small'>Reset</Button>
                            <Button status='warning' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }}
                                onPress={() => handleSaveDraft()}
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