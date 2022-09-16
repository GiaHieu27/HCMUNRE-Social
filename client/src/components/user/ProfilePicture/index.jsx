import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateProfileImage from './UpdateProfileImage';

import useClickOutSide from '../../../hooks/useClickOutSide';
import useBodyScrollLock from '../../../hooks/useBodyScrollLock';

function ProfilePicture({ setShow, pRef, photos }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  useBodyScrollLock();
  useClickOutSide(popupRef, () => {
    setShow(false);
  });

  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/png' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} đinh dạng không được hỗ trợ`);
      return;
    } else if (file.size > 1024 * 1024 * 10) {
      setError(`${file.name} dung lượng quá lớn`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={inputRef}
        onChange={handleChangeImage}
        accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
        hidden
      />
      <div className="postBox pictureBox" ref={popupRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Cập nhật ảnh đại diện</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_green_btn"
              onClick={() => inputRef.current.click()}
            >
              <i className="plus_icon filter_green"></i>
              Tải ảnh lên
            </button>
          </div>
        </div>

        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="green_btn" onClick={() => setError('')}>
              Thử lại
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4 className="fs-6">Ảnh đại diện bạn đã dùng</h4>
          <div className="old_pictures">
            {photos
              .filter((item) => item.folder === `${user.username}/avatar`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4 className="fs-6">Hình ảnh khác</h4>
          <div className="old_pictures">
            {photos
              .filter((item) => item.folder !== `${user.username}/avatar`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
        {image && (
          <UpdateProfileImage
            image={image}
            setImage={setImage}
            setError={setError}
            setShow={setShow}
            pRef={pRef}
          />
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;
