import React, { useContext, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Divider, Snackbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { NavigationHeader, FormInput } from '../components';
import { useForm } from 'react-hook-form';
import { useIdea } from '../hooks';
import { MainContext } from '../contexts/MainContext';

const EditIdeaScreen = ({ route: { params }, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { updateIdeas, setUpdateIdeas } = useContext(MainContext);
  const { putIdea } = useIdea();
  const { title, content, ideaId } = params;

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      title: title,
      content: content,
    },
  });

  const titleInput = watch('title');

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  const _goBack = () => navigation.pop();

  // Edit existing idea
  const _edit = async (data) => {
    Keyboard.dismiss();

    // placeholder
    const tags = [1];
    data.tags = tags;

    try {
      setLoading(true);
      await putIdea(data, ideaId);
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
    <SafeAreaView style={styles.container}>
      {_snackbar()}
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
