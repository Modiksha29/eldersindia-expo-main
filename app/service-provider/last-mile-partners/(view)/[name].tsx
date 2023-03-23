import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView, ScrollView } from 'moti'
import { Layout, Button, Icon, Text, Input } from '@ui-kitten/components'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ImageProps, Dimensions } from "react-native"
import { faker } from '@faker-js/faker';

export function Modal() {
  const { push, replace, back } = useRouter()


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
              value={`${faker.name.firstName()}`}
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
              value={`${faker.name.lastName()}`}
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
              placeholder={"Email id"}
              label='Email id'
              // onBlur={onBlur}
              // onChangeText={onChange}
              value={faker.internet.email()}
            // status={`${errors?.email ? 'danger' : 'success'}`}
            // caption={`${errors?.email ? errors.email?.message : ''}`}
            />
            {/* )}
              name='email'
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
              value={faker.phone.number()}
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
              value={'30'}
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
              value={faker.name.sexType()}
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
              style={{ flexDirection: 'row', marginBottom: 40 }}
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
              >Cancel</Button>
              <Button status='primary' style={{ flex: 1, marginHorizontal: 4 }}
                // onPress={handleSubmit(onSubmit)}
              >
                {/* {`${isMutationLoading ? 'Updating' : 'Update'}`} */}Update
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