import PropTypes from "prop-types";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

function ItemSaved({ item }) {
  console.log(item);
  return (
    <div className="createPost saved-card">
      <img src={item.post.images[0].url} alt="saved" />

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
          <img src={item.postBy.picture} alt="avatar" />

          <p>
            Đã lưu từ{" "}
            <Link to={`/profile/${item.postBy.username}`}>
              bài viết của {item.postBy.first_name} {item.postBy.last_name}
            </Link>
          </p>
        </div>

        <button className="green_btn saved-card_btn hover1" type="button">
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
