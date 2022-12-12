import React, { useEffect, useState } from 'react';
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
import { useTag } from '../hooks/useTag';
import Tags from './Tags';

const ProfileModal = ({ visible, hideModal, children, posterInfo }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { user, setSignedIn, updateProfile, setUpdateProfile, updateTags } =
    useContext(MainContext);
  const { isThemeDark } = useContext(PreferencesContext);
  const { deleteUser, putUser } = useUser();
  const { tags, getAllTags } = useTag();

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const nav = useNavigation();

  const backGroundStyle = {
    backgroundColor: theme.colors.background,
  };
  const boxBackGroundStyle = {
    backgroundColor: theme.colors.primary,
  };

  const isUserProfile = posterInfo.id === user.id;
  const isAdmin = user?.role?.id === 1;

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Toggle menu visibility
  const _openMenu = () => setShowMenu(true);
  const _closeMenu = () => setShowMenu(false);

  // Toggle dialog visibility
  const _showDialog = () => {
    _closeMenu();
    setDialog(true);
  };
  const _hideDialog = () => setDialog(false);

  // Edit user profile
  const _editProfile = () => {
    _editProfileScreen();
    hideModal();
  };

  useEffect(() => {
    getAllTags();
  }, [updateTags]);

  // Filter user's profile and create Tags components
  const _tags = () =>
    tags?.map((tags, id) =>
      tags.users?.map((tag) => {
        if (tag.user.id === posterInfo.id) {
          return (
            <Tags
              key={id}
              idea={tags.name}
              styleText={styles.tagsText}
              tagStyle={styles.tagsStyle}
            />
          );
        }
      })
    );

  // Promote user to administrator if not already
  const _promoteToAdmin = async () => {
    if (posterInfo.role.id === 1) {
      setErrorMsg('User is already an administrator.');
      _onToggleSnackBar();
      _closeMenu();
      return;
    }

    const roleId = { role_id: 1 };
    try {
      await putUser(roleId, posterInfo.id);
      setErrorMsg('User promoted to administrator.');
      _onToggleSnackBar();
      _closeMenu();
      setUpdateProfile(updateProfile + 1);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  // Delete user
  const _deleteUser = async () => {
    try {
      isUserProfile && (await SecureStore.deleteItemAsync(ACCESS_TOKEN));
      await deleteUser(posterInfo.id);
      isUserProfile && setSignedIn(false);
      _closeMenu();
      _hideDialog();
      hideModal();
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  // Logout and remove token from phone's storage
  const _logOut = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    setSignedIn(false);
  };

  // Navigate to edit profile screen
  const _editProfileScreen = () => nav.navigate('Edit Profile');

  // Navigate to add new role screen
  const _addRole = () => {
    hideModal();
    _closeMenu();
    nav.navigate('Add Role');
  };

  // Navigate to add new tag screen
  const _addTag = () => {
    hideModal();
    _closeMenu();
    nav.navigate('Add Tag');
  };

  // Navigate to subscribe tags screen
  const _subscribeTag = () => {
    hideModal();
    _closeMenu();
    nav.navigate('Subscribe Tag', { userId: posterInfo.id });
  };

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
      {isAdmin && isUserProfile && (
        <Menu.Item
          onPress={_addRole}
          title="Add new role"
          leadingIcon="plus-circle-outline"
        />
      )}
      {isAdmin && isUserProfile && (
        <Menu.Item
          onPress={_addTag}
          title="Add new tag"
          leadingIcon="plus-circle-outline"
        />
      )}
      {isUserProfile && (
        <>
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
        </>
      )}
      {isAdmin && !isUserProfile && (
        <Menu.Item
          onPress={_promoteToAdmin}
          title="Promote to admin"
          leadingIcon="shield-account"
        />
      )}
      <Menu.Item
        onPress={_showDialog}
        title="Delete"
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
          {(isUserProfile || isAdmin) && _menu()}
        </View>
        <View style={styles.contentContainerStyleColumn}>
          {children}
          <Text style={styles.nameText}>{posterInfo?.name}</Text>
          <Text style={styles.roleText}>{posterInfo?.role?.name}</Text>
          {isUserProfile && (
            <Button
              style={{ margin: 10 }}
              icon="plus"
              mode="contained"
              onPress={_subscribeTag}
            >
              Subscribe to tags
            </Button>
          )}
          <View style={[styles.boxStyle, boxBackGroundStyle]}>
            <Text style={styles.titleText}>Tags subscribed to:</Text>
            <View style={styles.tagContainerStyle}>{_tags()}</View>
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  roleText: { fontSize: 15, marginBottom: 10 },
  tagsText: { fontSize: 15 },
  tagContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  tagsStyle: {
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 4,
    marginRight: 10,
    marginTop: 10,
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
  userTags: PropTypes.object,
};
export default ProfileModal;
