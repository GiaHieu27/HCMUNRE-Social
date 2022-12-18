import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import PostMenu from './PostMenu';

import { createNotify, getReacts, reactPost } from '../../../apis/post';
import { SocketContext } from '../../../context/socketContext';
import PostHeader from './PostHeader';
import PostUserContent from './PostUserContent';
import PostAdminContent from './PostAdminContent';
import PostFooter from './PostFooter';

function Post({ post, user, profile, saved, admin }) {
  const { socket } = React.useContext(SocketContext);

  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState([]);
  const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  const [checkUserReact, setCheckUserReact] = useState('');
  const [checkSavedPost, setCheckSavedPost] = useState();

  const postRef = useRef(null);

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  const getReactPosts = useCallback(async () => {
    const res = await getReacts(post._id, user.token);
    setReacts(res.reacts);
    setCheckUserReact(res.checkUserReact);
    setTotal(res.total);
    setCheckSavedPost(res.checkPostSaved);
  }, [post._id, user.token]);

  const handleReact = async (reactName) => {
    reactPost(post._id, reactName, user.token);
    if (checkUserReact === reactName) {
      setCheckUserReact();
      let index = reacts.findIndex((x) => x.react === checkUserReact);

      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }

      await createNotify(
        post._id,
        post.user._id,
        'đã bày tỏ cảm xúc về một bài viết của bạn',
        reactName,
        user.token
      );
    } else {
      setCheckUserReact(reactName);
      // tim react giong react name de cong len
      let index = reacts.findIndex((x) => x.react === reactName);
      // tim react giong react trc do de tru di
      let index1 = reacts.findIndex((x) => x.react === checkUserReact);

      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }

      const newNotify = await createNotify(
        post._id,
        post.user._id,
        'đã bày tỏ cảm xúc về một bài viết của bạn',
        reactName,
        user.token
      );

      socket.emit('sendNotification', newNotify);
    }
  };

  // console.log(post);

  const onInit = () => {
    if (!document) return;
  };

  useEffect(() => {
    getReactPosts();
  }, [post, getReactPosts]);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  return (
    <div
      className='post'
      style={{ width: `${profile && '100%'}` }}
      ref={postRef}
    >
      <PostHeader post={post} admin={admin} setShowMenu={setShowMenu} />

      {showMenu && !admin && (
        <PostMenu
          user={user}
          postUserId={post.user._id}
          postId={post._id}
          imageLength={post?.images?.length}
          images={post.images}
          setShowMenu={setShowMenu}
          setCheckSavedPost={setCheckSavedPost}
          checkSavedPost={checkSavedPost}
          postRef={postRef}
        />
      )}

      {!admin && <PostUserContent post={post} onInit={onInit} />}

      {admin && <PostAdminContent post={post} onInit={onInit} />}

      {!admin && (
        <PostFooter
          reacts={reacts}
          total={total}
          comments={comments}
          visible={visible}
          setVisible={setVisible}
          handleReact={handleReact}
          checkUserReact={checkUserReact}
          user={user}
          post={post}
          setComments={setComments}
          setCount={setCount}
          saved={saved}
          count={count}
          showMore={showMore}
        />
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  saved: PropTypes.any,
  profile: PropTypes.any,
  admin: PropTypes.any,
};

export default Post;
