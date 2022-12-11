import React, { useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FormInput, NavigationHeader } from '../components';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTag } from '../hooks';

const AddTagScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postTag } = useTag();

  const name = watch('name');

  const _goBack = () => navigation.pop();

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Create new tag
  const _addTag = async (data) => {
    Keyboard.dismiss();

    try {
      setLoading(true);
      await postTag(data);
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
    <SafeAreaView style={{ flex: 1 }}>
      {_snackbar()}
      <NavigationHeader
        onPressCancel={_goBack}
        onSubmit={handleSubmit(_addTag)}
        disableButton={!name || loading}
        loading={loading}
        buttonText="Add"
      />
      <FormInput
        autoFocus
        style={styles.description}
        placeholderTextColor="#ababab"
        placeholder="Write the tag name"
        control={control}
        fieldName="name"
        outlineStyle={styles.descriptionOutline}
        disabled={loading}
        rules={{
          maxLength: {
            value: 20,
            message: "Tag's maximum length is 20 characters",
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  descriptionOutline: {
    borderColor: 'transparent',
  },
});

AddTagScreen.propTypes = {
  navigation: PropTypes.object,
};

export default AddTagScreen;
