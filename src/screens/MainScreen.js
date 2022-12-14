import React, { useCallback, useContext, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { FAB, IdeaCard } from '../components';
import { useIdea, useTag } from '../hooks';
import { ActivityIndicator, List, Snackbar } from 'react-native-paper';
import { MainContext } from '../contexts/MainContext';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
import BgSVG from '../../assets/svg/top-bottom-bg.svg';
import {
  MOST_COMMENTED_IDEAS,
  MOST_LIKED_IDEAS,
  NEWEST_IDEAS,
  OLDEST_IDEAS,
  SUBSCRIBED_TAGS,
} from '../utils/constants';

const MainScreen = ({ navigation }) => {
  const [isFabExtended, setIsFabExtended] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { updateIdeas, setUpdateIdeas, setIdeaSortOrder, user } =
    useContext(MainContext);
  const { ideas, loading } = useIdea();
  const { tags } = useTag();
  const { isThemeDark } = useContext(PreferencesContext);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  // Update ideas on refresh
  const onRefresh = useCallback(() => {
    setUpdateIdeas(updateIdeas + 1);
    loading && setRefreshing(true);
  });

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Refresh control
  const _refreshControl = () => (
    <RefreshControl
      colors={[theme.colors.primary]}
      progressBackgroundColor={theme.colors.background}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );

  // Expands FAB on scroll
  const _onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsFabExtended(currentScrollPosition <= 0);
  };

  // Filters tags to user's subscribed tags and displays ideas with user's tags
  const _getUserSubscribedTags = () => {
    const arr = [];
    tags.forEach((tag) => {
      tag.users.forEach((users) => {
        if (users.user.id === user.id) {
          arr.push(tag.id);
        }
      });
    });

    if (arr.length === 0) {
      setErrorMsg('Not subscribed to any tags yet...');
      _onToggleSnackBar();
      return;
    }

    setIdeaSortOrder(SUBSCRIBED_TAGS + arr);
    setUpdateIdeas(updateIdeas + 1);
    _handleSortMenu();
  };

  // Navigate to add new idea screen
  const _newIdeaScreen = () => navigation.navigate('New Idea');

  // Handle sort list
  const _handleSortMenu = () => setExpanded(!expanded);

  const _sortOptions = () => (
    <List.Section style={{ marginHorizontal: 20 }}>
      <List.Accordion
        left={(props) => <List.Icon {...props} icon="sort-variant" />}
        title="Sort By"
        expanded={expanded}
        onPress={_handleSortMenu}
      >
        <List.Item
          style={{ backgroundColor: theme.colors.primaryContainer }}
          left={(props) => <List.Icon {...props} icon="tag-multiple" />}
          onPress={() => {
            _getUserSubscribedTags();
          }}
          title="Tags I subscribed to"
        />
        <List.Item
          style={{ backgroundColor: theme.colors.primaryContainer }}
          left={(props) => <List.Icon {...props} icon="thumb-up" />}
          onPress={() => {
            setIdeaSortOrder(MOST_LIKED_IDEAS);
            setUpdateIdeas(updateIdeas + 1);
            _handleSortMenu();
          }}
          title="Most liked"
        />
        <List.Item
          style={{ backgroundColor: theme.colors.primaryContainer }}
          left={(props) => <List.Icon {...props} icon="comment" />}
          onPress={() => {
            setIdeaSortOrder(MOST_COMMENTED_IDEAS);
            setUpdateIdeas(updateIdeas + 1);
            _handleSortMenu();
          }}
          title="Most commented"
        />
        <List.Item
          style={{ backgroundColor: theme.colors.primaryContainer }}
          left={(props) => (
            <List.Icon {...props} icon="sort-calendar-descending" />
          )}
          onPress={() => {
            setIdeaSortOrder(NEWEST_IDEAS);
            setUpdateIdeas(updateIdeas + 1);
            _handleSortMenu();
          }}
          title="Most recent"
        />
        <List.Item
          style={{ backgroundColor: theme.colors.primaryContainer }}
          left={(props) => (
            <List.Icon {...props} icon="sort-calendar-ascending" />
          )}
          onPress={() => {
            setIdeaSortOrder(OLDEST_IDEAS);
            setUpdateIdeas(updateIdeas + 1);
            _handleSortMenu();
          }}
          title="Oldest"
        />
      </List.Accordion>
    </List.Section>
  );

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  return (
    <>
      <SafeAreaView>
        <BgSVG style={styles.bgShape} />
        {!loading ? (
          <FlatList
            ListHeaderComponent={_sortOptions}
            refreshControl={_refreshControl()}
            onScroll={_onScroll}
            showsVerticalScrollIndicator={false}
            data={ideas}
            renderItem={({ item }) => (
              <IdeaCard idea={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
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
      {_snackbar()}
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
