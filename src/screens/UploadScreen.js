import React, { useContext, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Dialog, Divider, Paragraph, Portal } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { NavigationHeader, FormInput } from '../components';
import { useForm } from 'react-hook-form';
import { useIdea } from '../hooks';
import { MainContext } from '../contexts/MainContext';
import BgSVG from '../../assets/svg/top-right-bg.svg';

const UploadScreen = ({ navigation }) => {
  const [showDialog, setDialog] = useState(false);

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postIdea, loading } = useIdea();
  const { updateIdeas, setUpdateIdeas } = useContext(MainContext);

  const title = watch('title');
  const content = watch('content');

  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);

  const _goBack = () => navigation.pop();

  const _post = async (data) => {
    // placeholder
    const tags = [1];
    data.tags = tags;
    Keyboard.dismiss();
    try {
      await postIdea(data);
      setUpdateIdeas(updateIdeas + 1);
      _goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const _dialog = () => (
    <Portal>
      <Dialog visible={showDialog} onDismiss={_hideDialog}>
        <Dialog.Title>Discard changes?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Closing this screen will discard any changes you made.
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={_hideDialog && _goBack}>Discard</Button>
          <Button onPress={_hideDialog}>Stay</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BgSVG style={styles.bgShape} />
      {_dialog()}
      <NavigationHeader
        onPressCancel={title || content ? _showDialog : _goBack}
        onPressPost={handleSubmit(_post)}
        disableButton={!title || loading}
        loading={loading}
        buttonText="Post"
      />
      <View style={styles.inputContainer}>
        <FormInput
          placeholderTextColor="#ababab"
          placeholder="Write your idea title"
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
        <Divider />
        <ScrollView>
          <FormInput
            multiline
            style={styles.description}
            placeholderTextColor="#ababab"
            placeholder="Write a description"
            control={control}
            fieldName="content"
            outlineStyle={styles.descriptionOutline}
            disabled={loading}
            rules={{
              required: 'idea description is mandatory',
              maxLength: {
                value: 500,
                message: 'Description maximum length is 500 characters',
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
    fontSize: 18,
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
  bgShape: {
    position: 'absolute',
    marginTop: 35,
    transform: [{ rotate: '180deg' }],
  },
});

UploadScreen.propTypes = {
  navigation: PropTypes.object,
};

export default UploadScreen;
