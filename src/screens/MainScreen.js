import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { FAB, Media } from '../components';
import { useMedia } from '../hooks';
import { ActivityIndicator } from 'react-native-paper';
import BgSVG from '../../assets/svg/top-bottom-bg.svg';

const MainScreen = ({ navigation }) => {
  const [isFabExtended, setIsFabExtended] = useState(true);

  const { media, loading } = useMedia();

  const _onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsFabExtended(currentScrollPosition <= 0);
  };

  const _newIdea = () => navigation.navigate('New Idea');

  return (
    <>
      <SafeAreaView>
        <BgSVG style={styles.bgShape} />
        {!loading ? (
          <FlatList
            onScroll={_onScroll}
            showsVerticalScrollIndicator={false}
            data={media}
            renderItem={({ item }) => (
              <Media post={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.postId}
          />
        ) : (
          <ActivityIndicator color="#fff" style={styles.activityIndicator} />
        )}
      </SafeAreaView>
      <FAB
        testID="main_fab"
        label="New Idea"
        extended={isFabExtended}
        onPress={_newIdea}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bgShape: {
    position: 'absolute',
  },
  activityIndicator: { marginTop: 10 },
});

MainScreen.propTypes = {
  navigation: PropTypes.object,
};

export default MainScreen;
