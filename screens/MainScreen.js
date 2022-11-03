import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import ThemeToggle from '../components/ThemeToggle';
import ScreenWrapper from '../components/ScreenWrapper';

const MainScreen = ({ navigation }) => {
  return (
    <ScreenWrapper style={styles.container}>
      <Button mode="elevated" onPress={() => navigation.navigate('Second')}>
        Navigate to Details
      </Button>
      <ThemeToggle />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.object,
};

export default MainScreen;
