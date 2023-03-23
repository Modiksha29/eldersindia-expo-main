import React from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input, useTheme } from '@ui-kitten/components'
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { verifyOtp } from 'apis/auth/login'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Timer from 'components/login/timer';
import login from 'apis/auth/login'
import { useMMKVObject, useMMKVString } from 'react-native-mmkv'
import {storage} from 'provider/storageProvider'
import { useAuth } from '../../provider/auth-provider'

const schema = z.object({
    // otp: z.coerce.number({
    //     required_error: "OTP is required",
    //     invalid_type_error: "OTP must be a number",
    // }).int().gte(100000, { message: "OTP must be 6 digits" }).lte(999999, { message: "OTP must be 6 digits" }),
    otp: z.string({required_error: "OTP is required", invalid_type_error: "OTP must be a number",}).length(6, {message: "OTP must be 6 digits"}),
    generatedFor: z.string()
})


export default function Page() {
    const{signIn} = useAuth();
    const { push, replace, back } = useRouter()
    const { generatedFor } = useSearchParams()
    const [timeOut, setTimeOut] = React.useState(false)
    const [data = null, setData] = useMMKVObject('data', storage);
    const [token, setToken] = useMMKVString('token', storage)
    const theme = useTheme()

    const { data: mutateData,
        error: mutateError,
        isError: isMutateError,
        isIdle,
        isLoading: isMutationLoading,
        mutate,
        status, } = useMutation({
            staleTime: Infinity,
            mutationFn: (data) => verifyOtp(data),
            onSuccess(data) {
                const response = data?.data
                console.log(response)
                if(response?.success) {
                    setData(response?.data)
                    setToken(response?.data?.token)
                    if(response?.data?.user?.roles?.length > 0) {
                        signIn(response.data.user)
                    }
                    else {
                        push(response?.data?.route)
                    }
                }
                else {
                    setError('otp', {type: 'custom', message: response?.message})
                }

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

    const {
        mutate: loginMutate, } = useMutation({
            mutationFn: (data) => login(data),
            onSuccess(data) {
                const response = data?.data
                console.log(response)
                if (response?.success) {
                    setTimeOut(false)
                }
                else alert(`Unable to request for ${response?.data?.generated_for}`)
            },
            onError(error, variables, context) {
                const errors = error?.response?.data?.errors
                alert(`Couldn't request OTP. Please try again.`)
            },
        })

    const { control, handleSubmit, formState: { errors }, setValue, getValues, setError, reset } = useForm({
        defaultValues: {
            otp: '',
            generatedFor,
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = data => {
        setData(undefined)
        mutate(data)
    };

    return (
        <LinearGradient
            colors={[theme['color-basic-100'], theme['color-basic-100'], theme['color-primary-100']]}
            style={{ flex: 1 }}
        >
            <Layout style={{ flex: 1, backgroundColor: 'transparent' }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                        <MotiView
                            from={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: 'timing' }}
                            style={{ paddingVertical: 16, width: 340, justifyContent: 'center', alignItems: 'center', }}
                        >

                            <Text category='h6' style={{ textAlign: 'center' }}>OTP sent to {generatedFor}</Text>
                            <Controller
                                control={control}
                                name="otp"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        label='Enter OTP'
                                        placeholder={"OTP"}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        size='large'
                                        status={`${errors?.otp ? 'danger' : 'success'}`}
                                        caption={`${errors?.otp ? errors.otp?.message : ''}`}
                                        style={{ marginVertical: 8 }}
                                        keyboardType="number-pad"
                                    />
                                )}
                            />
                            <MotiView style={{ gap: 8, alignItems: 'center', }}>
                                <Button size='medium' status="primary" onPress={handleSubmit(onSubmit)} disabled={isMutationLoading}>
                                    <Text>{`Verify`}</Text>
                                </Button>
                                {timeOut ? <Button size='medium' appearance='ghost' status="info" onPress={() => loginMutate({
                                    [`${generatedFor.includes('@') ? 'email' : 'phone'}`]: generatedFor
                                })} >
                                    <Text>{`Request a new OTP`}</Text>
                                </Button> : <Timer initialSeconds={20} timeout={() => setTimeOut(true)} />}
                            </MotiView>
                        </MotiView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Layout>
        </LinearGradient>
    )
}
