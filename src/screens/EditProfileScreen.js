import React, { useState, useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FormInput, ScreenWrapper } from '../components';
import FormCard from '../components/FormCard';
import { PropTypes } from 'prop-types';
import { Button, Avatar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import pickAvatarImg from '../../assets/pick-avatar.png';
import * as ImagePicker from 'expo-image-picker';
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from '../utils/constants';
import { MainContext } from '../contexts/MainContext';

const EditProfileScreen = ({ navigation }) => {
  const pickAvatarUri = Image.resolveAssetSource(pickAvatarImg)?.uri;

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(pickAvatarUri);

  const { user, setUser } = useContext(MainContext);
  const { putUser } = useUser();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      confirm_password: '',
    },
    mode: 'onBlur',
  });

  const _goBack = () => navigation.pop();

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

  const _editProfile = async (data) => {
    const formData = new FormData();
    // const imageName = avatar.split('/').pop();

    // formData.append('profile_img', {
    //   uri: avatar,
    //   name: imageName,
    //   type: 'image/jpg',
    // });

    try {
      setLoading(true);
      data.role_id = 1;
      delete data.confirm_password;
      if (data.password === '') delete data.password;
      formData.append(data);
      console.log('PUT DATA: ', formData);

      const user = await putUser(data);
      if (user) {
        delete data.password;
        setUser(data);
        _goBack();
      }
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
      <FormCard title="Edit your account info">
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
          }}
        />
        <FormInput
          testID="name_input"
          leftIcon="account-circle"
          fieldName="name"
          label="Name"
          control={control}
          rules={{
            required: 'Name required',
            pattern: {
              value: USERNAME_REGEX,
              message: 'Name must be 2 - 15 characters long with no spaces',
            },
          }}
        />
        <FormInput
          testID="password_input"
          leftIcon="lock"
          passwordField
          fieldName="password"
          label="Change password"
          control={control}
          rules={{
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
            validate: (value) =>
              value === password || 'Password does not match',
          }}
        />

        <Button
          disabled={loading}
          loading={loading}
          testID="register_button"
          mode="contained"
          onPress={handleSubmit(_editProfile)}
        >
          Save
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

EditProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfileScreen;
