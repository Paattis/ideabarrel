import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationHeader, FormInput } from '../components';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';
import { MainContext } from '../contexts/MainContext';
import { Snackbar } from 'react-native-paper';

const AddCommentScreen = ({ route: { params }, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postComment } = useComment();
  const { ideaId } = params;
  const { setUpdateIdeas, updateIdeas } = useContext(MainContext);

  const comment = watch('comment');

  const _goBack = () => navigation.pop();

  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _addComment = async (data) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await postComment(data, ideaId);
      setUpdateIdeas(updateIdeas + 1);
      _goBack();
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    } finally {
      setLoading(false);
    }
  };

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  return (
    <SafeAreaView>
      {_snackbar()}
      <NavigationHeader
        onPressCancel={_goBack}
        onSubmit={handleSubmit(_addComment)}
        disableButton={!comment || loading}
        loading={loading}
        buttonText="Post"
      />
      <FormInput
        multiline
        autoFocus
        style={styles.description}
        placeholderTextColor="#ababab"
        placeholder="Write a comment"
        control={control}
        fieldName="comment"
        outlineStyle={styles.descriptionOutline}
        disabled={loading}
        rules={{
          maxLength: {
            value: 500,
            message: 'Comment maximum length is 500 characters',
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  description: {
    maxHeight: '80%',
  },
  descriptionOutline: {
    borderColor: 'transparent',
  },
});

AddCommentScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  ideaId: PropTypes.number,
};

export default AddCommentScreen;
