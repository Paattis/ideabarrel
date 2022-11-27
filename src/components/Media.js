import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Dialog,
  Divider,
  IconButton,
  Menu,
  Paragraph,
  Portal,
  Text,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Like from '../components/Like';
import CommentCount from '../components/CommentCount';
import PosterDetails from './PosterDetails';
import { useMedia } from '../hooks';
import { MainContext } from '../contexts/MainContext';

const Media = ({ navigation, post, expanded }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setDialog] = useState(false);

  const { user } = useContext(MainContext);
  const { deleteMedia } = useMedia();

  const postIdParam = { postId: post.postId };
  const postContentParams = {
    postTitle: post.title,
    postDescription: post.description,
  };

  const isUserIdea = post.userId === user.result.id;

  const _showDialog = () => {
    _closeMenu();
    setDialog(true);
  };
  const _hideDialog = () => setDialog(false);

  const _ideaScreen = () => navigation.navigate('Idea', postIdParam);

  const _editIdea = () => {
    _closeMenu();
    navigation.navigate('Edit', postContentParams);
  };

  const _removeIdea = async () => {
    try {
      await deleteMedia(post.postId);
      _hideDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const rightButtons = () => (
    <View style={{ flexDirection: 'row' }}>
      <Like />
      <CommentCount />
    </View>
  );

  const _openMenu = () => setShowMenu(true);
  const _closeMenu = () => setShowMenu(false);

  const _dialog = () => (
    <Portal>
      <Dialog visible={showDialog} onDismiss={_hideDialog}>
        <Dialog.Title>Remove Idea?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to remove it?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={_removeIdea}>Remove</Button>
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
        onPress={_editIdea}
        title="Edit"
        leadingIcon="square-edit-outline"
      />
      <Divider />
      <Menu.Item
        onPress={_showDialog}
        title="Remove"
        leadingIcon="selection-remove"
      />
    </Menu>
  );

  return !expanded ? (
    <>
      {_dialog()}
      <Card mode="elevated" style={styles.card} onPress={_ideaScreen}>
        <Card.Title
          titleStyle={styles.title}
          title={post.title}
          style={styles.header}
          right={rightButtons}
        />
        <Card.Content style={styles.content}>
          <Text>*tags*</Text>
          <Divider bold style={styles.divider} />
          <Text numberOfLines={5} style={styles.description}>
            {post.description}
          </Text>
          <View>
            <View style={styles.bottomContainer}>
              <PosterDetails
                avatarPosition="left"
                post={post}
                navigation={navigation}
              />
              {isUserIdea && _menu()}
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  ) : (
    <Card style={expandedStyle.card}>
      <Card.Title
        titleNumberOfLines={2}
        titleStyle={styles.title}
        title={post.title}
        style={expandedStyle.header}
        right={rightButtons}
      />
      <Card.Content style={expandedStyle.content}>
        <Text>*tags*</Text>
        <Divider bold style={styles.divider} />
        <View style={expandedStyle.bottomContainer}>
          <PosterDetails avatarPosition="left" />
        </View>
        <Text>{post.description}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  header: {
    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
    backgroundColor: '#152F65',
  },
  title: {
    paddingTop: 4,
    color: '#fff',
  },
  content: {
    height: 180,
  },
  divider: {
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    height: 90,
  },
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
});

const expandedStyle = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
  header: {
    backgroundColor: '#152F65',
  },
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

Media.propTypes = {
  navigation: PropTypes.object,
  post: PropTypes.object,
  expanded: PropTypes.bool,
};

export default Media;
