import React from 'react'
import { Layout, Button, Icon, Text, Input } from '@ui-kitten/components'
import { MotiView, ScrollView, } from 'moti'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions, ImageBackgroundComponent } from "react-native"
import { useRouter } from 'expo-router'

export default function Page() {
    const { push, replace, back, } = useRouter()

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
                            placeholder={"Branch location"}
                            label='Branch location'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.branch_location ? 'danger' : 'success'}`}
                        // caption={`${errors?.branch_location ? errors.branch_location?.message : ''}`}
                        />
                        {/* )}
           name='branch_location'
         /> */}

                        {/* <Controller
           // control={control}
           render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Contact person"}
                            label='Contact person'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.contact_person ? 'danger' : 'success'}`}
                        // caption={`${errors?.contact_person ? errors.contact_person?.message : ''}`}
                        />
                        {/* )}
           name='contact_person'
         /> */}

                        {/* <Controller
           // control={control}
           render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Contact number"}
                            label='Contact number'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.contact_number ? 'danger' : 'success'}`}
                        // caption={`${errors?.contact_number ? errors.contact_number?.message : ''}`}
                        />
                        {/* )}
           name='contact_number'
         /> */}

                        {/* <Controller
           // control={control}
           render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Contact email"}
                            label='Contact email'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.conatcat_email ? 'danger' : 'success'}`}
                        // caption={`${errors?.conatcat_email ? errors.conatcat_email?.message : ''}`}
                        />
                        {/* )}
           name='conatcat_email'
         /> */}

                        {/* <Controller
           // control={control}
           render={({ field: { onChange, onBlur, value } }) => ( */}
                        <Input
                            style={styles.marginVertical}
                            placeholder={"Designation"}
                            label='Designation'
                        // onBlur={onBlur}
                        // onChangeText={onChange}
                        // value={value}
                        // status={`${errors?.designation ? 'danger' : 'success'}`}
                        // caption={`${errors?.designation ? errors.designation?.message : ''}`}
                        />
                        {/* )}
           name='designation'
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
                                // onPress={() => isPresented()}
                                size='small'>Reset</Button>
                            <Button status='warning' appearance='outline' style={{ flex: 1, marginHorizontal: 4 }}
                                // onPress={() => isPresented()}
                                size='small'>Save Draft</Button>
                            <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                                // onPress={handleSubmit(onSubmit)}
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