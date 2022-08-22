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
    savePost(props.postId, props.user.token);
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
      <MenuItem icon="pin_icon" title="Pin Post" />

      <div onClick={handleSavePost}>
        {props.checkSavedPost ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this to your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>

      {compare && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!compare && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {props.imageLenght && (
        <div onClick={() => handleDownloadImg()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {props.imageLenght && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {compare && (
        <MenuItem img="../../../icons/lock.png" title="Edit audience" />
      )}
      {compare && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {compare && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {compare && <MenuItem icon="date_icon" title="Edit Date" />}
      {compare && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {compare && <MenuItem icon="archive_icon" title="Move to archive" />}
      {compare && (
        <div onClick={() => handleDelPost()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!compare && <div className="line"></div>}
      {!compare && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}

export default PostMenu;
