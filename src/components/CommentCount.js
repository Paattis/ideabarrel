import React from 'react';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import numeral from 'numeral';

const CommentCount = ({ onPress, comments }) => {
  const commentCountFormatted = numeral(comments?.length).format('0a');

  return (
    <Button textColor="#fff" icon={'comment'} onPress={onPress}>
      {commentCountFormatted}
    </Button>
  );
};

CommentCount.propTypes = {
  onPress: PropTypes.func,
  comments: PropTypes.array,
};

export default CommentCount;
