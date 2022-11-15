import React, { useState } from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const CustomInput = ({
  testID,
  control,
  rules = {},
  fieldName,
  label,
  leftIcon,
  rightIcon,
  passwordField = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const iconLeft = leftIcon ? (
    <TextInput.Icon icon={leftIcon} iconColor="#B4B4B4" />
  ) : null;

  const iconRight = rightIcon ? (
    <TextInput.Icon icon={rightIcon} iconColor="#B4B4B4" />
  ) : null;

  const passwordIcon = rightIcon ? (
    <TextInput.Icon
      icon={passwordVisible ? 'eye' : 'eye-off'}
      iconColor="#B4B4B4"
      onPress={() => setPasswordVisible(!passwordVisible)}
    />
  ) : null;

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            dense
            outlineColor="#B4B4B4"
            mode="outlined"
            testID={testID}
            left={iconLeft}
            right={passwordField ? passwordIcon : iconRight}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={label}
            error={error}
            secureTextEntry={passwordVisible}
          />
          <HelperText type="error" visible={error ? true : false}>
            {error?.message || 'Please insert the correct info'}
          </HelperText>
        </>
      )}
    />
  );
};

CustomInput.propTypes = {
  testID: PropTypes.string,
  control: PropTypes.object,
  rules: PropTypes.object,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  passwordField: PropTypes.bool,
};

export default CustomInput;
