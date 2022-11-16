import React from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { PropTypes } from 'prop-types';

const FAB = ({ label, visible = true, extended, onPress, testID }) => {
  return (
    <AnimatedFAB
      testID={testID}
      icon="plus"
      label={label}
      extended={extended}
      visible={visible}
      style={styles.fab}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 16,
  },
});

FAB.propTypes = {
  label: PropTypes.string,
  visible: PropTypes.bool,
  extended: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string,
};

export default FAB;
