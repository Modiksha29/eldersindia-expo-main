import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView, MotiSafeAreaView, MotiScrollView } from 'moti'
import { Layout, Button, Icon, Text, Input, useTheme, Spinner, } from '@ui-kitten/components'
import Logo from 'assets/images/Logo'
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import login from 'apis/auth/login'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useAuth } from "provider/auth-provider";

const schema = z.object({
  phoneOrEmail: z.string().regex(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$/, { message: "Please enter valid phone or email" })
})

export default function Page() {
  const { push, replace, back } = useRouter()
  const { signIn } = useAuth();
  const theme = useTheme();

  const { control, handleSubmit, formState: { errors }, setValue, getValues, setError, reset } = useForm({
    defaultValues: {
      phoneOrEmail: ''
    },
    resolver: zodResolver(schema),
  });

  const { data: mutateData,
    error: mutateError,
    isError: isMutateError,
    isIdle,
    isLoading: isMutationLoading,
    isPaused,
    isSuccess: isMutationSuccess,
    isError,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset: mutateReset,
    status, } = useMutation({
      retry: 2,
      mutationFn: (data) => login(data),
      onSuccess(data) {
        const response = data?.data;
        console.log(response)
        if (response?.success) {
          push({ pathname: response?.data?.route, params: { generatedFor: response?.data?.generated_for } })
        }
        else alert(`Unable to request for ${response?.data?.generated_for}`)
      },
      onError(error, variables, context) {
        const errors = error?.response?.data?.errors
        alert(`Couldn't request OTP. Please try again.`)
        Object.keys(errors).map((key: string) => {
          errors[key].map(e => {
            setError(key, { type: 'custom', message: e })
          })
        })
      },
    })

  const onSubmit = data => {
    mutate({
      [`${data?.phoneOrEmail?.includes('@') ? 'email' : 'phone'}`]: data?.phoneOrEmail
    });
  };

  return (
    <LinearGradient
      colors={[theme['color-basic-100'], theme['color-basic-100'], theme['color-primary-200']]}
      style={{ flex: 1 }}
    >
      <Layout style={{ flex: 1, backgroundColor: 'transparent' }}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>

            <Logo width={400} height={157} />
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing' }}
              style={{ paddingVertical: 64, width: 340 }}
            >
              <Controller
                control={control}
                name="phoneOrEmail"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Phone number or Email address'
                    placeholder={"Phone or Email"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    size='large'
                    status={`${errors?.phoneOrEmail ? 'danger' : 'success'}`}
                    caption={`${errors?.phoneOrEmail ? errors.phoneOrEmail?.message : ''}`}
                    style={{ marginVertical: 8 }}
                    keyboardType="email-address"
                    returnKeyType="done"
                  />
                )}
              />


              <Button size='medium' onPress={handleSubmit(onSubmit)} disabled={isMutationLoading}>
                <Text>{`Signin or Signup`}</Text>
              </Button>
              {/* <Button size='medium' onPress={() => signIn()} disabled={isMutationLoading}>
                <Text>{`Signin or Signup`}</Text>
              </Button> */}
            </MotiView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Layout>
    </LinearGradient>
  )
}
