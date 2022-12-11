import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationHeader, FormInput } from '../components';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';
import { MainContext } from '../contexts/MainContext';
import { Snackbar } from 'react-native-paper';

const EditCommentScreen = ({ route: { params }, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { commentId, content } = params;
  const { putComment } = useComment();
  const { setUpdateIdeas, updateIdeas } = useContext(MainContext);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { comment: content },
    mode: 'onBlur',
  });

  const comment = watch('comment');

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _goBack = () => navigation.pop();

  // Edit existing comment
  const _editComment = async (data) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await putComment(data, commentId);
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
        onSubmit={handleSubmit(_editComment)}
        disableButton={!comment || loading}
        loading={loading}
        buttonText="Edit"
      />
      <FormInput
        multiline
        autoFocus
        style={styles.description}
        placeholderTextColor="#ababab"
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

EditCommentScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  ideaId: PropTypes.number,
};

export default EditCommentScreen;
