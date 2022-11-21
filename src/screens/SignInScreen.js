import React, { useContext } from 'react';
import { FormInput, ScreenWrapper } from '../components';
import FormCard from '../components/FormCard';
import { Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import { useSignIn } from '../hooks';
import BgSVG from '../../assets/svg/top-right-bg.svg';

const SingInScreen = () => {
  const { control, handleSubmit } = useForm({ mode: 'onBlur' });
  const { setSignedIn } = useContext(MainContext);
  const { postSignIn } = useSignIn();

  const _signIn = async (data) => {
    try {
      await postSignIn(data);
      setSignedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView
      keyboardShouldPersistTaps="handled"
    >
      <BgSVG style={styles.bgShape} />
      <FormCard title="Sign in to your account">
        <FormInput
          testID="username_email_input"
          leftIcon="account-circle"
          fieldName="email_username"
          label="Email or username*"
          control={control}
          rules={{
            required: 'Please insert your email or username',
          }}
        />
        <FormInput
          passwordField
          testID="password"
          leftIcon="lock"
          fieldName="password"
          label="Password*"
          control={control}
          rules={{
            required: 'Please insert your password',
          }}
        />
        <Button
          style={styles.passwordBtn}
          mode="text"
          onPress={() => console.warn('not available yet')}
        >
          Forgot password?
        </Button>
        <Button
          style={styles.signInBtn}
          mode="contained"
          onPress={handleSubmit(_signIn)}
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
  passwordBtn: {
    alignItems: 'flex-end',
  },
  signInBtn: {
    marginTop: 20,
  },
  bgShape: {
    position: 'absolute',
  },
});

export default SingInScreen;
