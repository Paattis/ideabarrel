import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { FAB, Media } from '../components';
import { useMedia } from '../hooks';
import BgSVG from '../../assets/svg/top-bottom-bg.svg';

const MainScreen = ({ navigation }) => {
  const [isFabExtended, setIsFabExtended] = useState(true);
  const { media } = useMedia();

  const _onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsFabExtended(currentScrollPosition <= 0);
  };

  const _newPost = () => navigation.navigate('New Post');

  return (
    <>
      <SafeAreaView>
        <BgSVG style={styles.bgShape} />
        <FlatList
          onScroll={_onScroll}
          showsVerticalScrollIndicator={false}
          data={media}
          renderItem={({ item }) => (
            <Media post={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.postId}
        />
      </SafeAreaView>
      <FAB
        testID="main_fab"
        label="New Post"
        extended={isFabExtended}
        onPress={_newPost}
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
