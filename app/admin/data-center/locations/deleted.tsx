import React from 'react'
import { Link, useRouter } from "expo-router";
import { MotiView } from 'moti'
import { TouchableWithoutFeedback } from 'react-native';
import { Layout, Button, Icon, Text, Input, List, ListItem, Divider, Autocomplete, AutocompleteItem } from '@ui-kitten/components'
import { useActionSheet } from '@expo/react-native-action-sheet';

const cities = [
  {
    title: 'Bangalore',
    description: 'HQ',
    link: '/admin/data-center/locations/view/Bengaluru',
    icon: 'city-variant-outline',
    iconsPack: 'material-community'
  },
  {
    title: 'Manglore',
    description: 'Tier 2',
    link: '/admin/data-center/locations/view/Mysore',
    icon: 'ios-pin-outline',
    iconsPack: 'ionicons'
  },
  {
    title: 'Madras',
    description: 'Tier 1',
    link: '/admin/data-center/locations/view/Chennai',
    icon: 'ios-pin-outline',
    iconsPack: 'ionicons'
  },
]

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());


export default function Page() {
  const [value, setValue] = React.useState(null);
  const [sort, setSort] = React.useState('asc')
  const [data, setData] = React.useState(cities.sort(function(a, b) {
    if(a.title.toLowerCase() < b.title.toLowerCase()) return sort === 'asc' ? -1 : 1;
    if(a.title.toLowerCase() > b.title.toLowerCase()) return sort === 'asc' ? 1 : -1;
    return 0;
   }));
 // //  const sx = useSx()
  const { push, replace, back } = useRouter()

  const { showActionSheetWithOptions } = useActionSheet();

  const openSheet = () => {
    const options = ['Restore', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex: number) => {
      switch (selectedIndex) {

        case destructiveButtonIndex:
          // Delete
          break;

        case cancelButtonIndex:
          // Canceled
      }});
  }


  const onSelect = (index) => {
    setValue(cities[index]?.title);
    setData(cities.filter((item, i) => (i === index)));
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(cities.filter(item => filter(item, query)));
  };

  const clearInput = () => {
    setValue('');
    setData(cities);
  };

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={item.title + index}
      title={item.title}
    />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      key={item.title + index}
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={<Icon name={`${item.icon}`} pack={`${item.iconsPack}`} />}
      // accessoryRight={<Icon name={`ios-pencil-outline`} pack={`ionicons`} />}
      onPress={() => push(`${item.link}`)}
      onLongPress={openSheet}
    />
  );

  React.useEffect(() => {
    setData(data.sort(function(a, b) {
      if(a.title.toLowerCase() < b.title.toLowerCase()) return sort === 'asc' ? -1 : 1;
      if(a.title.toLowerCase() > b.title.toLowerCase()) return sort === 'asc' ? 1 : -1;
      return 0;
     }))
  }, [sort,data]);


  return (
    <Layout level='1' style={{ flex: 1 }}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}
        style={{ flex: 1, flexDirection: 'column' }}
      >
        <Autocomplete
          placeholder='Search locations'
          onSelect={onSelect}
          onChangeText={onChangeText}
          accessoryRight={value === '' ? <></> : renderCloseIcon}
          value={value}
          size="medium"
          setMaxLength={512}
          style={{ width: 400 }}
        >
          {data.map(renderOption)}
        </Autocomplete>
        <List
          data={value === undefined?  cities : data}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      </MotiView>

    </Layout>
  )
}
