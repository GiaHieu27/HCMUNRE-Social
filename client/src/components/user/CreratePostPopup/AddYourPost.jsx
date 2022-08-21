import { Photo } from "../../../svg";

function AddYourPost(props) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Thêm vào bài viết</div>
      <div className="d-flex flex-row ">
        <div
          className="post_header_right hover1 "
          onClick={() => {
            props.setShowPrev(!props.showPrev);
          }}
        >
          <Photo color="#45bd62" />
        </div>

        <div className="post_header_right">
          <img
            src="../../../icons/colorful.png"
            alt=""
            width={35}
            onClick={() => props.setShowBg(!props.showBg)}
          />
        </div>
        <div className="post_header_right">
          <i
            className={`emoji_icon_large`}
            onClick={() => {
              props.setPicker(!props.picker);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default AddYourPost;
