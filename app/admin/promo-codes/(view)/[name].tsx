import React, { useState, useEffect } from 'react'
import { Link, useRouter, useSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Text, Input, Toggle, Button, Spinner, Select, SelectItem, IndexPath, Layout, useTheme } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView, ScrollView, } from 'moti'
import { StyleSheet, ImageBackground, Image } from "react-native"
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPromocodesRead, updatePromocodes } from 'apis/admin/promo-codes'
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
// import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'

import PlaceholderImage from 'assets/images/favicon.png'

const schema = z.object({
  id: z.string(),
  code: z.string().min(3, { message: 'Promocode is required' }).max(256, { message: 'Promocode is too long' }),
  usage_left: z.number().optional(),
  details: z.object({}).optional(),
  expired_at: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'Promocode created date is too long' }),
  created_at: z.string().min(3, { message: 'Date is required' }).max(256, { message: 'Promocode created date is too long' }),
});

export default function Page({ navigation }) {

  //Image Picker
  const [image, setImage] = useState(null);

  const {id} = useSearchParams()
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
      mutationFn: (promocode) => updatePromocodes(promocode),
      onSuccess(data) {
        const { id,
          code,
          usage_left,
          details,
          expired_at,
          created_at } = data?.data?.data;

        const promocode = {
          id, code, usage_left,
          details,
          expired_at, created_at

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
      id: id,
      code: '',
      usage_left: '', details: '', expired_at: '', created_at: ''
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    enabled: true,
    queryKey: ['promocodes', id],
    queryFn: ({ queryKey }) => getPromocodesRead(queryKey[1]),
    onSuccess(data) {
      const { id, code, usage_left, details, expired_at, created_at } = data?.data?.data;

      const promocodes = {
        id, code, usage_left, details, expired_at, created_at
      }

      reset(promocodes)
    }
  })

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Promocodes details updated'
    });
  }

  const onSubmit = data => {
    console.log("done")
    mutate(data)

  };

  // React.useEffect(() => {
  //   refetch();
  // }, [])

  // console.log("Errors " + JSON.stringify(errors))

  if (isLoading) {
    return <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </MotiView>
  }

  if (isError) {
    return <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text category='s1' status="danger" style={{ textAlign: 'center' }}>Failed to get promocode.</Text>
    </MotiView>
  }
  if (isSuccess) {
    return (
      <Layout style={{ flex: 1 }}>
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

            {/* <Controller
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
            /> */}

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
})