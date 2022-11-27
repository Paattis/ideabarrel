import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { NavigationHeader, FormInput } from '../components';
import { useForm } from 'react-hook-form';
import { useMedia } from '../hooks';

const EditIdeaScreen = ({ route: { params }, navigation }) => {
  const { putMedia, loading } = useMedia();
  const { postTitle, postDescription } = params;

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      idea_title: postTitle,
      idea_description: postDescription,
    },
  });

  const title = watch('idea_title');

  const _goBack = () => navigation.pop();

  const _edit = async (data) => {
    Keyboard.dismiss();
    try {
      await putMedia(data);
      _goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader
        onPressCancel={_goBack}
        onPressPost={handleSubmit(_edit)}
        disableButton={!title}
        loading={loading}
        buttonText="Edit"
      />
      <View style={styles.inputContainer}>
        <FormInput
          placeholderTextColor="#ababab"
          placeholder="Write your idea title"
          control={control}
          fieldName="idea_title"
          style={styles.title}
          outlineStyle={styles.titleOutLine}
          rules={{
            required: 'idea title is mandatory',
            maxLength: {
              value: 40,
              message: 'exceeding character limit (40)',
            },
          }}
        />
        <Divider style={{ marginHorizontal: 15 }} />
        <ScrollView>
          <FormInput
            multiline
            style={styles.description}
            placeholderTextColor="#ababab"
            placeholder="Write a description (optional)"
            control={control}
            fieldName="idea_description"
            outlineStyle={styles.descriptionOutline}
            rules={{
              maxLength: {
                value: 1000,
                message: 'Description maximum length is 1000 characters',
              },
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  postButton: {
    borderRadius: 100,
    marginRight: 14,
  },
  inputContainer: {
    margin: 12,
  },
  title: {
    fontSize: 20,
  },
  titleOutLine: {
    borderColor: 'transparent',
  },
  description: {
    maxHeight: '60%',
  },
  descriptionOutline: {
    borderColor: 'transparent',
  },
});

EditIdeaScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default EditIdeaScreen;
