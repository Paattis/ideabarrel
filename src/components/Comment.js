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
  Snackbar,
  Text,
} from 'react-native-paper';
import { useComment } from '../hooks';
import { useNavigation } from '@react-navigation/native';
import { MainContext } from '../contexts/MainContext';
import { PropTypes } from 'prop-types';
import UserDetails from './UserDetails';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Comment = ({ comment }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { deleteComment } = useComment();
  const { user, setUpdateIdeas, updateIdeas } = useContext(MainContext);

  const nav = useNavigation();

  const isUserComment = user.id === comment.user.id;

  const ideaDate = comment.created_at
    ? formatDistanceToNow(new Date(comment.created_at), {
        addSuffix: true,
      })
    : 'date unavailable';

  const params = {
    commentId: comment.id,
    content: comment.content,
  };

  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _removeComment = async () => {
    try {
      await deleteComment(comment.id);
      setUpdateIdeas(updateIdeas + 1);
    } catch (error) {
      _hideDialog();
      setErrorMsg(error.message);
      _onToggleSnackBar();
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
      {_snackbar()}
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
      <Menu.Item
        onPress={_showDialog}
        title="Remove"
        leadingIcon="close-circle"
      />
    </Menu>
  );

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  return (
    <>
      {_dialog()}
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <UserDetails posterId={comment.user.id} />
          {isUserComment && _menu()}
        </View>
        <Text style={styles.comment}>{comment.content}</Text>
        <Text style={styles.commentDate}>{ideaDate}</Text>
        <Divider bold />
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
  commentDate: {
    alignItems: 'flex-start',
    marginHorizontal: 8,
    marginBottom: 10,
  },
});

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
