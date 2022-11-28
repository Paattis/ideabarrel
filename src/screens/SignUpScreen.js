import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FormInput, ScreenWrapper } from '../components';
import FormCard from '../components/FormCard';
import { PropTypes } from 'prop-types';
import { Button, Avatar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import BgSVG from '../../assets/svg/top-left-bg.svg';
import pickAvatarImg from '../../assets/pick-avatar.png';
import * as ImagePicker from 'expo-image-picker';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../utils/constants';

const SignUpScreen = ({ navigation }) => {
  const pickAvatarUri = Image.resolveAssetSource(pickAvatarImg)?.uri;

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(pickAvatarUri);

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postUser, checkEmail } = useUser();

  const _signInScreen = () => navigation.navigate('Sign In');

  const password = watch('password');

  const _pickImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    };
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) setAvatar(result.uri);
  };

  const _signUp = async (data) => {
    const formData = new FormData();
    formData.append(data);
    const imageName = avatar.split('/').pop();

    formData.append('profile_img', {
      uri: avatar,
      name: imageName,
      type: 'image/jpg',
    });

    try {
      setLoading(true);
      delete data.confirm_password;
      const user = await postUser(formData);
      if (user) _signInScreen();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      withScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <BgSVG style={styles.bgShape} />
      <FormCard title="Create your new account">
        <TouchableOpacity onPress={_pickImage}>
          <Avatar.Image size={90} source={{ uri: avatar }} />
        </TouchableOpacity>
        <FormInput
          testID="email_input"
          leftIcon="email"
          fieldName="email"
          label="Email"
          control={control}
          rules={{
            required: 'Email required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email has to be valid.',
            },
            validate: async (value) => {
              try {
                const res = await checkEmail(value);
                if (!res.free) {
                  return 'This email is already taken';
                }
              } catch (error) {
                return true;
              }
            },
          }}
        />
        <FormInput
          testID="full_name_input"
          leftIcon="account-circle"
          fieldName="name"
          label="Name"
          control={control}
          rules={{
            required: 'Name required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Name can be maximum of 20 characters long',
            },
            pattern: {
              value: NAME_REGEX,
              message: 'Name must not contain special characters',
            },
          }}
        />
        <FormInput
          testID="password_input"
          leftIcon="lock"
          passwordField
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
        <FormInput
          testID="confirm_password_input"
          leftIcon="lock"
          passwordField
          fieldName="confirm_password"
          label="Confirm password"
          control={control}
          rules={{
            required: 'Please confirm password',
            validate: (value) =>
              value === password || 'Password does not match',
          }}
        />

        <Button
          disabled={loading}
          loading={loading}
          testID="register_button"
          mode="contained"
          onPress={handleSubmit(_signUp)}
        >
          Sign Up
        </Button>
      </FormCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  bgShape: {
    position: 'absolute',
  },
});

SignUpScreen.propTypes = {
  navigation: PropTypes.object,
};

export default SignUpScreen;
