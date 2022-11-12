import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const CustomInput = ({
  testID,
  control,
  rules = {},
  fieldName,
  label,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            testID={testID}
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={label}
            secureTextEntry={secureTextEntry}
            error={error ? true : false}
          />
          <HelperText type="error" visible={error ? true : false}>
            {error?.message || 'Please insert the correct info'}
          </HelperText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

CustomInput.propTypes = {
  control: PropTypes.object,
  rules: PropTypes.object,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  testID: PropTypes.string,
};

export default CustomInput;
