import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomInput, ScreenWrapper } from '../components';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import { useForm } from 'react-hook-form';

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signInScreen = (data) => {
    console.log(data);
    console.log(errors);

    navigation.navigate('SignIn');
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.container} withScrollView>
      <CustomInput
        fieldName="email"
        label="Email"
        control={control}
        rules={{ required: 'Email requited' }}
      />
      <CustomInput
        fieldName="full_name"
        label="Full name"
        control={control}
        rules={{ required: 'Full name requited' }}
      />
      <CustomInput
        fieldName="username"
        label="Username"
        control={control}
        rules={{ required: 'Username requited' }}
      />
      <CustomInput
        fieldName="password"
        label="Password"
        secureTextEntry
        control={control}
        rules={{ required: 'Password requited' }}
      />
      <CustomInput
        fieldName="confirm_password"
        label="Confirm password"
        secureTextEntry
        control={control}
        rules={{ required: 'Please confirm your password' }}
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
