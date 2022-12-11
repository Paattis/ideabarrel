import React, { useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FormInput, NavigationHeader } from '../components';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRole } from '../hooks';

const AddRoleScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postRole } = useRole();

  const name = watch('name');

  const _goBack = () => navigation.pop();

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Create new role
  const _addRole = async (data) => {
    Keyboard.dismiss();

    try {
      setLoading(true);
      console.log(data);
      await postRole(data);
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
        onSubmit={handleSubmit(_addRole)}
        disableButton={!name || loading}
        loading={loading}
        buttonText="Add"
      />
      <FormInput
        autoFocus
        style={styles.description}
        placeholderTextColor="#ababab"
        placeholder="Write the role name"
        control={control}
        fieldName="name"
        outlineStyle={styles.descriptionOutline}
        disabled={loading}
        rules={{
          maxLength: {
            value: 20,
            message: 'Role maximum length is 20 characters',
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

AddRoleScreen.propTypes = {
  navigation: PropTypes.object,
};

export default AddRoleScreen;
