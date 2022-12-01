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
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from '../utils/constants';

const SignUpScreen = ({ navigation }) => {
  const pickAvatarUri = Image.resolveAssetSource(pickAvatarImg)?.uri;

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(pickAvatarUri);

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postUser } = useUser();

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
    data.role_id = 1;
    formData.append(data);
    // const imageName = avatar.split('/').pop();

    // formData.append('profile_img', {
    //   uri: avatar,
    //   name: imageName,
    //   type: 'image/jpg',
    // });

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
          disabled={loading}
          rules={{
            required: 'Email required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email has to be valid.',
            },
          }}
        />

        <FormInput
          testID="name_input"
          leftIcon="account-circle"
          fieldName="name"
          label="Name"
          control={control}
          disabled={loading}
          rules={{
            required: 'Name required',
            pattern: {
              value: USERNAME_REGEX,
              message: 'Username must be 2 - 15 characters long with no spaces',
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
          disabled={loading}
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
          disabled={loading}
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
