import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { ScreenWrapper } from '../components';
import { Button } from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
  const registerScreen = () => navigation.navigate('Register');
  const signInScreen = () => navigation.navigate('SignIn');

  return (
    <ScreenWrapper style={styles.container}>
      <Text>WelcomeScreen</Text>

      <Button onPress={registerScreen}>Sign Up</Button>
      <Button onPress={signInScreen}>Sign In</Button>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
