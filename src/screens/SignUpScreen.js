import React, { useState } from 'react';
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
import BgSVG from '../../assets/svg/top-left-bg.svg';
import pickAvatarImg from '../../assets/pick-avatar.png';
import * as ImagePicker from 'expo-image-picker';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../utils/constants';
import { useRole } from '../hooks/useRole';

const SignUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedList, setExpandedList] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ name: 'Select a role' });

  const pickAvatarUri = Image.resolveAssetSource(pickAvatarImg)?.uri;

  const { control, handleSubmit, watch } = useForm({ mode: 'onBlur' });
  const { postUser, checkEmail } = useUser();
  const { roles } = useRole();

  const password = watch('password');

  // Navigate to sign in screen
  const _signInScreen = () => navigation.navigate('Sign In');

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Handle role list
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

  // Create new user account
  const _signUp = async (data) => {
    delete data.confirm_password;

    const formData = new FormData();

    formData.append('role_id', selectedRole.id);

    if (avatar) {
      const imageName = avatar.split('/').pop();
      const imgExtension = imageName.split('.').pop();

      formData.append('avatar', {
        uri: avatar,
        name: imageName,
        type: 'image/' + imgExtension,
      });
    }

    for (const [name, value] of Object.entries(data)) {
      formData.append(name, value);
    }

    try {
      setLoading(true);
      const user = await postUser(formData);
      if (user) _signInScreen();
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    } finally {
      setLoading(false);
    }
  };

  // Check if email is available
  const _validateEmail = async (value) => {
    try {
      const res = await checkEmail(value);
      if (!res.free) return 'This email is already taken';
    } catch (error) {
      console.error(error);
    }
  };

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  const _selectRole = () => (
    <List.Section>
      <List.Accordion
        title={selectedRole.name}
        expanded={expandedList}
        onPress={_handleListPress}
      >
        {/* Remove admin role and list all available roles*/}
        <ScrollView nestedScrollEnabled={true} style={{ height: 100 }}>
          {roles.slice(1).map((role) => (
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
      {_snackbar()}
      <BgSVG style={styles.bgShape} />

      <FormCard title="Create your new account">
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

        {_selectRole()}
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
  pfp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  bgShape: {
    position: 'absolute',
  },
});

SignUpScreen.propTypes = {
  navigation: PropTypes.object,
};

export default SignUpScreen;
