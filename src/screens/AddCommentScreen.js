import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationHeader, FormInput } from '../components';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';
import { MainContext } from '../contexts/MainContext';

const AddCommentScreen = ({ route: { params }, navigation }) => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postComment } = useComment();
  const { ideaId } = params;
  const { setUpdateIdeas, updateIdeas } = useContext(MainContext);

  const comment = watch('comment');

  const _goBack = () => navigation.pop();

  const _addComment = async (data) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await postComment(data, ideaId);
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
        onPressPost={handleSubmit(_addComment)}
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
