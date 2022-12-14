import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Paragraph,
  Snackbar,
  Text,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useTag } from '../hooks/useTag';
import { MainContext } from '../contexts/MainContext';
import { NavigationHeader } from '../components';

const SubscribeTagScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await deleteTag(tagId);
      setErrorMsg('Tag deleted');
      _hideDialog();
      _onToggleSnackBar();
      setUpdateTags(updateTags + 1);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    } finally {
      setLoading(false);
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

  // Tags view
  const _tags = () =>
    tags?.map((tag, id) => {
      const isActive = addedTags.includes(tag.id);
      return (
        <View key={id}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
            }}
          >
            <Button
              labelStyle={{ fontSize: 14 }}
              style={{ margin: 8, borderRadius: 100 }}
              mode={isActive ? 'contained' : 'outlined'}
              onPress={() => {
                isActive
                  ? _unsubscribe(userId, tag.id)
                  : _subscribe(userId, tag.id);
              }}
            >
              {tag.name}
            </Button>
            {isAdmin && (
              <IconButton
                iconColor="#ff0000"
                icon="delete-outline"
                onPress={() => {
                  _showDialog();
                  setChosenTag(tag.id);
                }}
              />
            )}
          </View>
          <Divider style={{ marginHorizontal: 10 }} />
        </View>
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
            loading={loading}
            textColor="red"
            onPress={() => {
              _deleteTag(chosenTag);
            }}
          >
            {!loading && 'Delete'}
          </Button>
          <Button onPress={_hideDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader onPressCancel={_goBack} />
      <View style={styles.hintTxt}>
        <Text variant="labelLarge">
          Subscribe or unsubscribe from a tag by clicking on it.
        </Text>
      </View>
      <ScrollView>{_tags()}</ScrollView>
      {_dialog()}
      {_snackbar()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  hintTxt: { margin: 10 },
});

SubscribeTagScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default SubscribeTagScreen;
