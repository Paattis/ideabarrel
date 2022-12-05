import React, { useContext } from 'react';
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
import { useIdea } from '../hooks';
import { MainContext } from '../contexts/MainContext';

const EditIdeaScreen = ({ route: { params }, navigation }) => {
  const { updateIdeas, setUpdateIdeas } = useContext(MainContext);
  const { putIdea, loading } = useIdea();
  const { title, content, ideaId } = params;

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      title: title,
      content: content,
    },
  });

  const titleInput = watch('title');

  const _goBack = () => navigation.pop();

  const _edit = async (data) => {
    // placeholder
    const tags = [1];
    data.tags = tags;
    Keyboard.dismiss();
    try {
      await putIdea(data, ideaId);
      setUpdateIdeas(updateIdeas + 1);
      _goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader
        onPressCancel={_goBack}
        onSubmit={handleSubmit(_edit)}
        disableButton={!titleInput || loading}
        loading={loading}
        buttonText="Edit"
      />
      <View style={styles.inputContainer}>
        <FormInput
          placeholderTextColor="#ababab"
          control={control}
          fieldName="title"
          style={styles.title}
          outlineStyle={styles.titleOutLine}
          disabled={loading}
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
            fieldName="content"
            outlineStyle={styles.descriptionOutline}
            disabled={loading}
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
