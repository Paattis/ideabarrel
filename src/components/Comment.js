import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';
import PosterDetails from './PosterDetails';

const Comment = ({ comment }) => {
  const { deleteComment } = useComment();

  const _removeComment = async () => {
    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={style.container}>
      <PosterDetails posterId={comment.user.id} />
      <Text style={style.comment}>{comment.content}</Text>
      <Divider bold style={style.divider} />
      <Button onPress={_removeComment}>remove</Button>
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
