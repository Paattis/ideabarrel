import React from 'react';
import { CustomInput, ScreenWrapper } from '../components';
import CustomCard from '../components/CustomCard';
import { Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import SignInBG from '../../assets/svg/sign-in-bg.svg';

const SingInScreen = () => {
  const { control, handleSubmit } = useForm({ mode: 'onBlur' });

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView
      keyboardShouldPersistTaps="handled"
    >
      <SignInBG style={styles.bgShape} />
      <CustomCard title="Sign in to your account">
        <CustomInput
          testID="username_email_input"
          leftIcon="account-circle"
          fieldName="email_username"
          label="Email or username*"
          control={control}
          rules={{
            required: 'Please insert your email or username',
          }}
        />
        <CustomInput
          passwordField
          testID="password"
          rightIcon="eye"
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
          onPress={() => console.warn('test')}
        >
          Forgot password?
        </Button>
        <Button
          style={styles.signInBtn}
          mode="contained"
          onPress={handleSubmit()}
        >
          Sign In
        </Button>
      </CustomCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
