import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useTag } from '../hooks/useTag';
import { MainContext } from '../contexts/MainContext';
import { NavigationHeader } from '../components';

const SubscribeTagScreen = ({ route, navigation }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [addedTags, setAddedTags] = useState([]);

  const { setUpdateTags, updateTags } = useContext(MainContext);
  const { postUserTag, deleteUserTag, tags } = useTag();

  const { userId } = route.params;

  const _goBack = () => navigation.pop();

  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _subscribe = async (userId, tagId) => {
    try {
      await postUserTag(userId, tagId);
      setAddedTags((addedTags) => [...addedTags, tagId]);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

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

  const _getSubscribe = () => {
    tags?.map((tag) => {
      tag.users?.map((users) => {
        if (users.user.id === userId) {
          setAddedTags((addedTags) => [...addedTags, tag.id]);
        }
      });
    });
  };

  const _tags = () =>
    tags?.map((tag, id) => {
      const isActive = addedTags.includes(tag.id);
      return (
        <Button
          labelStyle={{ fontSize: 14 }}
          style={{ margin: 8, borderRadius: 100 }}
          mode={isActive ? 'contained' : 'outlined'}
          key={id}
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

  const _save = () => {
    setUpdateTags(updateTags + 1);
    _goBack();
  };

  useEffect(() => {
    _getSubscribe();
  }, [userId, tags]);

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {_snackbar()}
      <NavigationHeader
        onPressCancel={_goBack}
        onSubmit={_save}
        buttonText="Save"
      />
      <Text style={{ margin: 10 }}>
        Subscribe or unsubscribe from a tag by clicking on it.
      </Text>
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
