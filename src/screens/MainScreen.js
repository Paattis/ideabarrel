import React, { useCallback, useContext, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { FAB, Media } from '../components';
import { useMedia } from '../hooks';
import { ActivityIndicator } from 'react-native-paper';
import { MainContext } from '../contexts/MainContext';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import BgSVG from '../../assets/svg/top-bottom-bg.svg';

const MainScreen = ({ navigation }) => {
  const [isFabExtended, setIsFabExtended] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { updateMedia, setUpdateMedia } = useContext(MainContext);
  const { media, loading } = useMedia();
  const { isThemeDark } = useContext(PreferencesContext);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const onRefresh = useCallback(() => {
    setUpdateMedia(updateMedia + 1);
    loading && setRefreshing(true);
  });

  const _refreshControl = () => (
    <RefreshControl
      colors={[theme.colors.primary]}
      progressBackgroundColor={theme.colors.background}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );

  const _onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsFabExtended(currentScrollPosition <= 0);
  };

  const _newIdeaScreen = () => navigation.navigate('New Idea');

  return (
    <>
      <SafeAreaView>
        <BgSVG style={styles.bgShape} />
        {!loading ? (
          <FlatList
            refreshControl={_refreshControl()}
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
        onPress={_newIdeaScreen}
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
