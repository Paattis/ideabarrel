import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Comment, IdeaCard } from '../components';
import { useIdea } from '../hooks';
import { PropTypes } from 'prop-types';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { MainContext } from '../contexts/MainContext';

const IdeaScreen = ({ route: { params }, navigation }) => {
  const [idea, setIdea] = useState({});
  const [commentsArray, setCommentsArray] = useState([]);

  const { updateIdeas } = useContext(MainContext);
  const { getIdeaById, loading } = useIdea();
  const { ideaId } = params;
  const addCommentParams = { ideaId: idea.id };

  const ref = useRef(null);

  const _onScrollUp = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const _addCommentScreen = () => {
    navigation.navigate('Add Comment', addCommentParams);
  };

  const _getIdea = async () => {
    try {
      const idea = await getIdeaById(ideaId);
      setCommentsArray(idea.comments.reverse());
      setIdea(idea);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _getIdea();
  }, [updateIdeas]);

  if (!loading)
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} ref={ref}>
          <IdeaCard idea={idea} ideaScreen />
          <Text style={styles.commentsHeader}>Comments:</Text>
          {commentsArray.length ? (
            commentsArray.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <View style={styles.commentsContainer}>
              <Text>no comments</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <TouchableOpacity
            onPress={_addCommentScreen}
            style={styles.commentInput}
          >
            <Text style={styles.commentInputText}>Add a comment</Text>
          </TouchableOpacity>
          <IconButton
            size={40}
            icon="chevron-double-up"
            onPress={_onScrollUp}
          />
        </View>
      </>
    );
  else return <ActivityIndicator style={styles.activityIndicator} />;
};

const styles = StyleSheet.create({
  commentsHeader: { margin: 20 },
  commentsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  commentInputContainer: {
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
