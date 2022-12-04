import React, { useState, useContext, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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
  PROFILE_IMG_URL,
} from '../utils/constants';
import { MainContext } from '../contexts/MainContext';

const EditProfileScreen = ({ navigation }) => {
  const pickAvatarUri = Image.resolveAssetSource(pickAvatarImg)?.uri;

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();

  const { user, setUser, setUpdateIdeas, updateIdeas } =
    useContext(MainContext);
  const { putUser, putUserProfileImg } = useUser();

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

  const _editProfileImg = async () => {
    const formData = new FormData();

    const imageName = avatar.split('/').pop();
    const imgExtension = imageName.split('.').pop();

    formData.append('avatar', {
      uri: avatar,
      name: imageName,
      type: 'image/' + imgExtension,
    });

    await putUserProfileImg(formData, user.id);
  };

  const _editProfile = async (data) => {
    delete data.confirm_password;
    if (data.password === '') delete data.password;
    data.role_id = 1;

    try {
      setLoading(true);
      const res = await putUser(data, user.id);
      if (avatar) {
        _editProfileImg();
      }

      if (res) {
        delete data.password;
        res.token = user.token;
        setUser(res);
        setUpdateIdeas(updateIdeas + 1);
        _goBack();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user.profile_img
      ? setAvatar(PROFILE_IMG_URL + user.profile_img)
      : setAvatar(pickAvatarUri);
  }, []);

  return (
    <ScreenWrapper
      withScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <FormCard title="Edit your account info">
        <View style={styles.pfp}>
          <TouchableOpacity onPress={_pickImage} disabled={loading}>
            <Avatar.Image
              size={90}
              source={{ uri: avatar ? avatar : pickAvatarUri }}
            />
          </TouchableOpacity>
        </View>
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
          disabled={loading}
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
          disabled={loading}
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
  pfp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  bgShape: {
    position: 'absolute',
  },
});

EditProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfileScreen;
