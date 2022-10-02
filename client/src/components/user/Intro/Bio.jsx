import { useContext } from 'react';
import { ProfileContext } from '../../../context/profileContext';

function Bio({ placeholder, name, detail, setShow, rel }) {
  const { infos, handleChange, max, setShowBio, updateDetails } =
    useContext(ProfileContext);

  return (
    <div className="add_bio_wrap">
      {rel ? (
        <select
          name={name}
          value={infos.relationship}
          onChange={handleChange}
          className="select_rel"
        >
          <option value="Độc thân">Độc thân</option>
          <option value="Trong một mối quan hệ">Trong một mối quan hệ</option>
          <option value="Đã kết hôn">Đã kết hôn</option>
          <option value="Đã ly dị">Đã ly dị</option>
        </select>
      ) : (
        <textarea
          name={name}
          placeholder={placeholder}
          value={infos?.[name]}
          maxLength={100}
          className="textarea_green details_input"
          onChange={handleChange}
        ></textarea>
      )}

      {!detail && <div className="remaining">còn {max} ký tự</div>}
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>
        </div>
        <div className="flex flex_right">
          <button
            className="gray_btn"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Huỷ
          </button>
          <button
            className="green_btn"
            onClick={() => {
              updateDetails();
              setShow(false);
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bio;
