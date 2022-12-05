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
import { useIdea } from '../hooks';
import { MainContext } from '../contexts/MainContext';
import Like from '../components/Like';
import CommentCount from '../components/CommentCount';
import UserDetails from './UserDetails';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Media = ({ navigation, idea, ideaScreen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setDialog] = useState(false);

  const { user, setUpdateIdeas, updateIdeas } = useContext(MainContext);
  const { deleteIdea } = useIdea();

  const isUserIdea = idea?.user?.id === user.id;

  const ideaIdParam = { ideaId: idea.id };
  const ideaContentParams = {
    title: idea.title,
    content: idea.content,
    ideaId: idea.id,
  };

  const ideaDate = idea.created_at
    ? formatDistanceToNow(new Date(idea.created_at), {
        addSuffix: true,
      })
    : 'date unavailable';

  const _showDialog = () => {
    _closeMenu();
    setDialog(true);
  };
  const _hideDialog = () => setDialog(false);

  const _ideaScreen = () => navigation.navigate('Idea', ideaIdParam);

  const _editIdea = () => {
    _closeMenu();
    navigation.navigate('Edit', ideaContentParams);
  };

  const _removeIdea = async () => {
    try {
      await deleteIdea(idea.id);
      setUpdateIdeas(updateIdeas + 1);
      _hideDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const rightButtons = () => (
    <View style={{ flexDirection: 'row' }}>
      <Like ideaId={idea.id} />
      <CommentCount comments={idea.comments} />
    </View>
  );

  const _openMenu = () => setShowMenu(true);
  const _closeMenu = () => setShowMenu(false);

  const _dialog = () => (
    <Portal>
      <Dialog visible={showDialog} onDismiss={_hideDialog}>
        <Dialog.Title>Remove Idea?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to remove your idea?</Paragraph>
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
        leadingIcon="close-circle"
      />
    </Menu>
  );

  return !ideaScreen ? (
    <>
      {_dialog()}
      <Card mode="elevated" style={styles.card} onPress={_ideaScreen}>
        <Card.Title
          titleStyle={styles.title}
          title={idea.title}
          style={styles.header}
          right={rightButtons}
        />
        <Card.Content style={styles.content}>
          <View style={styles.topContainer}>
            <Text>*tags*</Text>
            <Text>{ideaDate}</Text>
          </View>
          <Divider bold style={styles.divider} />
          <Text numberOfLines={5} style={styles.description}>
            {idea.content}
          </Text>
          <View>
            <View style={styles.userContainer}>
              <UserDetails posterId={idea.user.id} navigation={navigation} />
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
        title={idea.title}
        style={expandedStyle.header}
        right={rightButtons}
      />
      <Card.Content style={expandedStyle.content}>
        <View style={styles.topContainer}>
          <Text>*tags*</Text>
          <Text>{ideaDate}</Text>
        </View>
        <Divider bold style={styles.divider} />
        <View style={expandedStyle.userContainer}>
          <UserDetails posterId={idea?.user?.id} />
        </View>
        <Text>{idea.content}</Text>
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
  topContainer: {
    marginTop: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    paddingTop: 4,
    color: '#fff',
  },
  content: {
    height: 180,
  },
  divider: {
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    height: 90,
  },
  userContainer: {
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
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

Media.propTypes = {
  navigation: PropTypes.object,
  idea: PropTypes.object,
  ideaScreen: PropTypes.bool,
};

export default Media;
