import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, IconButton, Snackbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useTag } from '../hooks/useTag';
import { MainContext } from '../contexts/MainContext';

const SubscribeTagScreen = ({ route, navigation }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [addedTags, setAddedTags] = useState([]);
  const { posterInfoId } = route.params;

  const { setSubscribed, subscribed } = useContext(MainContext);
  const { postUserTag, deleteUserTag, tags } = useTag();
  const _goBack = () => navigation.pop();

  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _subscribe = async (userId, tagId) => {
    try {
      await postUserTag(userId, tagId);
      setAddedTags((addedTags) => [...addedTags, tagId]);
      setSubscribed(subscribed + 1);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };
  const _unsubscribe = async (userId, tagId) => {
    try {
      await deleteUserTag(userId, tagId);
      setAddedTags((tags) => tags.filter((addedTags) => addedTags !== tagId));
      setSubscribed(subscribed + 1);
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };
  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );
  const _getSubscribe = () => {
    tags?.map((tag) => {
      tag.users?.map((users) => {
        if (users.user.id === posterInfoId) {
          setAddedTags((addedTags) => [...addedTags, tag.id]);
        }
      });
    });
  };
  const _tags = () =>
    tags?.map((tag, id) => {
      const isActive = addedTags.includes(tag.id);
      console.log(isActive);
      return (
        <Button
          labelStyle={{ fontSize: 18 }}
          style={{ margin: 10, borderRadius: 100 }}
          mode={isActive ? 'contained' : 'outlined'}
          icon={isActive ? '' : 'plus'}
          key={id}
          onPress={() => {
            isActive
              ? _unsubscribe(posterInfoId, tag.id)
              : _subscribe(posterInfoId, tag.id);
          }}
        >
          {tag.name}
        </Button>
      );
    });

  useEffect(() => {
    _getSubscribe();
  }, [subscribed, posterInfoId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {_snackbar()}
      <View style={styles.header}>
        <IconButton size={32} icon="close" onPress={_goBack} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {_tags()}
      </View>
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
});

SubscribeTagScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default SubscribeTagScreen;
