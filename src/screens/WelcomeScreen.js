import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button, Divider, Text } from 'react-native-paper';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { PreferencesContext } from '../contexts/PreferencesContext';
import WelcomeBG from '../../assets/svg/welcome-screen-bg.svg';

const WelcomeScreen = ({ navigation }) => {
  const registerScreen = () => navigation.navigate('Sign Up');
  const signInScreen = () => navigation.navigate('Sign In');

  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const buttonStyle = {
    borderColor: theme.colors.primary,
  };

  const contentStyle = {
    backgroundColor: theme.colors.background,
    padding: 20,
  };

  return (
    <View style={styles.container}>
      <WelcomeBG />
      <View style={contentStyle}>
        <Text variant="headlineMedium">Welcome</Text>
        <Text variant="bodySmall" style={{ marginBottom: 29 }}>
          IdeaBarrel allows you to share your work related ideas amongst your
          colleagues quickly and efficiently!
        </Text>
        <Button
          testID="sign_in"
          style={buttonStyle}
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#345BAC',
    justifyContent: 'flex-end',
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
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
