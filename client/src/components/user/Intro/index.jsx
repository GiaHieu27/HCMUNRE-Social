import { useState, useContext } from 'react';

import Bio from './Bio';
import EditDetails from './EditDetails';
import { ProfileContext } from '../../../context/profileContext';

function Intro({ visitor }) {
  const { details, setShowBio, showBio } = useContext(ProfileContext);

  const [visible, setVisible] = useState(false);

  return (
    <div className="profile_card">
      <div className="profile_card_header">Giới thiệu</div>

      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Chỉnh sửa tiểu sử
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setShowBio(true)}
        >
          Thêm tiểu sử
        </button>
      )}
      {showBio && <Bio placeholder="Add bio" name="bio" />}
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Nghề nghiệp {details?.job} tại {details?.workplace}
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Nghề nghiệp {details?.job}
        </div>
      ) : (
        !details?.job &&
        details?.workplace && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            Làm việc tại {details?.workplace}
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Đã học tại {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Đã học tại {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Sống tại {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/from.png" alt="" />
          Đến từ {details?.hometown}
        </div>
      )}

      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setVisible(true)}
        >
          Chỉnh sửa chi tiết
        </button>
      )}
      {visible && !visitor && <EditDetails setVisible={setVisible} />}
    </div>
  );
}

export default Intro;
