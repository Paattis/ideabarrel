import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Comment, IdeaCard } from '../components';
import { useIdea } from '../hooks';
import { PropTypes } from 'prop-types';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';

const IdeaScreen = ({ route: { params }, navigation }) => {
  const [idea, setIdea] = useState({});
  const [comments, setComments] = useState([]);

  const { getIdeaById, loading } = useIdea();
  const { ideaId } = params;

  const ref = useRef(null);

  const _onScrollUp = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const _addCommentScreen = () => navigation.push('Add Comment', { ideaId });

  const _getIdea = async () => {
    const idea = await getIdeaById(ideaId);
    setComments(idea.comments);
    setIdea(idea);
  };

  useEffect(() => {
    _getIdea();
  }, []);

  if (!loading)
    return (
      <>
        <ScrollView ref={ref}>
          <IdeaCard idea={idea} ideaScreen />
          <Text style={styles.commentsHeader}>Comments:</Text>
          {comments.length ? (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment.content} />
            ))
          ) : (
            <Text>no comments</Text>
          )}
        </ScrollView>

        <View style={styles.commentContainer}>
          <TouchableOpacity
            onPress={_addCommentScreen}
            style={styles.commentInput}
          >
            <Text style={styles.commentInputText}>Add a comment</Text>
          </TouchableOpacity>
          <IconButton
            size={40}
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
    padding: 9,
    borderColor: '#B4B4B4',
    borderWidth: 0.7,
    borderRadius: 5,
  },
  commentInputText: {
    borderRadius: 1,
    marginHorizontal: 10,
  },
  activityIndicator: { marginTop: 10 },
});

IdeaScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default IdeaScreen;
