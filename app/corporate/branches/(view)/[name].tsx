import React from 'react'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Layout, Button, Icon, Text, Input } from '@ui-kitten/components'
import { StyleSheet, ImageBackground, TouchableOpacity, ImageProps } from "react-native"

export default function Page() {
  ////  const sx = useSx()
  const { push, replace, back, } = useRouter()


  return (
    <Layout level='1' style={{ flex: 1 }}>
      <MotiView
        style={{ padding: 12 }}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}
      >
        {/* <Controller
              control={control}
              name="branch_location"
              render={({ field: { onChange, onBlur, value } }) => ( */}
        <Input
          style={styles.marginVertical}
          label='Branch location'
          placeholder={"Branch location"}
        // onBlur={onBlur}
        // onChangeText={onChange}
        value={'Bengaluru'}
        // size='large'
        // status={`${errors?.branch_location ? 'danger' : 'success'}`}
        // caption={`${errors?.branch_location ? errors.branch_location?.message : ''}`}
        />
        {/* )}
            /> */}

        {/* <Controller
              control={control}
              name="contact_person"
              render={({ field: { onChange, onBlur, value } }) => ( */}
        <Input
          style={styles.marginVertical}
          label='Contact person'
          placeholder={"Contact person"}
        // onBlur={onBlur}
        // onChangeText={onChange}
        value={'Krishna'}
        // size='large'
        // status={`${errors?.contact_person ? 'danger' : 'success'}`}
        // caption={`${errors?.contact_person ? errors.contact_person?.message : ''}`}
        />
        {/* )}
            /> */}

        {/* <Controller
              control={control}
              name="designation"
              render={({ field: { onChange, onBlur, value } }) => ( */}
        <Input
          style={styles.marginVertical}
          label='Designation'
          placeholder={"Designation"}
        // onBlur={onBlur}
        // onChangeText={onChange}
        value={'Senior HR'}
        // size='large'
        // status={`${errors?.designation ? 'danger' : 'success'}`}
        // caption={`${errors?.designation ? errors.designation?.message : ''}`}
        />
        {/* )}
            /> */}

        {/* <Controller
              control={control}
              name="contact_number"
              render={({ field: { onChange, onBlur, value } }) => ( */}
        <Input
          style={styles.marginVertical}
          label='Contact number'
          placeholder={"Contact number"}
        // onBlur={onBlur}
        // onChangeText={onChange}
        value={'+91 1234567890'}
        // size='large'
        // status={`${errors?.contact_number ? 'danger' : 'success'}`}
        // caption={`${errors?.contact_number ? errors.contact_number?.message : ''}`}
        />
        {/* )}
            /> */}

        {/* <Controller
              control={control}
              name="contact_email"
              render={({ field: { onChange, onBlur, value } }) => ( */}
        <Input
          style={styles.marginVertical}
          label='Contact email id'
          placeholder={"Contact email id"}
        // onBlur={onBlur}
        // onChangeText={onChange}
        value={'krishna@elderswealth.com'}
        // size='large'
        // status={`${errors?.contact_email ? 'danger' : 'success'}`}
        // caption={`${errors?.contact_email ? errors.contact_email?.message : ''}`}
        />
        {/* )}
            /> */}

      </MotiView>
      <MotiView
        style={{ flexDirection: 'row', marginTop: 8, padding:12 }}
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