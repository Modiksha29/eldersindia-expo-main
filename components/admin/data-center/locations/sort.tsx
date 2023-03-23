
import React from "react";
import ActionSheet, { SheetProps, SheetManager } from "react-native-actions-sheet";
import { View, ImageProps } from "react-native";
import { Menu, MenuItem, Text, IndexPath, Divider, Icon, IconProps, IconElement, Layout } from '@ui-kitten/components';

const sortings = ['name-asc', 'name-desc', 'updated_at-desc', 'updated_at-asc']

function SortSheet(props: SheetProps<{ sort: string }>) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(sortings.indexOf(props.payload)));

  return (
    <ActionSheet containerStyle={{backgroundColor: "#FFF"}} id={props.sheetId}>
      <Layout style={{ padding: 8 }}>
        <Text category="p1" status="primary" style={{ marginVertical: 8 }}>Sort by</Text>
        <Divider />
        <Menu
          selectedIndex={selectedIndex}
          onSelect={index => {
            setSelectedIndex(index)
            SheetManager.hide(props.sheetId, {
              payload: sortings[index.row],
            });
          }}>
          <MenuItem title='Alphabetically ascending' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} name='sort-alphabetical-ascending' pack='material-community' />} />
          <MenuItem title='Alphabetically descending' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} name='sort-alphabetical-descending' pack='material-community' />} />
          <MenuItem title='Newest first' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} name='sort-clock-ascending-outline' pack='material-community' />} />
          <MenuItem title='Oldest first' accessoryRight={(props: IconProps): IconElement<ImageProps> => <Icon {...props} name='sort-clock-descending-outline' pack='material-community' />} />
        </Menu>
      </Layout>
    </ActionSheet>
  );
}

export default SortSheet;