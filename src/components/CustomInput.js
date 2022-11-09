import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const CustomInput = ({ value, setValue, label, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

CustomInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.object,
  label: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default CustomInput;
