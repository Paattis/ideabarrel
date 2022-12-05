import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';
import UserDetails from './UserDetails';
import { useNavigation } from '@react-navigation/native';
import { MainContext } from '../contexts/MainContext';

const Comment = ({ comment }) => {
  const { deleteComment } = useComment();
  const { user, setUpdateIdeas, updateIdeas } = useContext(MainContext);

  const nav = useNavigation();

  const isUserComment = user.id === comment.user.id;

  const _removeComment = async () => {
    try {
      await deleteComment(comment.id);
      setUpdateIdeas(updateIdeas + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const params = {
    commentId: comment.id,
    content: comment.content,
  };

  const _editCommentScreen = () => nav.navigate('Edit Comment', params);

  return (
    <View style={style.container}>
      <UserDetails posterId={comment.user.id} />
      <Text style={style.comment}>{comment.content}</Text>
      <Divider bold style={style.divider} />
      {isUserComment && (
        <>
          <Button onPress={_removeComment}>remove</Button>
          <Button onPress={_editCommentScreen}>edit</Button>
        </>
      )}
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
