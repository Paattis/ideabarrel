import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomInput, ScreenWrapper } from '../components';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from '../utils/variables';

const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });

  const signInScreen = () => navigation.navigate('SignIn');

  const password = watch('password');

  return (
    <ScreenWrapper contentContainerStyle={styles.container} withScrollView>
      <CustomInput
        fieldName="email"
        label="Email"
        control={control}
        rules={{
          required: 'Email required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Email has to be valid.',
          },
        }}
      />
      <CustomInput
        fieldName="full_name"
        label="Full name"
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
      <CustomInput
        fieldName="username"
        label="Username"
        control={control}
        rules={{
          required: 'Username required',
          pattern: {
            value: USERNAME_REGEX,
            message: 'Username must be 2 - 15 characters long with no spaces',
          },
        }}
      />
      <CustomInput
        fieldName="password"
        label="Password"
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
      <CustomInput
        fieldName="confirm_password"
        label="Confirm password"
        control={control}
        rules={{
          validate: (value) => value === password || 'Password does not match',
        }}
      />

      <Button onPress={handleSubmit(signInScreen)}>Sign Up</Button>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

RegisterScreen.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterScreen;
