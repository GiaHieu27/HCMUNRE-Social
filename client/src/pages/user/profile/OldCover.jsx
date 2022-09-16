import { useRef } from 'react';
import { useSelector } from 'react-redux';
import useClickOutSide from '../../../hooks/useClickOutSide';
import useBodyScrollLock from '../../../hooks/useBodyScrollLock';

function OldCover({ photos, setCoverPicture, setShow }) {
  const { user } = useSelector((state) => ({ ...state }));
  const selectRef = useRef(null);
  useClickOutSide(selectRef, () => {
    setShow(false);
  });
  useBodyScrollLock();

  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={selectRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Chọn ảnh</span>
        </div>

        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Ảnh gần đây</div>
          <div className="selectCoverBox_link">Albums ảnh</div>
        </div>

        <div className="old_pictures_wrap scrollbar">
          <div className="old_pictures">
            {photos
              .filter((item) => item.folder === `${user.username}/cover`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt="old_cover"
                  key={photo.public_id}
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
          <div className="old_pictures">
            {photos
              .filter(
                (item) => item.folder !== `${user.username}/post_contents`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt="old_cover_avatar"
                  key={photo.public_id}
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldCover;
