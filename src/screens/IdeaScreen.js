import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Comment, Media } from '../components';
import { useMedia, useComment } from '../hooks';
import { PropTypes } from 'prop-types';
import {
  ActivityIndicator,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';

const IdeaScreen = ({ route: { params }, navigation }) => {
  const [media, setMedia] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getMediaById } = useMedia();
  const { getCommentByPost } = useComment();
  const { postId } = params;

  const ref = useRef(null);

  const _onScrollUp = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const _addCommentScreen = () =>
    navigation.push('Add Comment', { postId: postId });

  const getMedia = async () => {
    const media = await getMediaById(postId);
    setLoading(false);
    setMedia(media);
  };

  const getComments = async () => {
    const comments = await getCommentByPost(postId);
    setComments(comments);
  };

  useEffect(() => {
    setLoading(true);
    getMedia();
    getComments();
  }, []);

  if (!loading)
    return (
      <>
        <ScrollView ref={ref}>
          <Media post={media} expanded />
          <Text style={styles.commentsHeader}>Comments:</Text>
          {comments.length ? (
            comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment.comment} />
            ))
          ) : (
            <Text>no comments</Text>
          )}
        </ScrollView>
        <Divider />

        <View style={styles.commentContainer}>
          <TouchableOpacity
            onPress={_addCommentScreen}
            style={styles.commentInput}
          >
            <Text style={styles.commentInputText}>Add a comment</Text>
          </TouchableOpacity>
          <IconButton
            size={35}
            icon="chevron-up-circle"
            onPress={_onScrollUp}
          />
        </View>
      </>
    );
  else return <ActivityIndicator style={styles.activityIndicator} />;
};

const styles = StyleSheet.create({
  commentsHeader: { margin: 20 },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInput: {
    width: '75%',
    margin: 10,
    padding: 8,
    borderColor: '#B4B4B4',
    borderWidth: 0.7,
    borderRadius: 10,
  },
  commentInputText: { borderRadius: 1 },
  activityIndicator: { marginTop: 10 },
});

IdeaScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default IdeaScreen;
