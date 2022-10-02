import { useRef } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../../context/profileContext';
import Detail from './Detail';
import useClickOutside from '../../../hooks/useClickOutSide';
import useBodyScrollLock from '../../../hooks/useBodyScrollLock';

function EditDetails({ setVisible }) {
  const { details } = useContext(ProfileContext);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setVisible(false));
  useBodyScrollLock();

  return (
    <div className="blur">
      <div className="postBox infosBox" ref={modalRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Chỉnh sửa chi tiết</span>
        </div>

        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Tuỳ chỉnh chi tiết về bạn</span>
            <span>Chi tiết về bạn sẽ được hiển thị công khai</span>
          </div>

          <div className="details_header">Tên khác</div>
          <Detail
            value={details?.otherName}
            img="studies"
            text="tên khác"
            name="otherName"
          />

          <div className="details_header">Công việc</div>
          <Detail value={details?.job} img="job" text="công việc" name="job" />
          <Detail
            value={details?.workplace}
            img="job"
            text="nơi làm việc"
            name="workplace"
          />

          <div className="details_header">Trình độ học vấn</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Thêm trường trung học"
            name="highSchool"
            text="trường học"
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Thêm trường đại học"
            name="college"
            text="trường đại học"
          />

          <div className="details_header">Tỉnh/Thành phố hiện tại</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Thêm Tỉnh/Thành phố hiện tại"
            name="currentCity"
            text="tỉnh/thành phố hiện tại"
          />
          <div className="details_header">Quê hương</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Thêm quê hương"
            name="hometown"
            text="quê hương"
          />
          <div className="details_header">Mối quan hệ</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            name="relationship"
            rel
          />
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
