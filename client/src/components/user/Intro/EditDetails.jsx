import { useRef } from "react";
import { useContext } from "react";
import { ProfileContext } from "../../../profileContext/Context";
import Detail from "./Detail";
import useClickOutside from "../../../hooks/useClickOutSide";

function EditDetails({ setVisible }) {
  const { details } = useContext(ProfileContext);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setVisible(false));

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
            text="other name"
            name="otherName"
          />

          <div className="details_header">Công việc</div>
          <Detail value={details?.job} img="job" text="job" name="job" />
          <Detail
            value={details?.workplace}
            img="job"
            text="workplace"
            name="workplace"
          />

          <div className="details_header">Trình độ học vấn</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            text="a high school"
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            text="college"
          />

          <div className="details_header">Tỉnh/Thành phố hiện tại</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Thêm Tỉnh/Thành phố hiện tại"
            name="currentCity"
            text="a current city"
          />
          <div className="details_header">Quê hương</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Thêm quê hương"
            name="hometown"
            text="hometown"
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
