import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Menu,
  Paragraph,
  Portal,
  Text,
} from 'react-native-paper';
import { useComment } from '../hooks';
import { useNavigation } from '@react-navigation/native';
import { MainContext } from '../contexts/MainContext';
import { PropTypes } from 'prop-types';
import UserDetails from './UserDetails';

const Comment = ({ comment }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setDialog] = useState(false);

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

  const _editComment = () => {
    _closeMenu();
    nav.navigate('Edit Comment', params);
  };

  const _openMenu = () => setShowMenu(true);
  const _closeMenu = () => setShowMenu(false);

  const _showDialog = () => {
    _closeMenu();
    setDialog(true);
  };
  const _hideDialog = () => setDialog(false);

  const _dialog = () => (
    <Portal>
      <Dialog visible={showDialog} onDismiss={_hideDialog}>
        <Dialog.Title>Remove Comment?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to remove your comment?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={_removeComment}>Remove</Button>
          <Button onPress={_hideDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  const _menu = () => (
    <Menu
      visible={showMenu}
      onDismiss={_closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={_openMenu} />}
    >
      <Menu.Item
        onPress={_editComment}
        title="Edit"
        leadingIcon="square-edit-outline"
      />
      <Divider />
      <Menu.Item
        onPress={_showDialog}
        title="Remove"
        leadingIcon="close-circle"
      />
    </Menu>
  );

  const params = {
    commentId: comment.id,
    content: comment.content,
  };

  return (
    <>
      {_dialog()}
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <UserDetails posterId={comment.user.id} />
          {isUserComment && _menu()}
        </View>
        <Text style={styles.comment}>{comment.content}</Text>
        <Divider bold style={styles.divider} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  userContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
