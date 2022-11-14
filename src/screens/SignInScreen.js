import React from 'react';
import { CustomInput } from '../components';
import CustomCard from '../components/CustomCard';
import { Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';

const SingInScreen = () => {
  const { control, handleSubmit } = useForm({ mode: 'onBlur' });

  return (
    <CustomCard
      cardTitle="Sign in to your account"
      bgShape="m0 185 540 117V0H0Z"
    >
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
        testID="register_button"
        mode="contained"
        onPress={handleSubmit()}
      >
        Sign In
      </Button>
    </CustomCard>
  );
};

export default SingInScreen;
