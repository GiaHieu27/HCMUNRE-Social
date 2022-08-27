import { useRef, useState } from "react";
import { saveAs } from "file-saver";
import MenuItem from "./MenuItem";
import useClickOutside from "../../../hooks/useClickOutSide";
import { deletePost, savePost } from "../../../functions/post";

function PostMenu(props) {
  const [compare] = useState(props.user.id === props.postUserId ? true : false);

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    props.setShowMenu(false);
  });

  const handleSavePost = async () => {
    savePost(props.postId, props.postUserId, props.user.token);
    if (props.checkSavedPost) props.setCheckSavedPost(false);
    else props.setCheckSavedPost(true);
  };

  const handleDownloadImg = async () => {
    props.images.map((image) => saveAs(image.url, "image.jpg"));
  };

  const handleDelPost = async () => {
    const res = await deletePost(props.postId, props.user.token);
    if (res.status === "ok") {
      props.postRef.current.remove();
      // postRef.current.style.display = "none";
    }
  };

  return (
    <ul className="post_menu" ref={menuRef}>
      <div onClick={handleSavePost}>
        {props.checkSavedPost ? (
          <MenuItem
            icon="remove_saved_icon"
            title="Huỷ lưu bài viết"
            subtitle="Xoá khỏi danh sách đã lưu"
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Lưu bài viết"
            subtitle="Thêm vào danh sách đã lưu"
          />
        )}
      </div>
      <div className="line"></div>

      {props.imageLenght && (
        <div onClick={() => handleDownloadImg()}>
          <MenuItem icon="download_icon" title="Tải xuống" />
        </div>
      )}
      {props.imageLenght && (
        <MenuItem icon="fullscreen_icon" title="Xem ảnh toàn màn hình" />
      )}

      {compare && (
        <div onClick={() => handleDelPost()}>
          <MenuItem
            icon="trash_icon"
            title="Chuyển vào thùng rác"
            subtitle="Các mục trong thùng rác sẽ bị xoá sau 30 ngày"
          />
        </div>
      )}
    </ul>
  );
}

export default PostMenu;
