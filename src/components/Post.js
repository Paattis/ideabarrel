import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Like from '../components/Like';
import CommentsCount from '../components/CommentsCount';

const Post = ({ navigation, post }) => {
  // extended post screen will be added later
  const extendedPost = () => navigation.navigate('New Post');

  const rightButtons = () => (
    <View style={{ flexDirection: 'row' }}>
      <Like />
      <CommentsCount onPress={extendedPost} />
    </View>
  );

  return (
    <Card mode="elevated" style={styles.card}>
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
        <Text style={styles.profile}>*profile*</Text>
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
    textAlign: 'right',
  },
});

Post.propTypes = {
  navigation: PropTypes.object,
  post: PropTypes.object,
};

export default Post;
