import { useRef, useState } from "react";
import { saveAs } from "file-saver";
import MenuItem from "./MenuItem";
import useClickOutside from "../../../hooks/useClickOutSide";
import { deletePost, savePost } from "../../../apis/post";
import CustomDialog from "../../CustomDialog";
import { Box, Button } from "@mui/material";

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

  return (
    <>
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

        {props.imageLength && (
          <div onClick={() => handleDownloadImg()}>
            <MenuItem icon="download_icon" title="Tải xuống" />
          </div>
        )}
        {props.imageLength && (
          <MenuItem icon="fullscreen_icon" title="Xem ảnh toàn màn hình" />
        )}

        {compare && (
          <div onClick={() => props.setDialogOpen(true)}>
            <MenuItem icon="trash_icon" title="Xóa bài viết" />
          </div>
        )}
      </ul>
    </>
  );
}

export default PostMenu;
