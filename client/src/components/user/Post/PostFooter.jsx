import { deleteComment } from '../../../apis/post';
import Comment from './Comment';
import CreateComments from './CreateComments';
import ReactsPopup from './ReactsPopup';

function PostFooter({
  reacts,
  total,
  comments,
  visible,
  setVisible,
  handleReact,
  checkUserReact,
  user,
  post,
  setComments,
  setCount,
  saved,
  count,
  showMore,
}) {
  const handleDeleteComment = async (commentId, token, postId) => {
    const res = await deleteComment(commentId, token, postId);
    if (res.status) {
      const remainComment = comments.filter((comment) => {
        return comment._id !== commentId;
      });

      setComments(remainComment);
    }
  };

  return (
    <>
      <div className='post_infos'>
        <div className='reacts_count'>
          <div className='reacts_count_imgs'>
            {reacts &&
              reacts
                .sort((a, b) => b.count - a.count)
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        key={i}
                        alt='cảm xúc'
                      />
                    )
                )}
          </div>
          <div className='reacts_count_num'>{total ? total : ''}</div>
        </div>
        <div className='to_right'>
          <div className='comments_count'>
            {comments.length > 0 ? `${comments.length} bình luận` : ''}
          </div>
        </div>
      </div>

      <div className='post_actions'>
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          handleReact={handleReact}
        />
        <div
          className='post_action hover1'
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => handleReact(checkUserReact ? checkUserReact : 'Thích')}
        >
          {checkUserReact ? (
            <img
              src={`../../../reacts/${checkUserReact}.svg`}
              alt='react_icon'
              className='small_react'
              width='20'
            />
          ) : (
            <i className='like_icon'></i>
          )}
          <span
            style={{
              color: `${
                checkUserReact === 'like'
                  ? '#4267b2'
                  : checkUserReact === 'love'
                  ? '#f63459'
                  : checkUserReact === 'haha'
                  ? '#f7b125'
                  : checkUserReact === 'sad'
                  ? '#f7b152'
                  : checkUserReact === 'wow'
                  ? '#f7b152'
                  : checkUserReact === 'angry'
                  ? 'rgb(233, 113, 15)'
                  : '#65676b'
              }`,
            }}
          >
            {checkUserReact === 'love'
              ? 'Yêu thích'
              : checkUserReact === 'haha'
              ? 'Haha'
              : checkUserReact === 'sad'
              ? 'Buồn'
              : checkUserReact === 'wow'
              ? 'Wow'
              : checkUserReact === 'angry'
              ? 'Phẫn nộ'
              : 'Thích'}
          </span>
        </div>
        <div className='post_action hover1'>
          <i className='comment_icon'></i>
          <span>Bình luận</span>
        </div>
        <div className='post_action hover1'>
          <i className='share_icon'></i>
          <span>Chia sẻ</span>
        </div>
      </div>

      <div className='comments_wrap'>
        <div className='comments_order'></div>
        <CreateComments
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          [...comments]
            .sort((a, b) => new Date(b.commentAt) - new Date(a.commentAt))
            .slice(0, saved ? comments.length : count)
            .map((comment, i) => {
              return (
                <Comment
                  comment={comment}
                  post={post}
                  handleDeleteComment={handleDeleteComment}
                  key={i}
                />
              );
            })}
        {count < comments.length && !saved && (
          <div className='view_comments' onClick={() => showMore()}>
            Xem thêm bình luận
          </div>
        )}
      </div>
    </>
  );
}

export default PostFooter;
