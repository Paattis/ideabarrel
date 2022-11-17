import React from 'react';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import numeral from 'numeral';

const Comments = ({ onPress }) => {
  const commentsFormatted = numeral(1000).format('0a');

  return (
    <Button textColor="#fff" icon={'comment'} onPress={onPress}>
      {commentsFormatted}
    </Button>
  );
};

Comments.propTypes = {
  onPress: PropTypes.func,
};

export default Comments;
