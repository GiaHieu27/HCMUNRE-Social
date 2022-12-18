import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Dots, Public } from '../../../svg';

function PostHeader({ post, admin, setShowMenu }) {
  return (
    <div className='post_header'>
      <Link
        to={admin ? '' : `/profile/${post.user.username}`}
        className='post_header_left'
      >
        {!admin && <img src={post.user.picture} alt='' />}
        <div className='header_col'>
          <div className='post_profile_name'>
            {!admin && `${post.user.first_name} ${post.user.last_name}`}
            <div className='updated_p'>
              {!admin &&
                post.type === 'profilePicture' &&
                `${
                  post.user.gender === 'male'
                    ? 'đã cập ảnh đại diện của anh ấy'
                    : post.user.gender === 'female'
                    ? 'đã cập ảnh đại diện của cô ấy'
                    : 'đã cập ảnh đại diện'
                }`}
              {!admin &&
                post.type === 'cover' &&
                ` ${
                  post.user.gender === 'male'
                    ? 'đã cập ảnh bìa của anh ấy'
                    : post.user.gender === 'female'
                    ? 'đã cập ảnh bìa của cô ấy'
                    : 'đã cập ảnh bìa'
                }`}
            </div>
          </div>
          {!admin && (
            <div className='post_profile_privacy_date'>
              <Moment fromNow interval={30}>
                {!admin ? post.createdAt : post.post.createdAt}
              </Moment>
              <Public color='gray' />
            </div>
          )}
        </div>
      </Link>
      {!admin && (
        <div>
          <div
            className='post_header_right hover1'
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Dots color='gray' />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostHeader;
