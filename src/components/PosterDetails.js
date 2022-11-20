import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';

const PosterDetails = ({ avatarPosition = 'row' }) => {
  const posterDetails = () => console.log('deets');

  const direction = avatarPosition === 'right' ? 'row-reverse' : 'row';
  const flexDirection = {
    flexDirection: direction,
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={posterDetails}>
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
};

export default PosterDetails;
