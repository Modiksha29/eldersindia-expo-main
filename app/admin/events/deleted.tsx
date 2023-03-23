import React, { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import { MotiView } from 'moti'
import { ImageProps, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { Layout, Button, Icon, Text, Input, Card, useTheme, IconProps, IconElement, Spinner, Divider, List } from '@ui-kitten/components'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from "react-hook-form";
import { SheetManager } from 'react-native-actions-sheet'
import { getDestroiedEventsRecord } from 'apis/admin/events'
import Toast from 'react-native-toast-message';
import ErrorImage from 'assets/images/Error404.png'
import NoDataFound from 'assets/images/NoDataFound.png'

const RetryIcon = (props: IconProps): IconElement<ImageProps> => <Icon {...props} fill={props.color} style={[props.style, { tintColor: props.color }]} name='refresh-outline' width={32} heigth={32} />

export default function Page() {
  const { push } = useRouter()
  const fetchEvents = (page = 1, sort, search) => getDestroiedEventsRecord(page, sort, search)
  const [page = 1, setPage] = useState();
  const [sort = 'title-desc', setSort] = useState();
  const [search = '', setSearch] = useState();
  const [eventsdata, setEventsData] = useState([])
  const [selectedCount, setSelectedCount] = useState(0);
  const theme = useTheme();
  const list = React.useRef(null)
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: events,
    isFetching,
    refetch
  } = useQuery({
    // enabled: false,
    queryKey: ['events', page, sort, search],
    queryFn: () => fetchEvents(page, sort, search),
    onSuccess(data) {
      console.log('Called')
      let list = []
      data.data?.data?.data?.map((l, i) => {
        console.log('inside')
        list.push({
          id: l.id,
          title: l.title,
          image: l.image,
          link: `/admin/events/${l.id}/${l.title['en']}`,
        })
      })
      list.length > 0 && setEventsData(eventsdata.concat(list));
    },
  })

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


  const renderNewItem = React.useCallback(({ item, index }) => (

    <MotiView style={{ flex: 1, padding: 4 }}>
      <ScrollView>
        <Card
          // onPress={() => selectedCount > 0 ? handelSection(item.id, item.isSelected) : push(item.link)}
          // onLongPress={() => handelSection(item.id, item.isSelected)}
          style={{
            // backgroundColor: theme[`color-basic-${item.isSelected ? 400 : 100}`],
            marginBottom: 4,
          }}
        >
          <MotiView style={{ flexDirection: "row" }}>
            <Image
              source={item.image}
              alt="A cool artist's image."
              style={{ borderRadius: 12, width: 50, height: 50 }}
            />

            <MotiView style={{ marginRight: 32, justifyContent: 'center' }}>

              <Text category='s1' style={{ marginLeft: 8, justifyContent: "center", alignSelf: "center" }}>
                {`${item.title?.en}`}
                {/* Estate planning takes care of family's wealth after you */}
              </Text>



            </MotiView>

          </MotiView>
          <Divider style={{ marginTop: 8 }} />
          <MotiView style={{ marginTop: 8, alignItems: 'flex-end' }} >

            <Button status='success' appearance='outline' style={{ marginHorizontal: 4, width: 70 }}
              // onPress={() => isPresented()}
              size='tiny'>Resotre</Button>

          </MotiView>

        </Card>
      </ScrollView>

    </MotiView>

  ), []);

  if (isLoading) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status='primary' />
      <Text category='label' status='primary' style={{ textAlign: 'center', margin: 16 }}>Loading...</Text>
    </Layout>
  }

  if (isError) {
    return <Layout level='1' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Divider />

      <MotiView style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Image
          source={ErrorImage}
          alt="A cool artist's image."
          style={{ borderRadius: 1, width: 300, height: 200 }}
        />
      </MotiView>
      <Text category='h6' status="success" style={{ textAlign: 'center', marginVertical: 8 }}>Oops something went wrong...</Text>
      <Text category='s1' status='warning' style={{ textAlign: 'center', marginVertical: 8 }}>Failed to get deleted events details.</Text>
      <Button status='primary' appearance='outline' onPress={() => refetch()}
        style={{ width: "50%" }} accessoryLeft={
          <RetryIcon color={theme['color-primary-default']} />}>Retry
      </Button>
    </Layout>
  }
  if (isSuccess) {

    return (
      <Layout level='1' style={{ flex: 1 }}>
        {isSuccess && <List
          ref={list}
          data={eventsdata}
          renderItem={renderNewItem}
        />
        }
      </Layout>
    )
  }

}
