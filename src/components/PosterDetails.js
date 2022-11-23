import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import ProfileModal from './ProfileModal';

const PosterDetails = ({ avatarPosition = 'row', post }) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const direction = avatarPosition === 'right' ? 'row-reverse' : 'row';
  const container = {
    flexDirection: direction,
    alignItems: 'center',
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={showModal}>
      <ProfileModal
        visible={visible}
        hideModal={hideModal}
        name={post.name}
        role={post.role}
      >
        <Avatar.Image size={80} />
      </ProfileModal>
      <View style={container}>
        <Avatar.Image size={30} />
        <View style={styles.textContainer}>
          <Text style={styles.posterName}>{post.name}</Text>
          <Text style={styles.posterRole}>{post.role}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: { marginHorizontal: 8 },
  posterName: { fontSize: 12 },
  posterRole: { fontSize: 9 },
});

PosterDetails.propTypes = {
  avatarPosition: PropTypes.string,
  post: PropTypes.object,
};

export default PosterDetails;
