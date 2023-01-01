import React from 'react';
import Moment from 'react-moment';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import { useSelector } from 'react-redux';

import { Dots } from '../../../svg';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { hideComment } from '../../../apis/post';

function Comment({ comment, post }) {
  const [openModal, setOpenModal] = React.useState(false);
  const uploadRef = React.useRef(null);

  const user = useSelector((state) => state.user);

  useClickOutSide(uploadRef, () => {
    setOpenModal(false);
  });

  const handleHideComment = (commentId, token, postId) => {
    const res = hideComment(commentId, token, postId);
  };

  console.log(post);

  return (
    <>
      <div className='comment'>
        <img
          src={comment.commentBy.picture}
          alt='commentByPicture'
          className='comment_img'
        />

        <div className='comment_col'>
          <div className='flex'>
            <div className={`'flex flex-column align-items-start'`}>
              <div className='comment_wrap'>
                <div className='comment_name'>
                  {comment.commentBy.first_name} {comment.commentBy.last_name}
                </div>
                <div className='comment_text'>{comment.comment}</div>
              </div>
              {comment.images && (
                <LightGallery
                  licenseKey='`0000-0000-000-0000'
                  plugins={[lgZoom]}
                  mode='lg-fade'
                >
                  <img src={comment.images} alt='' className='comment_image' />
                </LightGallery>
              )}
            </div>
            <div className='relative'>
              <div className='comment_dot' onClick={() => setOpenModal(true)}>
                <Dots color='gray' />
              </div>
              {openModal && (
                <div className='open_cover_menu comment_popup' ref={uploadRef}>
                  <div
                    className='open_cover_menu_item hover2'
                    onClick={() =>
                      handleHideComment(comment, user.token, post._id)
                    }
                  >
                    Ẩn bình luận
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='comment_actions'>
            <span>Thích</span>
            <span>Trả lời</span>
            <span>
              <Moment fromNow interval={30}>
                {comment.commentAt}
              </Moment>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
