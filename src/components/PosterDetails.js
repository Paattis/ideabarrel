import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import ProfileModal from './ProfileModal';
import { useUser } from '../hooks';

const PosterDetails = ({ avatarPosition = 'row', navigation, posterId }) => {
  const [showModal, setShowModal] = useState(false);
  const [postOwner, setPostOwner] = useState({});

  const { getUserById } = useUser();

  const _showModal = () => setShowModal(true);
  const _hideModal = () => setShowModal(false);

  const direction = avatarPosition === 'right' ? 'row-reverse' : 'row';
  const flexDirection = {
    flexDirection: direction,
  };

  const _getPostOwner = async () => {
    try {
      const user = await getUserById(posterId);
      setPostOwner(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _getPostOwner();
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={_showModal}>
      <ProfileModal
        visible={showModal}
        hideModal={_hideModal}
        navigation={navigation}
        posterInfo={postOwner}
      >
        <Avatar.Image size={80} />
      </ProfileModal>
      <View style={[styles.container, flexDirection]}>
        <Avatar.Image size={30} style={styles.avatar} />
        <View>
          <Text style={styles.posterName}>{postOwner?.name}</Text>
          <Text style={styles.posterRole}>{postOwner?.role?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', margin: 10 },
  avatar: { marginHorizontal: 8 },
  posterName: { fontSize: 12 },
  posterRole: { fontSize: 9 },
});

PosterDetails.propTypes = {
  avatarPosition: PropTypes.string,
  post: PropTypes.object,
  navigation: PropTypes.object,
  posterId: PropTypes.number,
};

export default PosterDetails;
