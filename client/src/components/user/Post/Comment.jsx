import React from 'react';
import Moment from 'react-moment';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { Dots } from '../../../svg';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { hideComment, showComment } from '../../../apis/post';

function Comment({ comment, post, handleDeleteComment }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [commentState, setCommentState] = React.useState(comment);
  const uploadRef = React.useRef(null);

  const user = useSelector((state) => state.user);

  useClickOutSide(uploadRef, () => {
    setOpenModal(false);
  });

  const handleHideComment = async (commentId, token) => {
    const res = await hideComment(commentId, token);

    const commentUpdateHide = res.comments.filter((comment) => {
      return comment._id === commentState._id;
    });

    setCommentState(commentUpdateHide[0]);
  };

  const handleShowComment = async (commentId, token) => {
    const res = await showComment(commentId, token);

    const commentUpdateHide = res.comments.filter((comment) => {
      return comment._id === commentState._id;
    });

    setCommentState(commentUpdateHide[0]);
  };

  React.useEffect(() => {
    setCommentState(comment);
  }, [comment]);

  return (
    <>
      <div
        className={classnames('comment', {
          comment_hide: commentState.hide,
        })}
      >
        <img
          src={commentState.commentBy.picture}
          alt='commentByPicture'
          className='comment_img'
        />

        <div className='comment_col'>
          <div className='flex'>
            <div className={`'flex flex-column align-items-start'`}>
              <div className='comment_wrap'>
                <div className='comment_name'>
                  {commentState.commentBy.first_name}{' '}
                  {commentState.commentBy.last_name}
                </div>
                <div className='comment_text'>{commentState.comment}</div>
              </div>
              {commentState.images && (
                <LightGallery
                  licenseKey='`0000-0000-000-0000'
                  plugins={[lgZoom]}
                  mode='lg-fade'
                >
                  <img
                    src={commentState.images}
                    alt=''
                    className='comment_image'
                  />
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
                    onClick={() => {
                      commentState.hide
                        ? handleShowComment(
                            commentState._id,
                            user.token,
                            post._id
                          )
                        : handleHideComment(
                            commentState._id,
                            user.token,
                            post._id
                          );
                    }}
                  >
                    {commentState.hide ? 'Hiện bình luận' : 'Ẩn bình luận'}
                  </div>

                  <div
                    className='open_cover_menu_item hover2'
                    onClick={() =>
                      handleDeleteComment(
                        commentState._id,
                        user.token,
                        post._id
                      )
                    }
                  >
                    Xóa bình luận
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
                {commentState.commentAt}
              </Moment>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
