import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationHeader, FormInput } from '../components';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';
import { MainContext } from '../contexts/MainContext';

const EditCommentScreen = ({ route: { params }, navigation }) => {
  const [loading, setLoading] = useState(false);

  const { commentId, content } = params;
  const { putComment } = useComment();
  const { setUpdateIdeas, updateIdeas } = useContext(MainContext);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { comment: content },
    mode: 'onBlur',
  });

  const comment = watch('comment');

  const _goBack = () => navigation.pop();

  const _editComment = async (data) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await putComment(data, commentId);
      setUpdateIdeas(updateIdeas + 1);
      _goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
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
