import { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";

function ImageReview({
  text,
  setText,
  user,
  images,
  setImages,
  setShowPrev,
  setError,
}) {
  const imageInputRef = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    // console.log(files);
    files.forEach((img) => {
      // console.log(img);
      if (
        img.type !== "image/png" &&
        img.type !== "image/jpg" &&
        img.type !== "image/gif" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/webp"
      ) {
        setError(`${img.name} định dạng không được hỗ trợ`);
        return;
      } else if (img.size > 1024 * 1024 * 10) {
        setError(`${img.name} kích thước tệp tin quá lớn`);
        files = files.filter((item) => item.name !== img.name);
        // console.log(files);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground text={text} setText={setText} user={user} type2 />

      <div className="add_pics_wrap">
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/jpg,image/webp"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />

        {images && images.length ? (
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
                <i className="addPhoto_icon"></i>
                Thêm hình ảnh/video
              </button>
            </div>
            <div className="small_white_circle" onClick={() => setImages([])}>
              <i className="exit_icon"></i>
            </div>

            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} alt={`img${i}`} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => setShowPrev(false)}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Thêm hình ảnh/video</span>
              <span>hoặc kéo thả vào đây</span>
            </div>
          </div>
        )}

        {/* <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add photos from your device</div>
          <span className="addphone_btn">Add</span>
        </div> */}
      </div>
    </div>
  );
}

export default ImageReview;
