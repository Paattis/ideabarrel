import React, { useContext, useEffect, useState } from 'react';
import { Button, Snackbar } from 'react-native-paper';
import { useLike } from '../hooks';
import { PropTypes } from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import numeral from 'numeral';

const Like = ({ ideaId }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState();

  const { user, updateLikes, setUpdateLikes } = useContext(MainContext);
  const { getLikesByIdeaId, postLike, deleteLike } = useLike();

  // Format like count
  const likesFormatted = numeral(likes).format('0a');

  // Toggle snackbar visibility
  const _onToggleSnackBar = () => setShowSnack(true);
  const _onDismissSnackBar = () => setShowSnack(false);

  // Get idea likes
  const _getLikes = async () => {
    try {
      if (ideaId) {
        const likes = await getLikesByIdeaId(ideaId);
        setLiked(false);
        setLikes(likes.count);
        likes.likes.forEach((like) => {
          if (like.user.id === user.id) setLiked(true);
        });
      }
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  // Like an idea
  const _like = async () => {
    try {
      const res = await postLike(ideaId);
      if (res) {
        setUpdateLikes(updateLikes + 1);
        setLiked(true);
      }
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  // Remove like from idea
  const _unlike = async () => {
    try {
      const res = await deleteLike(ideaId);
      if (res) {
        setUpdateLikes(updateLikes + 1);
        setLiked(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      _onToggleSnackBar();
    }
  };

  useEffect(() => {
    _getLikes();
  }, [ideaId, updateLikes]);

  const _snackbar = () => (
    <Snackbar visible={showSnack} onDismiss={_onDismissSnackBar}>
      {errorMsg}
    </Snackbar>
  );

  return (
    <>
      {_snackbar()}
      <Button
        textColor="#fff"
        icon={liked ? 'thumb-up' : 'thumb-up-outline'}
        onPress={liked ? _unlike : _like}
      >
        {likesFormatted}
      </Button>
    </>
  );
};

Like.propTypes = {
  ideaId: PropTypes.number,
  likesArray: PropTypes.array,
};

export default Like;
