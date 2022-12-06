import React, { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { Card } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';

const FormCard = ({ children, title }) => {
  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const cardTitleStyle = {
    color: theme.colors.primary,
  };

  return (
    <Card style={styles.card} elevation={4}>
      <Card.Title titleStyle={cardTitleStyle} title={title} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 9,
  },
});

FormCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default FormCard;
