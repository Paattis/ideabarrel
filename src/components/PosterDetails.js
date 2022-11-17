import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';

const PosterDetails = ({ avatarPosition = 'row' }) => {
  const posterDetails = () => console.log('deets');

  const direction = avatarPosition === 'right' ? 'row-reverse' : 'row';
  const container = {
    flexDirection: direction,
    alignItems: 'center',
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={posterDetails}>
      <View style={container}>
        <Avatar.Image size={30} />
        <View style={styles.textContainer}>
          <Text style={styles.posterName}>Pekka Pekkarinen</Text>
          <Text style={styles.posterRole}>Junior Test Engineer</Text>
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
};

export default PosterDetails;
