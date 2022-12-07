import React, { useState } from 'react';
import { useContext } from 'react';
import {
  Button,
  Dialog,
  IconButton,
  Menu,
  Modal,
  Paragraph,
  Portal,
  Snackbar,
  Text,
} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { MainContext } from '../contexts/MainContext';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../hooks';
import { ACCESS_TOKEN } from '../utils/constants';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
import ThemeToggle from './ThemeToggle';

const ProfileModal = ({ visible, hideModal, children, posterInfo }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { isThemeDark } = useContext(PreferencesContext);
  const { user, setSignedIn } = useContext(MainContext);
  const { deleteUser } = useUser();

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const nav = useNavigation();

  const backGroundStyle = {
    backgroundColor: theme.colors.background,
  };
  const boxBackGroundStyle = {
    backgroundColor: theme.colors.inversePrimary,
  };

  const isUserProfile = posterInfo.id === user.id;

  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _editProfile = () => {
    _editProfileScreen();
    hideModal();
  };

  const _deleteUser = async () => {
    try {
      await deleteUser(user.id);
      isUserProfile && (await SecureStore.deleteItemAsync(ACCESS_TOKEN));
      setSignedIn(false);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  const _logOut = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    setSignedIn(false);
  };

  const _editProfileScreen = () => nav.navigate('Edit Profile');

  const _openMenu = () => setShowMenu(true);
  const _closeMenu = () => setShowMenu(false);

  const _showDialog = () => {
    _closeMenu();
    setDialog(true);
  };
  const _hideDialog = () => setDialog(false);

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  const _dialog = () => (
    <>
      {_snackbar()}
      <Dialog visible={showDialog} onDismiss={_hideDialog}>
        <Dialog.Title>Delete Account?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Are you sure you want to permanently delete your account? This
            action is irreversible.
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={_deleteUser}>Delete</Button>
          <Button onPress={_hideDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );

  const _menu = () => (
    <Menu
      visible={showMenu}
      onDismiss={_closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={_openMenu} />}
    >
      <Menu.Item
        onPress={_editProfile}
        title="Edit"
        leadingIcon="square-edit-outline"
      />
      <Menu.Item
        onPress={_logOut}
        title="Log out"
        leadingIcon="logout-variant"
      />
      <Menu.Item
        onPress={_showDialog}
        title="Remove"
        leadingIcon="close-circle"
      />
    </Menu>
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[styles.containerStyle, backGroundStyle]}
      >
        <View style={styles.profileFunctions}>
          {isUserProfile && <ThemeToggle />}
          {isUserProfile && _menu()}
        </View>
        <View style={styles.contentContainerStyleColumn}>
          {children}
          <Text style={styles.nameText}>{posterInfo?.name}</Text>
          <Text style={styles.roleText}>{posterInfo?.role?.name}</Text>
          <View style={[styles.boxStyle, boxBackGroundStyle]}>
            <Text style={styles.titleText}>Profile tags</Text>
            <View style={styles.tagContainerStyle}>
              <View style={styles.tagsStyle}>
                <Text style={styles.tagsText}>tags</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {_dialog()}
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyleColumn: {
    flexGrow: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  editBtn: { borderRadius: 100 },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  tagsText: { fontSize: 15 },
  roleText: { fontSize: 15, marginBottom: 10 },
  tagsStyle: {
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 4,
    marginRight: 10,
    marginTop: 10,
  },
  tagContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  boxStyle: {
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  profileFunctions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

ProfileModal.propTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
  name: PropTypes.string,
  role: PropTypes.string,
  groups: PropTypes.string,
  children: PropTypes.node,
  posterInfo: PropTypes.object,
};
export default ProfileModal;
