import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Paragraph,
  Portal,
} from 'react-native-paper';
import { PropTypes } from 'prop-types';
import BgSVG from '../../assets/svg/top-right-bg.svg';
import { FormInput } from '../components';
import { useForm } from 'react-hook-form';

const UploadScreen = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });

  const title = watch('idea_title');
  const desc = watch('idea_description');

  const [visible, setVisible] = useState(false);
  const _showDialog = () => setVisible(true);
  const _hideDialog = () => setVisible(false);

  const _goBack = () => navigation.pop();
  const _post = () => console.warn('not available yet');

  const _header = () => (
    <View style={styles.header}>
      <IconButton
        size={32}
        icon="close"
        onPress={title || desc ? _showDialog : _goBack}
      />
      <Button
        disabled={!title}
        mode="contained"
        style={styles.postButton}
        onPress={handleSubmit(_post)}
      >
        Post
      </Button>
    </View>
  );

  const _dialog = () => (
    <Portal>
      <Dialog visible={visible} onDismiss={_hideDialog}>
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
      {_header()}
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
