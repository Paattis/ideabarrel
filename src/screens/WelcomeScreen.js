import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button, Divider, Text } from 'react-native-paper';
import WelcomeBG from '../../assets/svg/welcome-screen-bg.svg';

const WelcomeScreen = ({ navigation }) => {
  const registerScreen = () => navigation.navigate('Sign Up');
  const signInScreen = () => navigation.navigate('Sign In');

  return (
    <>
      <View style={styles.container}>
        <WelcomeBG />
        <View style={styles.content}>
          <Text variant="headlineMedium">Welcome</Text>
          <Text variant="bodySmall" style={{ marginBottom: 29 }}>
            IdeaBarrel allows you to share your work related ideas amongst your
            colleagues quickly and efficiently!
          </Text>
          <Button
            testID="sign_in"
            style={styles.signInBtn}
            mode="outlined"
            onPress={signInScreen}
          >
            Sign In
          </Button>
          <View style={styles.divider}>
            <Divider bold style={{ flex: 1 }} />
            <View>
              <Text style={styles.dividerText}>or</Text>
            </View>
            <Divider bold style={{ flex: 1 }} />
          </View>
          <Button testID="sign_up" mode="contained" onPress={registerScreen}>
            Sign Up
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#345BAC',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    elevation: 50,
    padding: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  dividerText: {
    width: 50,
    textAlign: 'center',
    color: '#818181',
  },
  signInBtn: {
    borderColor: '#345BAC',
  },
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
