import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import ProfileModal from './ProfileModal';

const PosterDetails = ({ avatarPosition = 'row', post, navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const direction = avatarPosition === 'right' ? 'row-reverse' : 'row';
  const flexDirection = {
    flexDirection: direction,
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={showModal}>
      <ProfileModal
        visible={visible}
        hideModal={hideModal}
        navigation={navigation}
        name={post.name}
        role={post.role}
      >
        <Avatar.Image size={80} />
      </ProfileModal>
      <View style={[styles.container, flexDirection]}>
        <Avatar.Image size={30} style={styles.avatar} />
        <View>
          <Text style={styles.posterName}>Pekka Pekkarinen</Text>
          <Text style={styles.posterRole}>Junior Test Engineer</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  avatar: { marginHorizontal: 8 },
  posterName: { fontSize: 12 },
  posterRole: { fontSize: 9 },
});

PosterDetails.propTypes = {
  avatarPosition: PropTypes.string,
  post: PropTypes.object,
  navigation: PropTypes.object,
};

export default PosterDetails;
