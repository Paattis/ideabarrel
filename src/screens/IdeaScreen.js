import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Comment, IdeaCard } from '../components';
import { useIdea } from '../hooks';
import { PropTypes } from 'prop-types';
import {
  ActivityIndicator,
  IconButton,
  Snackbar,
  Text,
} from 'react-native-paper';
import { MainContext } from '../contexts/MainContext';

const IdeaScreen = ({ route: { params }, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [idea, setIdea] = useState({});
  const [commentsArray, setCommentsArray] = useState([]);

  const { updateIdeas } = useContext(MainContext);
  const { getIdeaById } = useIdea();
  const { ideaId } = params;

  const addCommentParams = { ideaId: idea.id };

  const ref = useRef(null);

  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

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
      setLoading(true);
      const idea = await getIdeaById(ideaId);
      setIdea(idea);
      setCommentsArray(idea.comments.reverse());
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _getIdea();
  }, [updateIdeas]);

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  if (!loading)
    return (
      <>
        {_snackbar()}
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
