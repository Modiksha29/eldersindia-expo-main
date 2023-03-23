import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { MotiView, ScrollView } from 'moti'
import { Layout, Button, Icon, Text, Input, useTheme, Spinner, Toggle, IconProps, IconElement } from '@ui-kitten/components'
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ImageProps, Image } from "react-native"
import ImagePicker from 'react-native-image-crop-picker'
import { get_ServiceProviders, updateServiceProviders } from 'apis/admin/service-provider'
import { Reaction } from 'components/admin/service-provider/reaction'

import PlaceholderImage from 'assets/images/favicon.png'

const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />

const schema = z.object({
    id: z.string(),
    name: z.string().min(3, { message: 'Service Providers name is required' }).max(256, { message: 'Service Providers name is too long' }),
    headquarter: z.string().min(3, { message: 'Headquarters details is required' }).max(256, { message: 'Headquarters details name is too long' }),
    spoc: z.string().optional(),
    branches: z.object({}).optional(),
    website: z.string().min(3, { message: 'Website is required' }).max(256, { message: 'Website is too long' }),
    address: z.object({
        builiding_no: z.string(),
        street: z.string(),
        area: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        pincode: z.string(),
    }),
    banner: z.object({}).optional(),
    logo: z.string().optional(),
    status: z.boolean({
        required_error: "approved news is required",
        invalid_type_error: "approved news must be a boolean",
    }),
    about: z.string().optional(),
    term_condition: z.string().optional(),
    branch_name: z.object({}).optional(),
    contact_person: z.object({}).optional(),
    designation: z.object({}).optional(),
    conatct_number: z.object({}).optional(),
    contact_email: z.object({}).optional(),
    gstin: z.string().min(3, { message: 'Service Providers gstin is required' }).max(15, { message: 'Service Providers name is too long' }),
    cgst: z.string().min(3, { message: 'Service Providers cgst is required' }).max(5, { message: 'Service Providers name is too long' }),
    sgst: z.string().min(3, { message: 'Service Providers sgst is required' }).max(5, { message: 'Service Providers name is too long' }),
    day_from: z.string(),
    day_to: z.string(),
    time_from: z.string(),
    time_to: z.string(),
    booking_lead_time: z.string(),
    cancelation_lead_time: z.string(),
    reconciliation: z.string().optional(),
    updated_at: z.string(),


});

export default function Page({ navigation }) {
    const params = useSearchParams();

    const { id } = params;
    const { push, replace, back } = useRouter()
    const theme = useTheme();
    const [serviceProvidersdata, setServiceProvidersdata] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showLayout1, setShowLayout1] = useState(true);

    const toggleLayout = () => {
        setShowLayout1(!showLayout1);
    };

    const handleImageClick = () => setIsModalVisible(true);
    const handleBackButtonClick = () => {
        setIsModalVisible(false);
        setShowDeleteButton(false);
    };
    const handleDeleteButtonClick = () => setShowDeleteButton(true);

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

            mutationFn: (serviceProviders) => updateServiceProviders(serviceProviders),

            onSuccess(data) {
                const {
                    id,
                    name,
                    headquarter,
                    spoc,
                    branches,
                    website,
                    address,
                    banner,
                    logo,
                    status,
                    about,
                    term_condition,
                    branch_name,
                    contact_person,
                    designation,
                    conatct_number,
                    contact_email,
                    gstin,
                    cgst,
                    sgst,
                    day_from,
                    day_to,
                    time_from,
                    time_to,
                    booking_lead_time,
                    cancelation_lead_time,
                    reconciliation,
                    created_at,
                    created_by,
                    deleted_at,
                    updated_at,


                } = data?.data?.data;

                const serviceProviders = {
                    id,
                    name: name?.en,
                    headquarter,
                    spoc,
                    branches,
                    website,
                    address,
                    // builiding_no: address?.street,
                    banner,
                    logo,
                    status,
                    about,
                    term_condition,
                    branch_name,
                    contact_person,
                    designation,
                    conatct_number,
                    contact_email,
                    gstin,
                    cgst,
                    sgst,
                    day_from,
                    day_to,
                    time_from,
                    time_to,
                    booking_lead_time,
                    cancelation_lead_time,
                    reconciliation,
                    created_at,
                    created_by,
                    deleted_at,
                    updated_at,
                }
                setServiceProvidersdata(serviceProviders);
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

    const { control, handleSubmit, watch, formState: { errors }, setValue, getValues, setError, reset } = useForm({
        defaultValues: {
            id: id,
            name: '',
            headquarter: '',
            spoc: '',
            branches: '',
            website: '',
            address: {
                building_no: '',
                city: '',
            },
            banner: '',
            logo: PlaceholderImage,
            status: true,
            about: '',
            term_condition: '',
            branch_name: '',
            contact_person: '',
            designation: '',
            conatct_number: '',
            contact_email: '',
            gstin: '',
            cgst: '',
            sgst: '',
            day_from: '',
            day_to: '',
            time_from: '',
            time_to: '',
            booking_lead_time: '',
            cancelation_lead_time: '',
            reconciliation: '',
            created_at: '',
            created_by: '',
            deleted_at: '',
            updated_at: '',
        },
        resolver: zodResolver(schema),
    });
    const { building_no, street, area, city, state, country, pincode } = watch('address');

    const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
        enabled: true,
        queryKey: ['serviceProviders', id],
        queryFn: ({ queryKey }) => get_ServiceProviders(queryKey[1]),
        onSuccess(data) {
            const { id, name,
                headquarter,
                spoc,
                branches,
                website,
                address,
                banner,
                logo,
                status,
                about,
                term_condition,
                branch_name,
                contact_person,
                designation,
                conatct_number,
                contact_email,
                gstin,
                cgst,
                sgst,
                day_from,
                day_to,
                time_from,
                time_to,
                booking_lead_time,
                cancelation_lead_time,
                reconciliation,
                created_at,
                created_by,
                deleted_at,
                updated_at, } = data?.data?.data;

            const serviceProviders = {
                id,
                name: name?.en,
                headquarter,
                spoc,
                branches,
                website,
                address,
                banner,
                logo,
                status,
                about,
                term_condition,
                branch_name,
                contact_person,
                designation,
                conatct_number,
                contact_email,
                gstin,
                cgst,
                sgst,
                day_from,
                day_to,
                time_from,
                time_to,
                booking_lead_time,
                cancelation_lead_time,
                reconciliation,
                created_at,
                created_by,
                deleted_at,
                updated_at,
            }

            reset(serviceProviders)
        }
    })
    const isPresented = () => back();

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Updated',
            text2: 'News details updated'
        });
    }

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
            .then(logo => {
                console.log(logo)
                const croppedImage = { uri: logo.sourceURL, width: 100, height: 100, mime: logo.mime }
                setValue('logo', croppedImage)
                console.log("new console", croppedImage)

            });
    }

    if (isLoading) {
        return <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner status='primary' />
            <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
        </MotiView>
    }

    if (isError) {
        return <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <Text category='s1' status="danger" style={{ textAlign: 'center' }}>Failed to get service providers details.</Text>
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
                                <Image
                                    source={{uri: getValues('logo')}}
                                    // height={200}
                                    alt="A cool artist's image."
                                    style={{ borderRadius: 12 }} />
                                <Text style={styles.cardTitle} category="h5">
                                    {getValues('name')}</Text>
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

                                <Reaction id={getValues('id')} />
                            </MotiView>

                            <MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8 }}>Headquarter  : </Text>
                                    <Text category='s2'>{getValues('headquarter')}</Text>
                                </MotiView>
                                <MotiView style={{ marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Website : </Text>
                                    <Text style={{ marginLeft: 8, color: theme['color-success-600'] }}>{getValues('website')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Single point of contact : </Text>
                                    <Text category='s2'>{getValues('spoc')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Address : </Text>
                                    <Text category='s2'>{getValues('address')?.building_no}</Text>
                                </MotiView>
                                {/* <MotiView style={{flexDirection:'row', marginBottom:8}}>
                <Text ></Text>
                <Text category='s1'style={{ marginLeft: 8, }}>Is service provider active?</Text>
              </MotiView> */}
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Icon
                                        style={{ width: 20, height: 20, marginRight: 16, tintColor: theme['color-success-500'] }}
                                        fill={theme['color-warning-500']}
                                        name={'checkmark-outline'}
                                        pack={'ionicons'}
                                    />
                                    <Text category='s1'>Is service provider active?</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>About : </Text>
                                    <Text category='s2'>{getValues('headquarter')}</Text>
                                </MotiView>
                                <MotiView style={{ borderWidth: 0.5, borderColor: '#70db70', borderRadius: 4, borderStyle: 'solid', marginBottom: 8 }}>
                                    <MotiView style={{ flexDirection: 'row', padding: 8, borderWidth: 1, borderColor: '#70db70', borderRadius: 4, borderStyle: 'solid' }}>
                                        <Text category='s1'>Branch Name</Text>
                                        <Text style={{ marginLeft: 40 }}>Nicole Cape</Text>
                                    </MotiView>
                                    <MotiView style={{ flexDirection: 'row', padding: 4, borderWidth: 1, borderColor: '#70db70', borderRadius: 4, borderStyle: 'solid' }}>
                                        <MotiView style={{ padding: 8 }}>
                                            <Text category='s1'>Contact Person</Text>
                                            <Text category='s1'>Designation</Text>
                                            <Text category='s1'>Contact Number</Text>
                                            <Text category='s1'>Contact Email</Text>
                                        </MotiView>
                                        <MotiView style={{ marginLeft: 4, padding: 8 }}>
                                            <Text>Demario</Text>
                                            <Text>Anthropologist</Text>
                                            <Text>417039891</Text>
                                            <Text>oswald.haag@hotmail.com</Text>
                                        </MotiView>
                                    </MotiView>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>GSTIN : </Text>
                                    <Text category='s2'>{getValues('gstin')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>SGST : </Text>
                                    <Text category='s2'>{getValues('sgst')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Day from : </Text>
                                    <Text category='s2' style={{ color: theme['color-success-600'] }}>{getValues('day_from')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Day to : </Text>
                                    <Text category='s2' style={{ color: theme['color-success-600'] }}>{getValues('day_to')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Time from : </Text>
                                    <Text category='s2' style={{ color: theme['color-success-600'] }}>{getValues('time_from')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Time to : </Text>
                                    <Text category='s2' style={{ color: theme['color-success-600'] }}>{getValues('time_to')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Booking lead time : </Text>
                                    <Text category='s2' style={{ color: theme['color-success-600'] }}>{getValues('booking_lead_time')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Cancelation lead time : </Text>
                                    <Text category='s2' style={{ color: theme['color-success-600'] }}>{getValues('cancelation_lead_time')}</Text>
                                </MotiView>
                                <MotiView style={{ marginBottom: 8 }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Terms & conditions : </Text>
                                    <Text category='s2' style={{ marginLeft: 8, color: theme['color-warning-600'] }}>{getValues('term_condition')}</Text>
                                </MotiView>
                                <MotiView style={{ flexDirection: 'row', marginBottom: "30%" }}>
                                    <Text category='s1' style={{ marginLeft: 8, }}>Reconciliation : </Text>
                                    <Text category='s2'>{getValues('reconciliation')}</Text>
                                </MotiView>

                            </MotiView>
                        </ScrollView>
                    </MotiView>
                ) : (
                    <MotiView style={{ margin: 4, }}>
                        <ScrollView>
                            <MotiView
                                from={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ type: 'timing' }}
                                style={{ padding: 8 }}
                            >
                                <MotiView style={{ flexDirection: 'row' }}>

                                    <Controller
                                        control={control}
                                        name="logo"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <React.Fragment>
                                                <Image
                                                    // source={value}
                                                    source={{uri: "https://app.eldersindia.com/uploads/vendor/banner/1539682961image%20(2).png"}}
                                                    alt="A cool artist's image."
                                                //loader={}
                                                />
                                                <Button
                                                    onPress={uploadPhoto}
                                                    status='primary' style={{ marginHorizontal: 8, height: 20, marginTop: 28 }}>Upload Logo</Button>
                                            </React.Fragment>
                                        )}
                                    />
                                </MotiView>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Name'
                                            placeholder={"Service Providers Name"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.name ? 'danger' : 'success'}`}
                                            caption={`${errors?.name ? errors.name?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="website"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Website'
                                            placeholder={"Service Providers Website Name"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.name ? 'danger' : 'success'}`}
                                            caption={`${errors?.name ? errors.name?.message : ''}`}
                                        />
                                    )}
                                />
                                {/* <Controller
                  control={control}
                  name="address.builiding_no"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.marginVertical}
                      label='Address'
                      placeholder={"Service Providers Address"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      multiline={true}
                      // numberOfLines={4}
                      size='large'
                      status={`${errors?.address?.builiding_no ? 'danger' : 'success'}`}
                      caption={`${errors?.address?.builiding_no ? errors.address?.builiding_no?.message : ''}`}
                    />
                  )}
                /> */}

                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Address'
                                            placeholder={"Service Providers Address"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline={true}
                                            // numberOfLines={4}
                                            size='large'
                                            status={`${errors?.address ? 'danger' : 'success'}`}
                                            caption={`${errors?.address ? errors.address?.message : ''}`}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Address'
                                            placeholder={"Service Providers Address"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline={true}
                                            // numberOfLines={4}
                                            size='large'
                                            status={`${errors?.address ? 'danger' : 'success'}`}
                                            caption={`${errors?.address ? errors.address?.message : ''}`}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Address'
                                            placeholder={"Service Providers Address"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline={true}
                                            // numberOfLines={4}
                                            size='large'
                                            status={`${errors?.address ? 'danger' : 'success'}`}
                                            caption={`${errors?.address ? errors.address?.message : ''}`}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Address'
                                            placeholder={"Service Providers Address"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline={true}
                                            // numberOfLines={4}
                                            size='large'
                                            status={`${errors?.address ? 'danger' : 'success'}`}
                                            caption={`${errors?.address ? errors.address?.message : ''}`}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Address'
                                            placeholder={"Service Providers Address"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline={true}
                                            // numberOfLines={4}
                                            size='large'
                                            status={`${errors?.address ? 'danger' : 'success'}`}
                                            caption={`${errors?.address ? errors.address?.message : ''}`}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Address'
                                            placeholder={"Service Providers Address"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline={true}
                                            // numberOfLines={4}
                                            size='large'
                                            status={`${errors?.address ? 'danger' : 'success'}`}
                                            caption={`${errors?.address ? errors.address?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="headquarter"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Headquarter'
                                            placeholder={"Headquarter's Name"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.headquarter ? 'danger' : 'success'}`}
                                            caption={`${errors?.headquarter ? errors.headquarter?.message : ''}`}
                                        />
                                    )}
                                />
                                {/* -----------Branch Table-------------- */}

                                <Controller
                                    control={control}
                                    name="branches"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <MotiView style={{ borderWidth: 0.5, borderColor: '#70db70', borderRadius: 4, borderStyle: 'solid' }}>
                                            <MotiView style={{ flexDirection: 'row', padding: 8, borderWidth: 1, borderColor: '#70db70', borderRadius: 4, borderStyle: 'solid' }}>
                                                <Text category='s1'>Branch Name</Text>
                                                <Text style={{ marginLeft: 40 }}>Nicole Cape</Text>
                                            </MotiView>
                                            <MotiView style={{ flexDirection: 'row', padding: 4, borderWidth: 1, borderColor: '#70db70', borderRadius: 4, borderStyle: 'solid' }}>
                                                <MotiView style={{ padding: 8 }}>
                                                    <Text category='s1'>Contact Person</Text>
                                                    <Text category='s1'>Designation</Text>
                                                    <Text category='s1'>Contact Number</Text>
                                                    <Text category='s1'>Contact Email</Text>
                                                </MotiView>
                                                <MotiView style={{ marginLeft: 4, padding: 8 }}>
                                                    <Text>Demario</Text>
                                                    <Text>Anthropologist</Text>
                                                    <Text>417039891</Text>
                                                    <Text>oswald.haag@hotmail.com</Text>
                                                </MotiView>
                                            </MotiView>
                                        </MotiView>
                                    )}
                                />

                                <Text category='s1'> Banner</Text>

                                <ScrollView horizontal={true} style={{ padding: 4 }} showsHorizontalScrollIndicator={false}>
                                    <Image
                                        source={{uri: "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"}}
                                        height={100}
                                        width={100}
                                        style={{ borderRadius: 50, marginLeft: 8 }}
                                        alt="A cool artist's image."

                                    />
                                    <Image
                                        source={{uri: "https://app.eldersindia.com/uploads/vendor/banner/1539682676Resicare-homecarebg.jpg"}}
                                        height={100}
                                        width={100}
                                        style={{ borderRadius: 50, marginLeft: 8 }}
                                        alt="A cool artist's image."

                                    />
                                    <Image
                                        source={{uri: "https://app.eldersindia.com/uploads/vendor/banner/1539682961image%20(2).png"}}
                                        height={100}
                                        width={100}
                                        style={{ borderRadius: 50, marginLeft: 8 }}
                                        alt="A cool artist's image."

                                    />

                                    {/* <MotiView>
                <TouchableWithoutFeedback onPress={handleImageClick}>
                  <Image
                    source="https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
                    height={100}
                    width={100}
                    style={{ borderRadius: 50, marginLeft: 8 }}
                    alt="A cool artist's image."
                  />
                </TouchableWithoutFeedback>
              
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                  <MotiView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={{ uri: "https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg" }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                    />
                  </MotiView>
                </Modal>
              </MotiView> */}

                                    {/* <MotiView>
                <TouchableOpacity onPress={handleImageClick}>
                  <Image
                    source="https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
                    height={100}
                    width={100}
                    style={{ borderRadius: 50, marginLeft: 8 }}
                    alt="A cool artist's image."
                  />
                </TouchableOpacity>

                <Modal isVisible={isModalVisible} onBackdropPress={handleBackButtonClick}>
                  <MotiView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={handleBackButtonClick} style={{ position: 'absolute', left: 16, top: 16 }}>
                      {/* <Icon name="arrow-back" size={30} color="red" /> */}
                                    {/* <RetryIcon color={theme['color-primary-default']} />
                    </TouchableOpacity>
                    <Image
                      source="https://res.cloudinary.com/eldersindia/image/upload/c_scale,w_1024/v1619175738/nurse-holding-senior-man-s-hands-sympathy.jpg"
                      height={300}
                      width={300}
                      style={{ borderRadius: 50, marginLeft: 8 }}
                      alt="A cool artist's image."
                    />
                    {showDeleteButton ? (
                      <TouchableOpacity onPress={() => console.log('delete button clicked')} style={{ position: 'absolute', right: 16, top: 16 }}>
                        {/* <Icon name="trash-outline" size={30} color="red" /> */}
                                    {/* <RetryIcon color={theme['color-primary-default']} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={handleDeleteButtonClick} style={{ position: 'absolute', right: 16, top: 16 }}>
                        <Icon name="trash-outline" size={30} color="red" />
                      </TouchableOpacity>
                    )}
                  </MotiView>
                </Modal>
              </MotiView>  */}
                                </ScrollView>

                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Toggle
                                            style={[styles.marginVertical, styles.alignSelf]}
                                            checked={value}
                                            onChange={onChange}
                                            status={`${errors?.status ? 'danger' : 'primary'}`}
                                        >
                                            Is service provider active?
                                        </Toggle>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="spoc"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='SPOC'
                                            placeholder={"Name of single point of contact"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.spoc ? 'danger' : 'success'}`}
                                            caption={`${errors?.spoc ? errors.spoc?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="about"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='About'
                                            placeholder={"About the service provider"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.about ? 'danger' : 'success'}`}
                                            caption={`${errors?.about ? errors.about?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="gstin"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='GSTIN'
                                            placeholder={"Please provide your GSTIN"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.gstin ? 'danger' : 'success'}`}
                                            caption={`${errors?.gstin ? errors.gstin?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="cgst"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='CGST'
                                            placeholder={"Please provide your CGST"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.cgst ? 'danger' : 'success'}`}
                                            caption={`${errors?.cgst ? errors.cgst?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="sgst"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='SGST'
                                            placeholder={"Please provide your SGST"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.sgst ? 'danger' : 'success'}`}
                                            caption={`${errors?.sgst ? errors.sgst?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="day_from"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Day from'
                                            placeholder={"Day from"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.day_from ? 'danger' : 'success'}`}
                                            caption={`${errors?.day_from ? errors.day_from?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="day_to"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Day to'
                                            placeholder={"Day to"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.day_to ? 'danger' : 'success'}`}
                                            caption={`${errors?.day_to ? errors.day_to?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time_from"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Time from'
                                            placeholder={"Time from"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.time_from ? 'danger' : 'success'}`}
                                            caption={`${errors?.time_from ? errors.time_from?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time_to"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Time to'
                                            placeholder={"Time to"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.time_to ? 'danger' : 'success'}`}
                                            caption={`${errors?.time_to ? errors.time_to?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="booking_lead_time"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Booking lead time'
                                            placeholder={"Booking lead time"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.booking_lead_time ? 'danger' : 'success'}`}
                                            caption={`${errors?.booking_lead_time ? errors.booking_lead_time?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="cancelation_lead_time"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Cancelation lead time'
                                            placeholder={"Cancelation lead time"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.cancelation_lead_time ? 'danger' : 'success'}`}
                                            caption={`${errors?.cancelation_lead_time ? errors.cancelation_lead_time?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="term_condition"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Terms & condition'
                                            placeholder={"Terms & condition"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.term_condition ? 'danger' : 'success'}`}
                                            caption={`${errors?.term_condition ? errors.term_condition?.message : ''}`}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="reconciliation"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            style={styles.marginVertical}
                                            label='Reconciliation'
                                            placeholder={"Reconciliation"}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            status={`${errors?.reconciliation ? 'danger' : 'success'}`}
                                            caption={`${errors?.reconciliation ? errors.reconciliation?.message : ''}`}
                                        />
                                    )}
                                />
                                <MotiView
                                    style={{ flexDirection: 'row', marginBottom: 80 }}
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
                                    {/* <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                onPress={handleSubmit(onSubmit)}
              >
                {`${isMutationLoading ? 'Updating' : 'Update'}`}
              </Button> */}
                                    <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                                        onPress={handleSubmit(onSubmit)}
                                        disabled={isMutationLoading}>

                                        {`${isMutationLoading ? 'Updating' : 'Update'}`}

                                    </Button>

                                </MotiView>
                            </MotiView>
                        </ScrollView>
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