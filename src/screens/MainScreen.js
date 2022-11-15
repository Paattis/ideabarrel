import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { ThemeToggle, Post } from '../components';
import MainBG from '../../assets/svg/main-bg.svg';

const MainScreen = ({ navigation }) => {
  const second = () => navigation.navigate('Second');

  return (
    <View>
      <MainBG style={styles.bgShape} />
      <ScrollView contentContainerStyle={styles.container}>
        <Post />

        <Button testID="navButton" mode="elevated" onPress={second}>
          Navigate
        </Button>
        <ThemeToggle />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bgShape: {
    position: 'absolute',
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.object,
};

export default MainScreen;
