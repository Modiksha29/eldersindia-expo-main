import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { MotiView } from 'moti'
import { SheetManager } from 'react-native-actions-sheet'
import { Layout, Button, Icon, Text, Spinner, List, ListItem, Card, Divider, useTheme, IconProps, IconElement, Input, Popover, Avatar, RangeDatepicker, Toggle } from '@ui-kitten/components'
import { ImageProps, TouchableOpacity, StyleSheet, ScrollView, Modal, Image } from 'react-native'
import { ManageTransactionDetailScreen } from 'components/admin/wallets/transaction-details';
import { useNavigation } from '@react-navigation/native';
import { faker } from '@faker-js/faker';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWalletsRaed, updateWallets } from 'apis/admin/wallets'
import Toast from 'react-native-toast-message';
import { useMMKVObject } from 'react-native-mmkv'
import { storage } from 'provider/storageProvider'
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import PlaceholderImage from 'assets/images/favicon.png'

const itemList = [
  { id: 1, money: 600, name: faker.name.fullName() },
  { id: 2, money: 1600, name: faker.name.fullName() },
  { id: 3, money: 2000, name: faker.name.fullName() },
  { id: 4, money: 850, name: faker.name.fullName() },
  { id: 5, money: 7000, name: faker.name.fullName() },
  { id: 6, money: 5500, name: faker.name.fullName() },
];

const SearchIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='search-outline' width={32} heigth={32} />

const CloseIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} color={props.color} style={[props.style, { tintColor: props.color }]} name='close-circle-outline' width={32} heigth={32} />

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

export default function Page({ navigate, toggleModal }) {
  
  const { push, replace, back } = useRouter()
  const {id} = useSearchParams()

  const theme = useTheme();
  const [page = 1, setPage] = useState();
  const [sort = 'type', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [selectedCount, setSelectedCount] = useState(0);
  const [walletsdata, setWalletsData] = useState([])
  const [range, setRange] = React.useState({});
  const [showDetails, setShowDetails] = useState(false);
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  // const [walletdata = {}, setWalletsData] = useMMKVObject('walletdata', storage)
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

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

      mutationFn: (wallets) => updateWallets(wallets),

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

        const wallets = {
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
        setWalletsData(walletsdata);
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
    queryKey: ['wallets', id],
    queryFn: ({ queryKey }) => getWalletsRaed(queryKey[1]),
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

      const wallets = {
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

      reset(wallets)
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

  // const handelSection = (id, isSelected) => {
  //   isSelected ? setSelectedCount(old => old - 1) : setSelectedCount(old => old + 1)

  //   setWalletsData(walletsdata => walletsdata.map((item) => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         isSelected: !item.isSelected,
  //       }
  //     }
  //     return item
  //   }))

  // };

  const openSortSheet = async () => {
    const sortType = await SheetManager.show('locations-sort-sheet', { payload: sort })
    if (sortType !== undefined) {
      setSort(sortType)
      // list?.current.scrollToIndex({ animated: true, index: 0 })
    }
  }
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  };

  const handleSearch = (value) => {
    setSearch(value)
  }
  const optimizedFn = React.useCallback(debounce(handleSearch), []);

  const transactionDetails = () => {
    setModalVisible(true);
  };
  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <Layout level='1' style={{ flex: 1, padding: 8 }}>
      <MotiView>
        {/* Sort and Filter section */}
        <MotiView
          style={{ flexDirection: 'row' }}
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
          <Button status='primary' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-primary-default'] }]} name='ios-swap-vertical-outline' pack='ionicons'
          />}
            onPress={openSortSheet}
          >Sort</Button>
          <Button status='warning' appearance='ghost' style={{ flex: 1 }} accessoryLeft={(props: IconProps): IconElement<ImageProps> => <Icon {...props} style={[props.style, { tintColor: theme['color-warning-default'] }]} name='ios-filter-outline' pack='ionicons'
          />}>Filter</Button>

        </MotiView>

        <Divider />

        {/* Search Section */}

        <Input size='medium' placeholder='Search a wallet' onChangeText={nextValue => optimizedFn(nextValue)} accessoryRight={search !== "" ? <CloseIcon color={theme['color-danger-default']} onPress={() => optimizedFn("")} /> : <SearchIcon color={theme['color-primary-default']} />} />

        <Divider />

      </MotiView>
      <>
        <RangeDatepicker
          style={{ marginTop: 4 }}
          range={range}
          onSelect={nextRange => setRange(nextRange)}
          placeholder="16/02/2023 - 16/03/2023"
        />
        {range && (
          <ScrollView>
            {/* <Card style={{ borderRadius: 12, marginTop:8 }}> */}
            {/* <MotiView> */}
            {itemList.map((item, index) => (
              <Card style={{ borderRadius: 12, marginTop: 8 }}>
                <TouchableOpacity onPress={transactionDetails}>
                  <MotiView style={{ flexDirection: "row" }}>
                    <Image
                      source={{uri: "https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-payment-icon-png-image_4142438.jpg", width: 50, height: 50}}
                      // src={`${item.logo}`}
                      alt="A cool artist's image."
                      style={{ borderRadius: 12 }}
                    />
                    <MotiView style={{ marginLeft: 8 }}>
                      <Text>{item.money}</Text>
                      <Text>{item.name}</Text>
                    </MotiView>
                  </MotiView>
                </TouchableOpacity></Card>
            ))}
            {/* </Card> */}
            <Modal
              animationType="fade"
              visible={modalVisible}
              transparent={true}
              onRequestClose={onClose}>
              <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <MotiView style={{ backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
                  <MotiView>
                    <Text>Paid to</Text>
                    <MotiView style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                      <Text category='h6'>Lance Reilly</Text>
                      <Text category='h6'>600</Text>
                    </MotiView>
                    <Text category='s1' style={{ marginTop: 8 }}>Banking Name : Lance Reilly</Text>
                  </MotiView>
                  <MotiView style={{ flexDirection: 'row', marginTop: 12 }}>
                    <Icon
                      style={{ width: 18, height: 18, marginRight: 16, tintColor: theme['color-warning-500'] }}
                      fill={theme['color-warning-500']}
                      name={'ios-calendar-outline'}
                      pack={'ionicons'}
                    />
                    <Text> Transfer Details</Text>
                  </MotiView>
                  <MotiView style={{ flexDirection: 'row', padding: 4, borderWidth: 1, borderColor: theme['color-success-500'], borderRadius: 4, borderStyle: 'solid', marginTop: 4 }}>
                    <MotiView style={{ padding: 8 }}>
                      <Text category='s1'>Payment id</Text>
                      <Text category='s1'>Entity</Text>
                      <Text category='s1'>Status</Text>
                      <Text category='s1'>Method</Text>
                      <Text category='s1'>Description</Text>
                      <Text category='s1'>Upi</Text>
                    </MotiView>
                    <MotiView style={{ marginLeft: 4, padding: 8 }}>
                      <Text>pay_LFsY0VVq5xZ3Ii</Text>
                      <Text>payment</Text>
                      <Text>authorized</Text>
                      <Text>upi</Text>
                      <Text>Health Care Transaction</Text>
                      <Text>mani@ybl</Text>
                    </MotiView>
                  </MotiView>
                  <TouchableOpacity onPress={onClose} style={{ marginTop: 16 }}>
                    <Text style={{ color: 'blue' }}>Close</Text>
                  </TouchableOpacity>
                </MotiView>
              </MotiView>
            </Modal>
            {/* </MotiView> */}


          </ScrollView>
        )}
      </>

    </Layout>
  )
}

const Modal2 = ({ selectedItem }) => {
  const theme = useTheme();
  return (
    <Layout level='1' style={{ flex: 1, padding: 12, }}>

      <ScrollView>
        <MotiView style={{ backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
          <MotiView>
            <Text>Paid to</Text>
            <MotiView style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <Text category='h6'>Lance Reilly</Text>
              <Text category='h6'>600</Text>
            </MotiView>
            <Text category='s1' style={{ marginTop: 8 }}>Banking Name : Lance Reilly</Text>
          </MotiView>
          <MotiView style={{ flexDirection: 'row', marginTop: 12 }}>
            <Icon
              style={{ width: 18, height: 18, marginRight: 16, tintColor: theme['color-warning-500'] }}
              fill={theme['color-warning-500']}
              name={'ios-calendar-outline'}
              pack={'ionicons'}
            />
            <Text> Transfer Details</Text>
          </MotiView>
          <MotiView style={{ flexDirection: 'row', padding: 4, borderWidth: 1, borderColor: theme['color-success-500'], borderRadius: 4, borderStyle: 'solid', marginTop: 4 }}>
            <MotiView style={{ padding: 8 }}>
              <Text category='s1'>Payment id</Text>
              <Text category='s1'>Entity</Text>
              <Text category='s1'>Status</Text>
              <Text category='s1'>Method</Text>
              <Text category='s1'>Description</Text>
              <Text category='s1'>Upi</Text>
            </MotiView>
            <MotiView style={{ marginLeft: 4, padding: 8 }}>
              <Text>pay_LFsY0VVq5xZ3Ii</Text>
              <Text>payment</Text>
              <Text>authorized</Text>
              <Text>upi</Text>
              <Text>Health Care Transaction</Text>
              <Text>mani@ybl</Text>
            </MotiView>
          </MotiView>
        </MotiView>
      </ScrollView>

    </Layout>
  );
};

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 4,
    marginBottom: 8,
  },
  alignSelf: {
    alignSelf: 'flex-start',
  },
})