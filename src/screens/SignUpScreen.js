import React from 'react';
import { StyleSheet } from 'react-native';
import { FormInput, ScreenWrapper } from '../components';
import FormCard from '../components/FormCard';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import BgSVG from '../../assets/svg/top-left-bg.svg';

import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from '../utils/variables';

const SignUpScreen = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });

  const _signInScreen = () => navigation.navigate('Sign In');

  const password = watch('password');

  return (
    <ScreenWrapper
      withScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <BgSVG style={styles.bgShape} />

      <FormCard title="Create your new account">
        <FormInput
          testID="email_input"
          leftIcon="email"
          fieldName="email"
          label="Email*"
          control={control}
          rules={{
            required: 'Email required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email has to be valid.',
            },
          }}
        />
        <FormInput
          testID="full_name_input"
          leftIcon="account-circle"
          fieldName="full_name"
          label="Full name*"
          control={control}
          rules={{
            required: 'Full name required',
            minLength: {
              value: 3,
              message: 'Full name must be at least 3 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Full name can be maximum of 20 characters long',
            },
          }}
        />
        <FormInput
          testID="username_input"
          leftIcon="account-circle"
          fieldName="username"
          label="Username*"
          control={control}
          rules={{
            required: 'Username required',
            pattern: {
              value: USERNAME_REGEX,
              message: 'Username must be 2 - 15 characters long with no spaces',
            },
          }}
        />
        <FormInput
          testID="password_input"
          leftIcon="lock"
          passwordField
          fieldName="password"
          label="Password*"
          control={control}
          rules={{
            required: 'Password required',
            pattern: {
              value: PASSWORD_REGEX,
              message:
                'Password must be at least 8 characters long with one uppercase character and a number',
            },
          }}
        />
        <FormInput
          testID="confirm_password_input"
          leftIcon="lock"
          passwordField
          fieldName="confirm_password"
          label="Confirm password*"
          control={control}
          rules={{
            required: 'Please confirm password',
            validate: (value) =>
              value === password || 'Password does not match',
          }}
        />

        <Button
          testID="register_button"
          mode="contained"
          onPress={handleSubmit(_signInScreen)}
        >
          Sign Up
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
  bgShape: {
    position: 'absolute',
  },
});

SignUpScreen.propTypes = {
  navigation: PropTypes.object,
};

export default SignUpScreen;
