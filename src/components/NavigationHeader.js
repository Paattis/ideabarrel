import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { PropTypes } from 'prop-types';

const NavigationHeader = ({
  onPressCancel,
  onSubmit,
  disableButton,
  loading,
  buttonText,
}) => {
  return (
    <View style={styles.header}>
      <IconButton size={32} icon="close" onPress={onPressCancel} />
      <Button
        disabled={disableButton}
        mode="contained"
        style={styles.postButton}
        onPress={onSubmit}
        loading={loading}
      >
        {buttonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
  },
  postButton: {
    borderRadius: 100,
    marginRight: 14,
  },
});

NavigationHeader.propTypes = {
  onPressCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  disableButton: PropTypes.bool,
  loading: PropTypes.bool,
  buttonText: PropTypes.string,
};

export default NavigationHeader;
