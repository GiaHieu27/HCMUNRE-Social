import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { savePost } from "../../../functions/post";

function ItemSaved({ item }) {
  const user = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState({});

  const { post, postBy } = savedPosts;

  useEffect(() => {
    setSavedPosts(item);
  }, [item]);

  const handleUnSavedPost = () => {
    savePost(item.post._id, item.postBy._id, user.token);
  };

  return (
    <div className="createPost saved-card mt-3">
      <img src={post.images[0].url} alt="saved" />

      <div className="saved-card_content">
        <div className="saved-card_header">
          <div className="saved-card_title">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
            voluptates sapiente sit qui sequi. Voluptates,
          </div>
          <div className="saved-card_subtitle">
            <span>Bài viết</span>
            <BsDot />
            <span>Đã lưu vào để xem sau</span>
          </div>
        </div>

        <div className="saved-card_source">
          <img src={postBy.picture} alt="avatar" />

          <p>
            Đã lưu từ{" "}
            <Link to={`/profile/${postBy.username}`}>
              bài viết của {postBy.first_name} {postBy.last_name}
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
