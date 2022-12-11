import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const CustomNavigationDefaultTheme = {
  ...NavigationDefaultTheme,
  roundness: 2,
  colors: {
    primary: 'rgb(52, 91, 172)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(217, 226, 255)',
    onPrimaryContainer: 'rgb(0, 25, 69)',
    secondary: 'rgb(87, 94, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(220, 226, 249)',
    onSecondaryContainer: 'rgb(21, 27, 44)',
    tertiary: 'rgb(114, 85, 114)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(253, 215, 250)',
    onTertiaryContainer: 'rgb(42, 18, 44)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(254, 251, 255)',
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(254, 251, 255)',
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(225, 226, 236)',
    onSurfaceVariant: 'rgb(68, 70, 79)',
    outline: 'rgb(117, 119, 128)',
    outlineVariant: 'rgb(197, 198, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 52)',
    inverseOnSurface: 'rgb(242, 240, 244)',
    inversePrimary: 'rgb(176, 198, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(244, 243, 251)',
      level2: 'rgb(238, 238, 248)',
      level3: 'rgb(232, 233, 246)',
      level4: 'rgb(230, 232, 245)',
      level5: 'rgb(226, 229, 243)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(46, 48, 56, 0.4)',
  },
};

const CustomNavigationDarkTheme = {
  ...NavigationDarkTheme,
  roundness: 2,
  colors: {
    primary: 'rgb(176, 198, 255)',
    onPrimary: 'rgb(0, 44, 111)',
    primaryContainer: 'rgb(21, 67, 147)',
    onPrimaryContainer: 'rgb(217, 226, 255)',
    secondary: 'rgb(192, 198, 220)',
    onSecondary: 'rgb(41, 48, 66)',
    secondaryContainer: 'rgb(64, 70, 89)',
    onSecondaryContainer: 'rgb(220, 226, 249)',
    tertiary: 'rgb(224, 187, 221)',
    onTertiary: 'rgb(65, 39, 66)',
    tertiaryContainer: 'rgb(89, 61, 89)',
    onTertiaryContainer: 'rgb(253, 215, 250)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(27, 27, 31)',
    onBackground: 'rgb(227, 226, 230)',
    surface: 'rgb(27, 27, 31)',
    onSurface: 'rgb(227, 226, 230)',
    surfaceVariant: 'rgb(68, 70, 79)',
    onSurfaceVariant: 'rgb(197, 198, 208)',
    outline: 'rgb(143, 144, 153)',
    outlineVariant: 'rgb(68, 70, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 226, 230)',
    inverseOnSurface: 'rgb(48, 48, 52)',
    inversePrimary: 'rgb(52, 91, 172)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(34, 36, 42)',
      level2: 'rgb(39, 41, 49)',
      level3: 'rgb(43, 46, 56)',
      level4: 'rgb(45, 48, 58)',
      level5: 'rgb(48, 51, 62)',
    },
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(46, 48, 56, 0.4)',
  },
};

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...CustomNavigationDefaultTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...CustomNavigationDefaultTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...CustomNavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...CustomNavigationDarkTheme.colors,
  },
};

export { CombinedDefaultTheme, CombinedDarkTheme };
