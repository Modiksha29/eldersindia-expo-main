import React from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-ios-back-outline'/>
);
const MenuIcon1 = (props) => (
  <Icon {...props} name='menu-2-outline'/>
);

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

export const ServicePartnerTopNavigation = (navigation) => {
  const theme = useTheme()
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon}/>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction appearance='control' icon={navigation.isBackButtonShown ? BackIcon : MenuIcon1} onPress={() => navigation.isBackButtonShown ? navigation.navigation.pop() : navigation.navigation.toggleDrawer()}/>
  );

  return (
    <Layout style={[styles.container, {backgroundColor: theme['color-primary-default']}]} >
      <TopNavigation
        appearance='control'
        alignment='center'
        title={`${navigation?.title}`}
        accessoryLeft={renderBackAction}
        // accessoryRight={renderRightActions}
        style={{backgroundColor: theme['color-primary-default']}}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    minHeight: 90
  },
});