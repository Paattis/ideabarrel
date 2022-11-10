import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<App />', () => {
  it('has 1 child', async () => {
    const screen = render(<App />).toJSON();
    expect(screen.children.length).toBe(1);
    await new Promise((resolve) => setTimeout(() => resolve(true), 10));
  });
});
