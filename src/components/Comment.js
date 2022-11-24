import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import PosterDetails from './PosterDetails';
import { PropTypes } from 'prop-types';

const Comment = ({ comment }) => {
  return (
    <View style={style.container}>
      <PosterDetails />
      <Text style={style.comment}>{comment}</Text>
      <Divider bold style={style.divider} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 10,
  },
  comment: {
    marginHorizontal: 8,
    marginVertical: 10,
  },
  divider: {
    marginHorizontal: 8,
  },
});

Comment.propTypes = {
  comment: PropTypes.string,
};

export default Comment;
