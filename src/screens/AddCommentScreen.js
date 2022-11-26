import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationHeader, FormInput } from '../components';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';

const AddCommentScreen = ({ navigation, postId }) => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postComment } = useComment();

  const comment = watch('comment');

  const _goBack = () => navigation.pop();

  const _addComment = async (data) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await postComment(data, postId);
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
        onPressPost={handleSubmit(_addComment)}
        disableButton={!comment}
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
        rules={{
          maxLength: {
            value: 1000,
            message: 'Comment maximum length is 1000 characters',
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
  navigation: PropTypes.object,
  postId: PropTypes.number,
};

export default AddCommentScreen;
