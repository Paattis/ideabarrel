import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { FAB, Post } from '../components';
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
  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const newPost = () => navigation.navigate('New Post');

  return (
    <>
      <SafeAreaView>
        <MainBG style={styles.bgShape} />
        <FlatList
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <Post post={item} />}
        />
      </SafeAreaView>
      <FAB
        testID="main_fab"
        label="New Post"
        extended={isExtended}
        onPress={newPost}
      />
    </>
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
