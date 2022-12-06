import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button, Divider, Text } from 'react-native-paper';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { useAuth } from '../hooks';
import { MainContext } from '../contexts/MainContext';
import { ACCESS_TOKEN } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeBG from '../../assets/svg/welcome-screen-bg.svg';

const WelcomeScreen = ({ navigation }) => {
  const _registerScreen = () => navigation.navigate('Sign Up');
  const _signInScreen = () => navigation.navigate('Sign In');

  const { isThemeDark } = useContext(PreferencesContext);
  const { setUser, setSignedIn } = useContext(MainContext);
  const { authUser } = useAuth();

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const buttonStyle = {
    borderColor: theme.colors.primary,
  };

  const contentColor = {
    backgroundColor: theme.colors.background,
  };

  const _authUser = async () => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (!token) return;

    try {
      const user = await authUser(token);
      setUser(user);
      setSignedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _authUser();
  }, []);

  return (
    <View style={styles.container}>
      <WelcomeBG />
      <View style={[styles.content, contentColor]}>
        <Text variant="headlineMedium">Welcome</Text>
        <Text variant="bodySmall" style={{ marginBottom: 29 }}>
          IdeaBarrel allows you to share your work related ideas amongst your
          colleagues quickly and efficiently!
        </Text>
        <Button
          testID="sign_in"
          style={buttonStyle}
          mode="outlined"
          onPress={_signInScreen}
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
        <Button testID="sign_up" mode="contained" onPress={_registerScreen}>
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
  content: {
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
});

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeScreen;
