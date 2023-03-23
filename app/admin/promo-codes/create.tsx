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
import { createPromocodes, updatePromocodes } from 'apis/admin/promo-codes'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'
import { Reaction } from 'components/admin/promo-codes/reaction'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
// import TagInput from 'react-native-tags-input';

const ShareIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='share-outline' width={32} heigth={32} />
const BookmarkIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='bookmark-outline' width={32} heigth={32} />

import PlaceholderImage from 'assets/images/favicon.png'

const schema = z.object({
  code: z.string().min(3, { message: 'Promocode is required' }).max(256, { message: 'Promocode is too long' }),
  usage_left: z.number().optional(),
  details: z.object({}).optional(),
  expired_at: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'Promocode created date is too long' }),
  created_by: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'Promocode created date is too long' }),
});

export default function Page() {
  const [image, setImage] = useState(null);
  const [promocodedata = {}, setPromocodeData] = useMMKVObject('promocodedata', storage)
  const { push, replace, back } = useRouter()
  const queryClient = useQueryClient()
  const theme = useTheme();

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
      mutationFn: (promocode) => createPromocodes(promocode),
      onSuccess(data) {
        const {
          code,
          usage_left,
          details,
          expired_at,
          created_by } = data?.data?.data;

        const promocode = {
          code: '',
          usage_left: '', details: '', expired_at: '', created_by: ''

        }
        setPromocodeData(promocode);
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
      code: '',
      usage_left: '', details: '', expired_at: '', created_by: ''
    },
    resolver: zodResolver(schema),
  });

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Promocodes details updated'
    });
  }

  const onSubmit = data => {
    mutate(data)

  };

  const handleReset = () => {
    reset();
  };

  const handleSaveDraft = () => {
    // You can save the form data to a database or local storage
    const formData = getValues();
    console.log('Form data saved:', formData);
  };

  // React.useEffect(() => {
  //   refetch();
  // }, [])

  // console.log("Errors " + JSON.stringify(errors))

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
              name="code"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Code'
                  placeholder={"Promocode"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.code ? 'danger' : 'success'}`}
                  caption={`${errors?.code ? errors.code?.message : ''}`}
                />
              )}
            />


            <Controller
              control={control}
              name="usage_left"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Usage left'
                  placeholder={"Promo code usage left"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value="1"
                  size='large'
                  status={`${errors?.usage_left ? 'danger' : 'success'}`}
                  caption={`${errors?.usage_left ? errors.usage_left?.message : ''}`}
                />
              )}
            />

            <Controller
              control={control}
              name="details"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Discount Type'
                  placeholder={"Promocode details"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value='percentage'
                  size='large'
                  status={`${errors?.details ? 'danger' : 'success'}`}
                  caption={`${errors?.details ? errors.details?.message : ''}`}
                />
              )}
            />

            <Controller
              control={control}
              name="details"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Discount'
                  placeholder={"Promocode details"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value='30'
                  size='large'
                  status={`${errors?.details ? 'danger' : 'success'}`}
                  caption={`${errors?.details ? errors.details?.message : ''}`}
                />
              )}
            />

            <Controller
              control={control}
              name="details"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Value'
                  placeholder={"Promocode details"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value='600'
                  size='large'
                  status={`${errors?.details ? 'danger' : 'success'}`}
                  caption={`${errors?.details ? errors.details?.message : ''}`}
                />
              )}
            />
            <Controller
              control={control}
              name="details"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Minimum amount'
                  placeholder={"Promocode details"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value='1000'
                  size='large'
                  status={`${errors?.details ? 'danger' : 'success'}`}
                  caption={`${errors?.details ? errors.details?.message : ''}`}
                />
              )}
            />
            <Controller
              control={control}
              name="details"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Maximum amount'
                  placeholder={"Promocode details"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value='5000'
                  size='large'
                  status={`${errors?.details ? 'danger' : 'success'}`}
                  caption={`${errors?.details ? errors.details?.message : ''}`}
                />
              )}
            />
            <Toggle
              style={[styles.marginVertical, styles.alignSelf]}
            // checked='true'
            // onChange={onChange}
            // status={`${errors?.is_approved ? 'danger' : 'primary'}`}
            >
              {/* multi use */}
              Is this promocode can be used by multi users?
            </Toggle>
            <Toggle
              style={[styles.marginVertical, styles.alignSelf]}
            // checked='true'
            // onChange={onChange}
            // status={`${errors?.is_approved ? 'danger' : 'primary'}`}
            >
              {/* Unlimited? */}
              Is this promode can be used multiple times?
            </Toggle>
            <Toggle
              style={[styles.marginVertical, styles.alignSelf]}
            // checked='true'
            // onChange={onChange}
            // status={`${errors?.is_approved ? 'danger' : 'primary'}`}
            >
              {/* Bound to user?  if yes then show list*/}
              Is this promode used by particular users?
            </Toggle>

            {/* dropdown list of service provider */}
            <Input
              style={styles.marginVertical}
              label='Applicable service provider'
              placeholder={"Select service providers from list"}
              // onBlur={onBlur}
              // onChangeText={onChange}
              // value='600'
              size='large'
            // status={`${errors?.details ? 'danger' : 'success'}`}
            // caption={`${errors?.details ? errors.details?.message : ''}`}
            />

            <Controller
              control={control}
              name="expired_at"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Expired at'
                  placeholder={"Promo code expired at"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size='large'
                  status={`${errors?.expired_at ? 'danger' : 'success'}`}
                  caption={`${errors?.expired_at ? errors.expired_at?.message : ''}`}
                />
              )}
            />

            <Controller
              control={control}
              name="created_by"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.marginVertical}
                  label='Created by'
                  placeholder={"Promo code created by"}
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
              style={{ flexDirection: 'row', }}
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
    // marginVertical: 4,
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