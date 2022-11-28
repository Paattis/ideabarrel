import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import numeral from 'numeral';
import { useLike } from '../hooks';
import { PropTypes } from 'prop-types';
import { MainContext } from '../contexts/MainContext';

const Like = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const { user, likeUpdate, setLikeUpdate } = useContext(MainContext);
  const { getLikesByPostId, postLike, deleteLike } = useLike();

  const _getLikes = async () => {
    try {
      const likes = await getLikesByPostId(postId);
      setLikes(likes);

      likes.forEach((like) => {
        if (like.userId === user.result.id) {
          setLiked(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const _like = async () => {
    try {
      const res = await postLike(postId);
      if (res) {
        setLiked(true);
        setLikeUpdate(likeUpdate + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _unlike = async () => {
    try {
      const res = await deleteLike(postId);
      if (res) {
        setLiked(false);
        setLikeUpdate(likeUpdate + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _getLikes();
  }, [likeUpdate]);

  const likesFormatted = numeral(likes.length).format('0a');

  return (
    <Button
      textColor="#fff"
      icon={liked ? 'thumb-up' : 'thumb-up-outline'}
      onPress={liked ? _unlike : _like}
    >
      {likesFormatted}
    </Button>
  );
};

Like.propTypes = {
  postId: PropTypes.number,
};

export default Like;
