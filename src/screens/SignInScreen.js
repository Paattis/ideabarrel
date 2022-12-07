import React, { useContext, useState } from 'react';
import { FormInput, ScreenWrapper } from '../components';
import FormCard from '../components/FormCard';
import { Button, Snackbar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import { useAuth } from '../hooks';
import { ACCESS_TOKEN } from '../utils/constants';
import * as SecureStore from 'expo-secure-store';
import BgSVG from '../../assets/svg/top-right-bg.svg';

const SingInScreen = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { control, handleSubmit } = useForm({ mode: 'onBlur' });

  const { setSignedIn, setUser } = useContext(MainContext);
  const { postSignIn } = useAuth();

  const _signIn = async (data) => {
    try {
      setLoading(true);
      const user = await postSignIn(data);
      await SecureStore.setItemAsync(ACCESS_TOKEN, user.token);
      setUser(user);
      setSignedIn(true);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      _onToggleSnackBar();
    } finally {
      setLoading(false);
    }
  };

  const [showSnack, setShowSnack] = useState(false);

  const _onToggleSnackBar = () => setShowSnack(true);

  const _onDismissSnackBar = () => setShowSnack(false);

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView
      keyboardShouldPersistTaps="handled"
    >
      {_snackbar()}
      <BgSVG style={styles.bgShape} />
      <FormCard title="Sign in to your account">
        <FormInput
          testID="email_input"
          leftIcon="email"
          fieldName="email"
          label="Email"
          control={control}
          disabled={loading}
          rules={{
            required: 'Please insert your email',
          }}
        />
        <FormInput
          passwordField
          testID="password"
          leftIcon="lock"
          fieldName="password"
          label="Password"
          control={control}
          disabled={loading}
          rules={{
            required: 'Please insert your password',
          }}
        />

        <Button
          style={styles.signInBtn}
          mode="contained"
          onPress={handleSubmit(_signIn)}
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
      </FormCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  signInBtn: {
    marginTop: 20,
  },
  bgShape: {
    position: 'absolute',
  },
});

export default SingInScreen;
