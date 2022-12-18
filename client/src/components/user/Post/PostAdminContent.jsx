import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

import ImgAndVid from './ImgAndVid';

function PostAdminContent({ post, onInit }) {
  return (
    <>
      {post.post.background ? (
        <div
          className='post_bg'
          style={{ backgroundImage: `url(${post.post.background})` }}
        >
          <div className='post_bg_text'>{post.post.text}</div>
        </div>
      ) : post.post.type === null ? (
        <>
          <div
            className={`post_text ${
              (post.post.images && post.post.images.length) ||
              (post.post.videos && post.post.videos.length)
                ? 'mb-2'
                : ''
            }`}
          >
            {post.post.text}
          </div>
          {post.post.images &&
          post.post.images.length &&
          post.post.videos &&
          post.post.videos.length ? (
            <ImgAndVid
              videos={post.post.videos}
              images={post.post.images}
              text={post.post.text}
            />
          ) : post.post.images && post.post.images.length ? (
            <LightGallery
              licenseKey='`0000-0000-000-0000'
              plugins={[lgZoom]}
              mode='lg-fade'
              elementClassNames={
                post.post.images.length === 1
                  ? 'grid_1'
                  : post.post.images.length === 2
                  ? 'grid_2'
                  : post.post.images.length === 3
                  ? 'grid_3'
                  : post.post.images.length === 4
                  ? 'grid_4'
                  : post.post.images.length >= 5 && 'grid_5'
              }
            >
              {post.post.images.slice(0, 5).map((image, i) => (
                // <a key={i} className="gallery-item" data-src={image.url} href>
                <img
                  key={i}
                  src={image.url}
                  className={`img-${i} img-responsive`}
                  alt='post_img'
                />
                // </a>
              ))}
              {post.post.images.length > 5 && (
                <div className='more-pics-shadow'>
                  +{post.post.images.length - 5}
                </div>
              )}
            </LightGallery>
          ) : (
            post.post.videos &&
            post.post.videos.length && (
              <LightGallery
                licenseKey='`0000-0000-000-0000'
                onInit={() => onInit}
                plugins={[lgVideo]}
                mode='lg-fade'
                onHasVideo={(detail) => {
                  console.log(detail);
                }}
                elementClassNames={
                  post.post.videos.length === 1
                    ? 'grid_1'
                    : post.post.videos.length === 2
                    ? 'grid_2'
                    : post.post.videos.length === 3
                    ? 'grid_3'
                    : post.post.videos.length === 4
                    ? 'grid_4'
                    : post.post.videos.length >= 5 && 'grid_5'
                }
              >
                {post.post.videos.slice(0, 5).map((video, i) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    key={i}
                    className={`gallery-item a-${i}`}
                    data-video={`{"source": [{"src": "${video.url}", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true, "controls": true}}`}
                  >
                    <video
                      src={video.url}
                      alt='post_video'
                      key={i}
                      className={`video-${i}`}
                      controls
                    />
                  </a>
                ))}
                {post.post.videos.length > 5 && (
                  <div className='more-pics-shadow'>
                    +{post.post.videos.length - 5}
                  </div>
                )}
              </LightGallery>
            )
          )}
        </>
      ) : post.post.type === 'profilePicture' ? (
        <>
          <div className='post_text'>{post.post.text}</div>
          <div className='post_profile_wrap'>
            <div className='post_updated_bg'>
              <img src={post.post.user.cover} alt='' />
            </div>
            <LightGallery licenseKey='`0000-0000-000-0000' plugins={[lgZoom]}>
              <img
                src={post.post.images[0].url}
                alt='cập nhật ảnh đại diện'
                className='post_updated_picture img-responsive'
              />
            </LightGallery>
          </div>
        </>
      ) : (
        <LightGallery
          elementClassNames='post_cover_wrap'
          plugins={[lgZoom]}
          licenseKey='`0000-0000-000-0000'
        >
          <img
            src={post.post.images[0].url}
            alt=''
            className='img-responsive'
          />
        </LightGallery>
      )}
    </>
  );
}

export default PostAdminContent;
