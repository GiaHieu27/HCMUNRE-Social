import React from 'react';
import Moment from 'react-moment';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';

function Comment({ comment }) {
  return (
    <div className="comment">
      <img
        src={comment.commentBy.picture}
        alt="commentByPicture"
        className="comment_img"
      />
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </div>
          <div className="comment_text">{comment.comment}</div>
        </div>
        {comment.images && (
          <LightGallery
            licenseKey="`0000-0000-000-0000"
            plugins={[lgZoom]}
            mode="lg-fade"
          >
            <img src={comment.images} alt="" className="comment_image" />
          </LightGallery>
        )}
        <div className="comment_actions">
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
  );
}

export default Comment;
