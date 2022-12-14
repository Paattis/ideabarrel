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
  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { deleteComment } = useComment();
  const { user, setUpdateIdeas, updateIdeas } = useContext(MainContext);

  const nav = useNavigation();

  const isUserComment = user.id === comment.user.id;
  const isAdmin = user?.role?.id === 1;

  // Format comment date
  const ideaDate = comment.created_at
    ? formatDistanceToNow(new Date(comment.created_at), {
        addSuffix: true,
      })
    : 'date unavailable';

  const params = {
    commentId: comment.id,
    content: comment.content,
  };

  // Toggle snack bar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Remove comment
  const _removeComment = async () => {
    try {
      setLoading(true);
      await deleteComment(comment.id);
      setUpdateIdeas(updateIdeas + 1);
    } catch (error) {
      _hideDialog();
      setErrorMsg(error.message);
      _onToggleSnackBar();
    } finally {
      setLoading(false);
    }
  };

  // Edit comment
  const _editComment = () => {
    _closeMenu();
    nav.navigate('Edit Comment', params);
  };

  // Toggle menu visibility
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
          <Button
            loading={loading}
            textColor="#ff0000"
            onPress={_removeComment}
          >
            {!loading && 'Remove'}
          </Button>
          <Button onPress={_hideDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  const _menu = () => (
    <Menu
      visible={showMenu}
      onDismiss={_closeMenu}
      anchor={<IconButton size={18} icon="dots-vertical" onPress={_openMenu} />}
    >
      {isUserComment && (
        <Menu.Item
          onPress={_editComment}
          title="Edit"
          leadingIcon="square-edit-outline"
        />
      )}
      {(isUserComment || isAdmin) && (
        <Menu.Item
          onPress={_showDialog}
          title="Remove"
          leadingIcon="close-circle"
        />
      )}
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
          {(isUserComment || isAdmin) && _menu()}
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
    fontSize: 12,
    alignItems: 'flex-start',
    marginHorizontal: 8,
    marginBottom: 10,
  },
});

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
