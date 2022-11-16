import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { Post } from '../components';
import MainBG from '../../assets/svg/main-bg.svg';

// mock data
const data = [
  {
    title: 'test1',
    description: 'some desc',
  },
  {
    title: 'test2',
    description: 'some desc2',
  },
  {
    title: 'test3',
    description: 'some desc3',
  },
  {
    title: 'test4',
    description: 'some desc4',
  },
];

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <MainBG style={styles.bgShape} />
      <FlatList data={data} renderItem={({ item }) => <Post post={item} />} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgShape: {
    position: 'absolute',
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.object,
};

export default MainScreen;
