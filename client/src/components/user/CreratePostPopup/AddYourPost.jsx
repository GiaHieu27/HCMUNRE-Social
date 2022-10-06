import PropTypes from 'prop-types';
import { Photo } from '../../../svg';
import TooltipBs from '../TooltipBs';
function AddYourPost(props) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Thêm vào bài viết</div>
      <div className="d-flex flex-row ">
        <div
          className="post_header_right hover1"
          style={{
            cursor: `${props.background ? 'not-allowed' : 'pointer'}`,
          }}
          onClick={() => {
            if (!props.background) {
              props.setShowBg(false);
              props.setShowPrev(!props.showPrev);
            }
          }}
        >
          <TooltipBs title="Hình ảnh/video">
            <Photo color={`${props.background ? '#b0b3b8' : '#20a305'}`} />
          </TooltipBs>
        </div>

        <div
          className="post_header_right"
          style={{
            cursor: `${
              (props.images && props.images.length) ||
              (props.videos && props.videos.length)
                ? 'not-allowed'
                : 'pointer'
            }`,
          }}
        >
          <TooltipBs title="Hình nền">
            <img
              src="/icons/colorful.png"
              alt="pick-background-color"
              width={24}
              onClick={() => {
                if (!props.images.length && !props.videos.length) {
                  props.setShowBg(!props.showBg);
                }
              }}
            />
          </TooltipBs>
        </div>
        <div className="post_header_right">
          <TooltipBs title={'Biểu tượng cảm xúc'}>
            <i
              className={`emoji_icon_large`}
              onClick={() => {
                props.setPicker(!props.picker);
              }}
            ></i>
          </TooltipBs>
        </div>
      </div>
    </div>
  );
}

AddYourPost.propTypes = {
  background: PropTypes.string,

  showBg: PropTypes.bool,
  picker: PropTypes.bool,
  showPrev: PropTypes.bool,

  setShowBg: PropTypes.func,
  setShowPrev: PropTypes.func,
  setPicker: PropTypes.func,

  images: PropTypes.array,
  videos: PropTypes.array,
};

export default AddYourPost;
