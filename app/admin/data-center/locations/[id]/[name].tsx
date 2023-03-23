import React from 'react'
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Text, Input, Toggle, Button, Spinner, Select, SelectItem, IndexPath, Layout } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView } from 'moti'
import { StyleSheet } from "react-native"
import { useRouter, useSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLocation, updateLocation } from 'apis/admin/data-center/locations'

import {useMMKVObject} from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'

const tiers = [
  'Tier 1',
  'Tier 2',
  'Tier 3',
];

const schema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Location name is required' }).max(256, { message: 'Location name is too long' }),
  tier: z.object({
    row: z.number().gte(0, { message: 'Tier number should be above 0' }).lte(2, { message: 'Tier number should be less than 3' }),
    section: z.number().optional()
  }),
  description: z.string().optional(),
  is_active: z.boolean({
    required_error: "is active location is required",
    invalid_type_error: "is active location must be a boolean",
  }),
  latitude: z.number().finite().gte(-90, { message: 'Latitude must be above -90' }).lte(90, { message: 'Latitude must be below 90' }).optional(),
  longitude: z.number().finite().gte(-180, { message: 'Longitude must be above -180' }).lte(180, { message: 'Longitude must be below -180' }).optional(),
});

export default function Page({ navigation }) {
    const params = useSearchParams()
  const {id} = params;
  const [location, setLocation] = useMMKVObject('location', storage)
  const { push, replace, back } = useRouter()
  const queryClient = useQueryClient()
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
      mutationFn: (location) => updateLocation(location),
      onSuccess(data) {
        const { id, name, description, tier, is_active, geo_location, updated_at } = data?.data?.data;
        const location = {
          id,
          name: name?.en,
          description: description?.en,
          is_active,
          tier,
          longitude: geo_location?.coordinates[0] || undefined,
          latitude: geo_location?.coordinates[1] || undefined,
          updated_at: new Date(updated_at*1000)
        }
        setLocation(location);
        showToast();
      },
      onError(error, variables, context) {
        const errors = error?.response?.data?.errors
        Object.keys(errors).map((key: string) => {
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
      tier: new IndexPath(0),
      description: '',
      is_active: true,
      latitude: undefined,
      longitude: undefined
    },
    resolver: zodResolver(schema),
  });

  const { isLoading, isError, isSuccess, data, error, refetch, isPreviousData } = useQuery({
    enabled: false,
    queryKey: ['location', id],
    queryFn: ({ queryKey }) => getLocation(queryKey[1]),
    onSuccess(data) {
      const { id, name, description, tier, is_active, geo_location } = data?.data?.data;
      const location = {
        id,
        name: name?.en,
        description: description?.en,
        is_active,
        tier: new IndexPath(parseInt(tier) - 1),
        longitude: geo_location?.coordinates[0] || undefined,
        latitude: geo_location?.coordinates[1] || undefined
      }

      reset(location)
    }
  })

  const isPresented = () => back();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated',
      text2: 'Location details updated'
    });
  }

  const onSubmit = data => {
    data.tier = data.tier?.row + 1
    mutate(data)
  };

  React.useEffect(() => {
    refetch();
  }, [])


  if (isLoading) {
    return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </Layout>
  }

  if (isError) {
    return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text category='s1' status="danger" style={{ textAlign: 'center' }}>Failed to get location.</Text>
    </Layout>
  }
  if (isSuccess) {
    return (
      <Layout style={{ flex: 1, }}>
        {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
        {!isPresented && <Link href="../">Dismiss</Link>}
        <MotiView from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing' }}
          style={{ paddingVertical: 8, paddingHorizontal: 8 }}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.marginVertical}
                label='Name'
                placeholder={"Location name"}
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
            name="tier"
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                label='Tier'
                value={tiers[value.row]}
                selectedIndex={value}
                onSelect={onChange}
                size='large'
                onBlur={onBlur}
                status={`${errors?.tier ? 'danger' : 'success'}`}
                caption={`${errors?.tier ? errors.tier?.message : ''}`}
              >
                <SelectItem title='Tier 1' />
                <SelectItem title='Tier 2' />
                <SelectItem title='Tier 3' />
              </Select>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label='Description'
                placeholder={`Description`}
                value={value}
                onChangeText={onChange}
                multiline={true}
                textStyle={{ minHeight: 120 }}
                style={styles.marginVertical}
                size='large'
                status={`${errors?.description ? 'danger' : 'success'}`}
                caption={`${errors?.description ? errors.description?.message : 'This is only visible to admins'}`}
              />
            )}
          />
          <Controller
            control={control}
            name="is_active"
            render={({ field: { onChange, onBlur, value } }) => (
              <Toggle
                style={[styles.marginVertical, styles.alignSelf]}
                checked={value}
                onChange={onChange}
                status={`${errors?.is_active ? 'danger' : 'primary'}`}
              >
                Is Location active?
              </Toggle>
            )}
          />
          <Controller
            control={control}
            name="latitude"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Latitude"
                placeholder={`Latitude`}
                value={value?.toString()}
                onChangeText={newValue => onChange(parseFloat(newValue))}
                style={styles.marginVertical}
                size='large'
                keyboardType='numeric'
                status={`${errors?.latitude ? 'danger' : 'success'}`}
                caption={`${errors?.latitude ? errors.latitude?.message : 'Optional'}`}
              />
            )}
          />
          <Controller
            control={control}
            name="longitude"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Longitude"
                placeholder={`Longitude`}
                value={value?.toString()}
                onChangeText={newValue => onChange(parseFloat(newValue))}
                style={styles.marginVertical}
                size='large'
                keyboardType='numeric'
                status={`${errors?.longitude ? 'danger' : 'success'}`}
                caption={`${errors?.longitude ? errors.longitude?.message : 'Optional'}`}
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
            <Button status='danger' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }} onPress={() => isPresented()}
            >Cancel</Button>
            
            <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }} 
            onPress={handleSubmit(onSubmit)} 
            disabled={isMutationLoading}>
              
              {`${isMutationLoading ? 'Updating' : 'Update'}`}
              
            </Button>
          </MotiView>
        </MotiView>
        {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
        <StatusBar barStyle="light-content" />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 4,
  },
  alignSelf: {
    alignSelf: 'flex-start',
  },
})