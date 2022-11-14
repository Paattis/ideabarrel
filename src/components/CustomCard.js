import React, { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ScreenWrapper } from '../components';
import { Svg, Path } from 'react-native-svg';
import { Card } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';

const CustomCard = ({ children, cardTitle, bgShape }) => {
  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const cardTitleStyle = {
    color: theme.colors.primary,
  };

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView
      keyboardShouldPersistTaps="handled"
    >
      <Svg style={styles.bgShape}>
        <Path d={bgShape} fill="#345BAC" />
      </Svg>
      <Card style={styles.card} elevation={4}>
        <Card.Title titleStyle={cardTitleStyle} title={cardTitle} />
        <Card.Content>{children}</Card.Content>
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '88%',
    borderRadius: 9,
  },
  bgShape: {
    position: 'absolute',
  },
});

CustomCard.propTypes = {
  children: PropTypes.node,
  cardTitle: PropTypes.string,
  bgShape: PropTypes.string,
};

export default CustomCard;
