import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Paragraph, Snackbar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useTag } from '../hooks/useTag';
import { MainContext } from '../contexts/MainContext';
import { NavigationHeader } from '../components';

const SubscribeTagScreen = ({ route, navigation }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [addedTags, setAddedTags] = useState([]);
  const [chosenTag, setChosenTag] = useState([]);

  const { setUpdateTags, updateTags, user } = useContext(MainContext);
  const { postUserTag, deleteUserTag, deleteTag, tags } = useTag();

  const { userId } = route.params;

  const isAdmin = user?.role?.id === 1;

  // Go back and update
  const _goBack = () => {
    setUpdateTags(updateTags + 1);
    navigation.pop();
  };

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _showDialog = () => {
    setDialog(true);
  };
  const _hideDialog = () => setDialog(false);

  // Subscribe to a tag
  const _subscribe = async (userId, tagId) => {
    try {
      await postUserTag(userId, tagId);
      setAddedTags((addedTags) => [...addedTags, tagId]);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  // Unsubscribe from a tag
  const _unsubscribe = async (userId, tagId) => {
    try {
      await deleteUserTag(userId, tagId);
      setAddedTags((tags) => tags.filter((addedTags) => addedTags !== tagId));
      _tags();
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  // Delete specific tag
  const _deleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      setErrorMsg('Tag deleted');
      _hideDialog();
      _onToggleSnackBar();
      setUpdateTags(updateTags + 1);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  // Filter subscribed tags
  const _getSubscribe = () => {
    tags?.map((tag) => {
      tag.users?.map((users) => {
        if (users.user.id === userId) {
          setAddedTags((addedTags) => [...addedTags, tag.id]);
        }
      });
    });
  };

  // Get all tags and highlight subscribed ones
  const _tags = () =>
    tags?.map((tag, id) => {
      const isActive = addedTags.includes(tag.id);
      return (
        <Button
          labelStyle={{ fontSize: 14 }}
          style={{ margin: 8, borderRadius: 100 }}
          mode={isActive ? 'contained' : 'outlined'}
          key={id}
          onLongPress={() => {
            if (isAdmin) {
              _showDialog();
              setChosenTag(tag.id);
            }
          }}
          onPress={() => {
            isActive
              ? _unsubscribe(userId, tag.id)
              : _subscribe(userId, tag.id);
          }}
        >
          {tag.name}
        </Button>
      );
    });

  useEffect(() => {
    _getSubscribe();
  }, [userId, tags]);

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  const _dialog = () => (
    <>
      <Dialog visible={showDialog} onDismiss={_hideDialog}>
        <Dialog.Title>Delete tag?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to delete this tag?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              _deleteTag(chosenTag);
            }}
          >
            Delete
          </Button>
          <Button onPress={_hideDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {_snackbar()}
      {_dialog()}
      <NavigationHeader onPressCancel={_goBack} />
      <View style={{ margin: 10 }}>
        <Text>Subscribe or unsubscribe from a tag by clicking on it.</Text>
        {isAdmin && <Text>Delete a tag by long pressing on it.</Text>}
      </View>
      <View style={styles.tags}>{_tags()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

SubscribeTagScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default SubscribeTagScreen;
