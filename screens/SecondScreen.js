import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenWrapper } from '../components';

const SecondScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <Text>Second Screen</Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SecondScreen;
