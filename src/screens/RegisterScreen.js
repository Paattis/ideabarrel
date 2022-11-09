import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomInput, ScreenWrapper } from '../components';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const signInScreen = () => navigation.navigate('SignIn');

  return (
    <ScreenWrapper contentContainerStyle={styles.container} withScrollView>
      <CustomInput label="Email" />
      <CustomInput label="Username" />
      <CustomInput label="Password" secureTextEntry />
      <CustomInput label="Confirm password" secureTextEntry />
      <Button onPress={signInScreen}>Sign Up</Button>
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
