import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import PropTypes from "prop-types";

import { savePost } from "../../../functions/post";

function ItemSaved({ item }) {
  const user = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState({});

  const { post, postBy } = savedPosts;
  const postRef = useRef(null);

  useEffect(() => {
    setSavedPosts(item);
  }, [item]);

  const handleUnSavedPost = async () => {
    const result = await savePost(post._id, postBy._id, user.token);
    if (result.status === "ok") postRef.current.remove();
  };

  return (
    <div className="createPost saved-card mt-3" ref={postRef}>
      {post?.images && post?.images.length ? (
        <img src={post?.images[0].url} alt="saved" />
      ) : post?.videos && post?.videos.length ? (
        <video src={post?.videos[0].url}></video>
      ) : (
        <img src={postBy?.picture} alt="saved" />
      )}

      <div className="saved-card_content">
        <div className="saved-card_header">
          <div className="saved-card_title">
            {post?.text
              ? post.text
              : post?.images && post?.images.length
              ? post?.images.length + " ảnh"
              : post?.videos.length + " video"}
          </div>
          <div className="saved-card_subtitle">
            <span>Bài viết</span>
            <BsDot />
            <span>Đã lưu vào để xem sau</span>
          </div>
        </div>

        <div className="saved-card_source">
          <img src={postBy?.picture} alt="avatar" />

          <p>
            Đã lưu từ{" "}
            <Link to={`/${postBy?.username}/posts/${post?._id}`}>
              bài viết của {postBy?.first_name} {postBy?.last_name}
            </Link>
          </p>
        </div>

        <button
          className="green_btn saved-card_btn hover1"
          type="button"
          onClick={() => handleUnSavedPost()}
        >
          <i className="remove_saved_icon"></i>
          Bỏ lưu
        </button>
      </div>
    </div>
  );
}

ItemSaved.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemSaved;
