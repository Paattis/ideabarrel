import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Like from '../components/Like';
import CommentCount from '../components/CommentCount';
import PosterDetails from './PosterDetails';

const Media = ({ navigation, post, expanded }) => {
  const params = { postId: post.postId };
  const _ideaScreen = () => navigation.navigate('Idea', params);

  const rightButtons = () => (
    <View style={{ flexDirection: 'row' }}>
      <Like />
      <CommentCount />
    </View>
  );

  return !expanded ? (
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
        <View style={styles.profile}>
          <PosterDetails
            avatarPosition="left"
            post={post}
            navigation={navigation}
          />
        </View>
      </Card.Content>
    </Card>
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
        <View style={expandedStyle.profile}>
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
  profile: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
});

const expandedStyle = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
  header: {
    backgroundColor: '#152F65',
  },
  profile: {
    marginVertical: 8,
  },
});

Media.propTypes = {
  navigation: PropTypes.object,
  post: PropTypes.object,
  expanded: PropTypes.bool,
};

export default Media;
