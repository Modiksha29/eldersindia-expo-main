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
import { get_Corporates, updateCorporates } from 'apis/admin/corporates'

import PlaceholderImage from 'assets/images/favicon.png'
const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />


const schema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Service Providers name is required' }).max(256, { message: 'Service Providers name is too long' }),
  headquarter: z.string().min(3, { message: 'Headquarters details is required' }).max(256, { message: 'Headquarters details name is too long' }),
  branches: z.object({}).optional(),
  website: z.string().min(3, { message: 'Website is required' }).max(256, { message: 'Website is too long' }),
  logo: z.string().optional(),
  status: z.boolean({
    required_error: "approved service provider is required",
    invalid_type_error: "approved service provider must be a boolean",
  }),
  // black_list: z.object({}).optional(),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
  email_domain: z.string().optional(),
  limit_elders: z.string().optional(),


});

export default function Page({ navigation }) {
    const params = useSearchParams();
  const {id} = params;
  const { push, replace, back } = useRouter()
  const theme = useTheme();
  const [corporatesdata, setCorporatesdata] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

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

      mutationFn: (corporates) => updateCorporates(corporates),

      onSuccess(data) {
        const {
          id,
          name,
          headquarter,
          branches,
          website,
          logo,
          email_domain,
          limit_elders,
          status,
          // black_list,
          created_by,
          created_at,



        } = data?.data?.data;

        const corporates = {
          id,
          name: name?.en,
          headquarter,
          branches,
          website,
          email_domain,
          limit_elders,
          logo,
          status,
          // black_list,
          created_by,
          created_at,

        }
        setCorporatesdata(corporates);
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
      name: '',
      headquarter: '',
      branches: '',
      website: '',
      email_domain: '',
      limit_elders: '',
      logo: PlaceholderImage,
      status: true,
      // black_list: '',
      created_by: '',
      created_at: '',
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    enabled: true,
    queryKey: ['corporates', id],
    queryFn: ({ queryKey }) => get_Corporates(queryKey[1]),
    onSuccess(data) {
      const { id, name,
        headquarter,
        branches,
        website,
        email_domain,
        limit_elders,
        logo,
        status,
        // black_list,
        created_by,
        created_at, } = data?.data?.data;

      const corporates = {
        id,
        name: name?.en,
        headquarter,
        branches,
        website,
        email_domain,
        limit_elders,
        logo,
        status,
        // black_list,
        created_by,
        created_at,
      }

      reset(corporates)
    }
  })
  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Corporates details updated'
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
      <Text category='s1' status="danger" style={{ textAlign: 'center' }}>Failed to get corporates.</Text>
    </MotiView>
  }
  if (isSuccess) {
    return (
      <Layout style={{ margin: 8 }}>
        <ScrollView>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing' }}
            style={{padding:8}}
          >
            <MotiView style={{ flexDirection: 'row' }}>

              <Controller
                control={control}
                name="logo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <React.Fragment>
                    <Image
                      // src={value}
                      source={{uri: "https://app.eldersindia.com/uploads/vendor/banner/1539682961image%20(2).png"}}
                      height={100}
                      width={100}
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
                  placeholder={"Corporate Name"}
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
                  placeholder={"Corporate's Website Name"}
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
            <Controller
              control={control}
              name="email_domain"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Email '
                  placeholder={"email domain"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.email_domain ? 'danger' : 'success'}`}
                  caption={`${errors?.email_domain ? errors.email_domain?.message : ''}`}
                />
              )}
            />
            <Controller
              control={control}
              name="limit_elders"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Limit elders '
                  placeholder={"limit elders"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.limit_elders ? 'danger' : 'success'}`}
                  caption={`${errors?.limit_elders ? errors.limit_elders?.message : ''}`}
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
                  Is corporate active?
                </Toggle>
              )}
            />
            <Controller
              control={control}
              name="created_by"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Created by'
                  placeholder={"created by"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.created_by ? 'danger' : 'success'}`}
                  caption={`${errors?.created_by ? errors.created_by?.message : ''}`}
                />
              )}
            />
            {/* <Controller
              control={control}
              // name="black_list"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Black list'
                  placeholder={"black list"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.black_list ? 'danger' : 'success'}`}
                  caption={`${errors?.black_list ? errors.black_list?.message : ''}`}
                />
              )}
            /> */}
            <Controller
              control={control}
              name="created_at"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Created at'
                  placeholder={"created at"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.created_at ? 'danger' : 'success'}`}
                  caption={`${errors?.created_at ? errors.created_at?.message : ''}`}
                />
              )}
            />
            <MotiView
              style={{ flexDirection: 'row', marginBottom:40}}
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
      </Layout>
    )
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
})