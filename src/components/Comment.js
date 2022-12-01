import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import PosterDetails from './PosterDetails';
import { PropTypes } from 'prop-types';

const Comment = ({ comment }) => {
  return (
    <View style={style.container}>
      <PosterDetails posterId={comment.user.id} />
      <Text style={style.comment}>{comment.content}</Text>
      <Divider bold style={style.divider} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  comment: {
    marginHorizontal: 8,
    marginBottom: 10,
  },
  divider: {
    marginHorizontal: 8,
  },
});

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
