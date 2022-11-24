import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import MainScreen from '../MainScreen';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<MainScreen />', () => {
  it('should navigate to new post screen on fab press', () => {
    const navigation = { navigate: () => {} };
    jest.spyOn(navigation, 'navigate');
    const { getByTestId } = render(<MainScreen navigation={navigation} />);

    fireEvent.press(getByTestId('main_fab'));

    expect(navigation.navigate).toHaveBeenCalledWith('New Idea');
  });
});
