import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";

import PostMenu from "./PostMenu";

import {
  createNotify,
  deletePost,
  getReacts,
  reactPost,
} from "../../../apis/post";
import { SocketContext } from "../../../context/socketContext";
import PostHeader from "./PostHeader";
import PostUserContent from "./PostUserContent";
import PostAdminContent from "./PostAdminContent";
import PostFooter from "./PostFooter";
import CustomDialog from "../../CustomDialog";
import { Box, Button } from "@mui/material";

function Post({ post, user, profile, saved, admin }) {
  const { socket } = React.useContext(SocketContext);

  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState([]);
  const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  const [checkUserReact, setCheckUserReact] = useState("");
  const [checkSavedPost, setCheckSavedPost] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

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
        "đã bày tỏ cảm xúc về một bài viết của bạn",
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
        "đã bày tỏ cảm xúc về một bài viết của bạn",
        reactName,
        user.token
      );

      socket.emit("sendNotification", newNotify);
    }
  };

  const onInit = () => {
    if (!document) return;
  };

  useEffect(() => {
    getReactPosts();
  }, [post, getReactPosts]);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const handleDelPost = async () => {
    console.log("run");

    const res = await deletePost(post._id, user.token);
    console.log(res);
    if (res.status === "ok") {
      postRef.current.remove();
      setDialogOpen(false);
    }
  };

  return (
    <div
      className="post"
      style={{ width: `${profile && "100%"}` }}
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
          setDialogOpen={setDialogOpen}
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

      <CustomDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        maxWidth={400}
        title={"Bạn có chắc chắn muốn xóa"}
        actions={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: " center",
            }}
            width="100%"
          >
            <Button
              sx={{
                width: "100px",
                height: "50px",
              }}
              onClick={() => setDialogOpen(false)}
            >
              Hủy
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{
                width: "100px",
                height: "50px",
                marginLeft: "43px",
              }}
              onClick={() => handleDelPost()}
            >
              Xóa
            </Button>
          </Box>
        }
      />
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
