import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

const Post = () => {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Title
        titleStyle={styles.title}
        title="idea title"
        style={styles.header}
      />
      <Card.Content style={styles.content}>
        <Text>*tags*</Text>
        <Divider bold style={{ marginTop: 15 }} />
        <Text numberOfLines={5} style={styles.description}>
          post description
        </Text>
        <Text style={styles.profile}>*profile*</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '85%',
    marginTop: 17,
    borderRadius: 4,
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
  description: {
    height: 90,
  },
  profile: {
    textAlign: 'right',
  },
});

export default Post;
