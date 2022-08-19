import { Photo } from "../../../svg";

function AddYourPost({ setShowPrev, showBg, setShowBg, picker, setPicker }) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Thêm vào bài viết</div>
      <div className="d-flex flex-row ">
        <div
          className="post_header_right hover1 "
          onClick={() => {
            setShowPrev(true);
          }}
        >
          <Photo color="#45bd62" />
        </div>

        <div className="post_header_right">
          <img
            src="../../../icons/colorful.png"
            alt=""
            width={35}
            onClick={() => setShowBg(!showBg)}
          />
        </div>
        <div className="post_header_right">
          <i
            className={`emoji_icon_large moveleft`}
            onClick={() => {
              setPicker(!picker);
            }}
          ></i>
        </div>
      </div>
      {/* <div className="post_header_right hover1">
        <Feeling color="#f7b928" />
      </div>
      <div className="post_header_right hover1">
        <i className="maps_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <i className="microphone_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <Dots color="#65676b" />
      </div> */}
    </div>
  );
}

export default AddYourPost;
