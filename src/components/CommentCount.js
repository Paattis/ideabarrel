import React from 'react';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import numeral from 'numeral';

const CommentCount = ({ onPress }) => {
  const commentsFormatted = numeral(1000).format('0a');

  return (
    <Button textColor="#fff" icon={'comment'} onPress={onPress}>
      {commentsFormatted}
    </Button>
  );
};

CommentCount.propTypes = {
  onPress: PropTypes.func,
};

export default CommentCount;
