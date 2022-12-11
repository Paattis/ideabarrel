import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Snackbar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useUser } from '../hooks';
import ProfileModal from './ProfileModal';
import { PROFILE_IMG_URL } from '../utils/constants';
import { MainContext } from '../contexts/MainContext';

const UserDetails = ({ avatarPosition = 'row', posterId }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [avatar, setAvatar] = useState();
  const [showModal, setShowModal] = useState(false);
  const [ideaOwner, setIdeaOwner] = useState({
    name: 'loading',
    role: { name: 'loading' },
  });

  const { updateProfile } = useContext(MainContext);
  const { getUserById } = useUser();

  const direction = avatarPosition === 'right' ? 'row-reverse' : 'row';
  const flexDirection = {
    flexDirection: direction,
  };

  const userAvatarText = ideaOwner?.name[0].toUpperCase();

  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _showModal = () => setShowModal(true);
  const _hideModal = () => setShowModal(false);

  const _getIdeaOwner = async () => {
    try {
      if (posterId) {
        const user = await getUserById(posterId);
        setIdeaOwner(user);
        user.profile_img && setAvatar(PROFILE_IMG_URL + user.profile_img);
      }
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  useEffect(() => {
    _getIdeaOwner();
  }, [posterId, updateProfile]);

  const userAvatar = (size) =>
    avatar ? (
      <Avatar.Image
        source={{ uri: avatar }}
        size={size}
        style={styles.avatar}
      />
    ) : (
      <Avatar.Text size={size} label={userAvatarText} style={styles.avatar} />
    );

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  return (
    <>
      {_snackbar()}
      <TouchableOpacity activeOpacity={0.5} onPress={_showModal}>
        <ProfileModal
          visible={showModal}
          hideModal={_hideModal}
          posterInfo={ideaOwner}
        >
          {userAvatar(80)}
        </ProfileModal>
        <View style={[styles.container, flexDirection]}>
          {userAvatar(30)}
          <View>
            <Text style={styles.posterName}>{ideaOwner?.name}</Text>
            <Text style={styles.posterRole}>{ideaOwner?.role?.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', margin: 10 },
  avatar: { marginHorizontal: 8 },
  posterName: { fontSize: 12 },
  posterRole: { fontSize: 9 },
});

UserDetails.propTypes = {
  avatarPosition: PropTypes.string,
  post: PropTypes.object,
  posterId: PropTypes.number,
};

export default UserDetails;
