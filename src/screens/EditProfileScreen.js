import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormInput, ScreenWrapper } from '../components';
import FormCard from '../components/FormCard';
import { PropTypes } from 'prop-types';
import { Button, Avatar, Snackbar, List } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import pickAvatarImg from '../../assets/pick-avatar.png';
import * as ImagePicker from 'expo-image-picker';
import { MainContext } from '../contexts/MainContext';
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PROFILE_IMG_URL,
} from '../utils/constants';
import { useRole } from '../hooks';

const EditProfileScreen = ({ navigation }) => {
  const pickAvatarUri = Image.resolveAssetSource(pickAvatarImg)?.uri;

  const { user, setUser, updateProfile, setUpdateProfile } =
    useContext(MainContext);
  const { putUser, putUserProfileImg, checkEmail } = useUser();
  const { roles } = useRole();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: '',
      confirm_password: '',
    },
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedList, setExpandedList] = useState(false);
  const [selectedRole, setSelectedRole] = useState({
    name: user.role.name,
    id: user.role.id,
  });

  const password = watch('password');

  const _goBack = () => navigation.pop();

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Handle list
  const _handleListPress = () => setExpandedList(!expandedList);

  // Image picker handler
  const _pickImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    };
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) setAvatar(result.uri);
  };

  // Edit user's avatar image
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

  // Edit user's info
  const _editProfile = async (data) => {
    delete data.confirm_password;
    if (data.password === '') delete data.password;
    if (user.email === data.email) delete data.email;

    data.role_id = selectedRole.id;

    try {
      setLoading(true);
      const res = await putUser(data, user.id);
      if (avatar) _editProfileImg();

      if (res) {
        delete data.password;
        res.token = user.token;
        setUser(res);
        setUpdateProfile(updateProfile + 1);
        _goBack();
      }
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    } finally {
      setLoading(false);
    }
  };

  // Check email availability if it's changed
  const _validateEmail = async (value) => {
    try {
      const res = await checkEmail(value);
      if (res.free || user.email === value) return;
      return 'This email is already taken';
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    user.profile_img
      ? setAvatar(PROFILE_IMG_URL + user.profile_img)
      : setAvatar(pickAvatarUri);
  }, []);

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  // Remove admin role if the user is not an admin
  const isAdminRoles = user.role.id === 1 ? roles : roles.slice(1);

  const _selectRole = () => (
    <List.Section>
      <List.Accordion
        title={selectedRole.name}
        expanded={expandedList}
        onPress={_handleListPress}
      >
        {/* List all Available roles */}
        <ScrollView style={{ height: 100 }}>
          {isAdminRoles.map((role) => (
            <List.Item
              key={role.id}
              title={role.name}
              onPress={() => {
                setSelectedRole(role);
                _handleListPress();
              }}
            />
          ))}
        </ScrollView>
      </List.Accordion>
    </List.Section>
  );

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
            validate: (value) => _validateEmail(value),
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

        {_selectRole()}
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
      {_snackbar()}
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
