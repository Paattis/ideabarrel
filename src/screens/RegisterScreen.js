import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CustomInput, ScreenWrapper } from '../components';
import { PropTypes } from 'prop-types';
import { Button, Card } from 'react-native-paper';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import { useForm } from 'react-hook-form';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { Svg, Path } from 'react-native-svg';
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from '../utils/variables';

const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });

  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const signInScreen = () => navigation.navigate('Sign In');

  const password = watch('password');

  const cardTitleStyle = {
    color: theme.colors.primary,
  };

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView
      keyboardShouldPersistTaps="handled"
    >
      <Svg style={styles.bgShape}>
        <Path d="m0 278 900-127V0H0Z" fill="#345BAC" />
      </Svg>
      <Card style={styles.card} elevation={4}>
        <Card.Title
          titleStyle={cardTitleStyle}
          title="Create your new account"
        />
        <Card.Content>
          <CustomInput
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
          <CustomInput
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
          <CustomInput
            testID="username_input"
            leftIcon="account-circle"
            fieldName="username"
            label="Username*"
            control={control}
            rules={{
              required: 'Username required',
              pattern: {
                value: USERNAME_REGEX,
                message:
                  'Username must be 2 - 15 characters long with no spaces',
              },
            }}
          />
          <CustomInput
            testID="password_input"
            rightIcon="eye"
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
          <CustomInput
            testID="confirm_password_input"
            rightIcon="eye"
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
            onPress={handleSubmit(signInScreen)}
          >
            Sign Up
          </Button>
        </Card.Content>
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '88%',
    borderRadius: 9,
  },
  bgShape: {
    position: 'absolute',
  },
});

RegisterScreen.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterScreen;
