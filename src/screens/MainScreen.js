import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { ThemeToggle, ScreenWrapper } from '../components';

const MainScreen = ({ navigation }) => {
  const second = () => navigation.navigate('Second');

  return (
    <ScreenWrapper style={styles.container}>
      <Button testID="navButton" mode="elevated" onPress={second}>
        Navigate
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
