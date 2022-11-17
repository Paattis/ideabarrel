import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import numeral from 'numeral';

const Like = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([0]);

  const like = () => {
    setLiked(true);
    setLikes(1);
  };

  const unlike = () => {
    setLiked(false);
    setLikes(0);
  };

  const likesFormatted = numeral(likes).format('0a');

  return (
    <Button
      textColor="#fff"
      icon={liked ? 'thumb-up' : 'thumb-up-outline'}
      onPress={liked ? unlike : like}
    >
      {likesFormatted}
    </Button>
  );
};

export default Like;