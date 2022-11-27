import React, { useState } from 'react';
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
import { useMedia } from '../hooks';
import BgSVG from '../../assets/svg/top-right-bg.svg';

const UploadScreen = ({ navigation }) => {
  const [showDialog, setDialog] = useState(false);

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postMedia, loading } = useMedia();

  const title = watch('idea_title');
  const desc = watch('idea_description');

  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);

  const _goBack = () => navigation.pop();

  const _post = async (data) => {
    Keyboard.dismiss();
    try {
      await postMedia(data);
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
        onPressCancel={title || desc ? _showDialog : _goBack}
        onPressPost={handleSubmit(_post)}
        disableButton={!title}
        loading={loading}
        buttonText="Post"
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
