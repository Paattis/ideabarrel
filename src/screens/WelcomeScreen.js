import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { ActivityIndicator, Button, Divider, Text } from 'react-native-paper';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { useAuth } from '../hooks';
import { MainContext } from '../contexts/MainContext';
import { ACCESS_TOKEN } from '../utils/constants';
import * as SecureStore from 'expo-secure-store';
import WelcomeBG from '../../assets/svg/welcome-screen-bg.svg';

const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState();

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

  // Navigate to sign up or sign in screens
  const _registerScreen = () => navigation.navigate('Sign Up');
  const _signInScreen = () => navigation.navigate('Sign In');

  // Authenticate user if token is saved on the device
  const _authUser = async () => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
    if (!token) return;

    try {
      setLoading(true);
      const user = await authUser(token);
      setUser(user);
      setSignedIn(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _authUser();
  }, []);

  if (loading)
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator animating={!loading} size="large" />
        <Text variant="titleMedium" style={{ margin: 14 }}>
          Authenticating...
        </Text>
      </View>
    );
  else
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
