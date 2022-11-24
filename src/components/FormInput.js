import React, { useState } from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const FormInput = ({
  style,
  multiline,
  outlineStyle,
  placeholderTextColor,
  testID,
  control,
  rules = {},
  fieldName,
  label,
  leftIcon,
  rightIcon,
  passwordField = false,
  placeholder,
  autoFocus,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const iconLeft = leftIcon ? (
    <TextInput.Icon icon={leftIcon} iconColor="#B4B4B4" />
  ) : null;

  const iconRight = rightIcon ? (
    <TextInput.Icon icon={rightIcon} iconColor="#B4B4B4" />
  ) : null;

  const passwordIcon = (
    <TextInput.Icon
      icon={passwordVisible ? 'eye' : 'eye-off'}
      iconColor="#B4B4B4"
      onPress={() => setPasswordVisible(!passwordVisible)}
    />
  );

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
            autoFocus={autoFocus}
            multiline={multiline}
            placeholderTextColor={placeholderTextColor}
            style={style}
            outlineStyle={outlineStyle}
            placeholder={placeholder}
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
            secureTextEntry={passwordField && passwordVisible}
          />
          <HelperText type="error" visible={error ? true : false}>
            {error?.message || 'Please insert the correct info'}
          </HelperText>
        </>
      )}
    />
  );
};

FormInput.propTypes = {
  style: PropTypes.object,
  multiline: PropTypes.bool,
  outlineStyle: PropTypes.object,
  placeholderTextColor: PropTypes.string,
  testID: PropTypes.string,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  passwordField: PropTypes.bool,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default FormInput;
