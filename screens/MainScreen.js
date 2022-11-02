import * as React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';

const MainScreen = ({ navigation }) => {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: scheme === 'dark' ? '#000' : '#fff' },
      ]}
    >
      <Button mode="elevated" onPress={() => navigation.navigate('Second')}>
        Navigate to Details
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.object,
};

export default MainScreen;
