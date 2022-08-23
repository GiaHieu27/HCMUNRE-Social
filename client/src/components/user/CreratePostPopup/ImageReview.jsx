import { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";

function ImageReview(props) {
  const imageInputRef = useRef(null);
  const drapRef = useRef(null);

  const onDragEnter = () => drapRef.current.classList.add("dragover");
  const onDragLeave = () => drapRef.current.classList.remove("dragover");
  const onDrop = () => drapRef.current.classList.remove("dragover");

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif" &&
        file.type !== "video/mp4"
      ) {
        props.setError(`${file.name} loại tệp tin không phù hợp`);
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.type === "video/mp4" && file.size > 1024 * 1024 * 70) {
        props.setError(
          `${file.name} có kích thước video quá lớn, hãy chọn những video dưới 20MB`
        );
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/webp" ||
          file.type === "image/gif") &&
        file.size > 1024 * 1024 * 9
      ) {
        props.setError(
          `${file.name} có kích thước hình ảnh quá lớn, hãy chọn những hình ảnh dưới 10MB`
        );
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        if (file.type === "video/mp4") {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (readerEvent) => {
            props.setVideos((videos) => [...videos, readerEvent.target.result]);
          };
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (readerEvent) => {
            props.setImages((images) => [...images, readerEvent.target.result]);
          };
        }
      }
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground
        text={props.text}
        setText={props.setText}
        user={props.user}
        picker={props.picker}
        setPicker={props.setPicker}
        type2
      />

      <div className="add_pics_wrap">
        {(props.images && props.images.length) ||
        (props.videos && props.videos.length) ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Chỉnh sửa
              </button>

              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/jpg,image/webp,video/mp4"
                  multiple
                  hidden
                  ref={imageInputRef}
                  onChange={handleImages}
                />
                <i className="addPhoto_icon"></i>
                Thêm hình ảnh/video
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                props.setImages([]);
                props.setVideos([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>

            <div
              className={
                props.images.length === 1 && props.videos.length === 1
                  ? "preview2"
                  : (props.images.length === 2 && props.videos.length === 1) ||
                    (props.images.length === 1 && props.videos.length === 2)
                  ? "preview3"
                  : (props.images.length === 3 && props.videos.length === 1) ||
                    (props.images.length === 1 && props.videos.length === 3)
                  ? "preview4"
                  : (props.images.length === 4 && props.videos.length === 1) ||
                    (props.images.length === 1 && props.videos.length === 4)
                  ? "preview5"
                  : (props.images.length === 5 && props.videos.length === 1) ||
                    (props.images.length === 1 && props.videos.length === 5)
                  ? "preview6"
                  : props.images.length === 1 || props.videos.length === 1
                  ? "preview1"
                  : props.images.length === 2 || props.videos.length === 2
                  ? "preview2"
                  : props.images.length === 3 || props.videos.length === 3
                  ? "preview3"
                  : props.images.length === 4 || props.videos.length === 4
                  ? "preview4 "
                  : props.images.length === 5 || props.videos.length === 5
                  ? "preview5"
                  : props.images.length % 2 === 0 ||
                    props.videos.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {props.images.map((img, i) => (
                <img src={img} alt={`img${i}`} key={i} />
              ))}
              {props.videos.map((vid, i) => (
                <video src={vid} key={i}></video>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="add_pics_inside1 hover2"
            ref={drapRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div
              className="small_white_circle"
              onClick={() => props.setShowPrev(false)}
            >
              <i className="exit_icon"></i>
            </div>
            <div className="add_col">
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/jpg,image/webp,video/mp4"
                multiple
                // hidden
                ref={imageInputRef}
                onChange={handleImages}
              />
              <span>Thêm hình ảnh/video</span>
              <span>hoặc kéo thả vào đây</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageReview;
