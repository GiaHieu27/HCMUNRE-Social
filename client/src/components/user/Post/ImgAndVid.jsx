function ImgAndVid({ videos, images, text }) {
  const media = [...videos, ...images];

  return (
    <>
      <div
        className={
          images.length === 1 && videos.length === 1
            ? "grid_2"
            : (images.length === 2 && videos.length === 1) ||
              (images.length === 1 && videos.length === 2)
            ? "grid_3"
            : (images.length === 3 && videos.length === 1) ||
              (images.length === 1 && videos.length === 3) ||
              (images.length === 2 && videos.length === 2)
            ? "grid_4"
            : (images.length === 4 && videos.length === 1) ||
              (images.length === 1 && videos.length === 4) ||
              (images.length === 4 && videos.length === 2) ||
              (images.length === 2 && videos.length === 4) ||
              (images.length === 3 && videos.length === 2) ||
              (images.length === 2 && videos.length === 3)
            ? "grid_5"
            : (images.length >= 5 || videos.length >= 5) && "grid_5"
        }
      >
        {media.length > 5 ? (
          <>
            {media.slice(0, 5).map((item, i) => (
              <>
                {item.type === "video" ? (
                  <video
                    key={i}
                    src={item.url}
                    alt="post_video"
                    className={`video-${i}`}
                    controls
                  />
                ) : (
                  <img
                    key={i}
                    src={item.url}
                    alt="post_img"
                    className={`img-${i} ${
                      videos.length === 1 && images.length === 4
                        ? "img4-1"
                        : videos.length === 1 && images.length === 3
                        ? "img3-1"
                        : videos.length === 1
                        ? "img2-1"
                        : videos.length === 2 && images.length === 1
                        ? "img1-2"
                        : videos.length === 2 && images.length === 2
                        ? "img2-2"
                        : videos.length === 3 && images.length === 1
                        ? "img1-3"
                        : videos.length === 4 && images.length === 1
                        ? "img1-4"
                        : videos.length === 2 && images.length === 3
                        ? "img3-2"
                        : videos.length === 3 && images.length === 2
                        ? "img2-3"
                        : ""
                    }`}
                  />
                )}
              </>
            ))}
          </>
        ) : (
          <>
            {videos.slice(0, 5).map((video, i) => (
              <video
                key={i}
                src={video.url}
                alt="post_video"
                className={`video-${i}`}
                controls
              />
            ))}
            {images.slice(0, 5).map((image, i) => (
              <img
                key={i}
                src={image.url}
                alt="post_img"
                className={`img-${i} ${
                  videos.length === 1 && images.length === 4
                    ? "img4-1"
                    : videos.length === 1 && images.length === 3
                    ? "img3-1"
                    : videos.length === 1
                    ? "img2-1"
                    : videos.length === 2 && images.length === 1
                    ? "img1-2"
                    : videos.length === 2 && images.length === 2
                    ? "img2-2"
                    : videos.length === 3 && images.length === 1
                    ? "img1-3"
                    : videos.length === 4 && images.length === 1
                    ? "img1-4"
                    : videos.length === 2 && images.length === 3
                    ? "img3-2"
                    : videos.length === 3 && images.length === 2
                    ? "img2-3"
                    : ""
                }`}
              />
            ))}
          </>
        )}

        {media.length > 5 && (
          <div className="more-pics-shadow">+{media.length - 5}</div>
        )}
      </div>
    </>
  );
}

export default ImgAndVid;
