import * as React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Button } from 'react-native-paper';

const MainScreen = () => {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: scheme === 'dark' ? '#000' : '#fff' },
      ]}
    >
      <Button
        loading={true}
        mode="elevated"
        onPress={() => console.log('Pressed')}
      >
        Button
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

export default MainScreen;
