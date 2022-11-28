import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { useComment } from '../hooks';
import numeral from 'numeral';

const CommentCount = ({ onPress, postId }) => {
  const [comments, setComments] = useState([]);

  const { getCommentByPost } = useComment();

  const commentCountFormatted = numeral(comments.length).format('0a');

  const getComments = async () => {
    try {
      const comments = await getCommentByPost(postId);
      setComments(comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Button textColor="#fff" icon={'comment'} onPress={onPress}>
      {commentCountFormatted}
    </Button>
  );
};

CommentCount.propTypes = {
  onPress: PropTypes.func,
  postId: PropTypes.number,
};

export default CommentCount;
