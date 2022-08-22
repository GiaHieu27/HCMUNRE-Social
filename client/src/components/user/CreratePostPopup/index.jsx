import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import EmojiPickerBackground from "./EmojiPickerBackground";
import ImageReview from "./ImageReview";
import AddYourPost from "./AddYourPost";
import useClickOutSide from "../../../hooks/useClickOutSide";
import PostError from "./PostError";
import dataURLtoBlob from "../../../helpers/dataURLtoBlob";
import uploadImages from "../../../functions/uploadImages";
import profileSlice from "../../../redux/slices/profileSlice";
import { createPost } from "../../../functions/post";

function CreratePostPopup({ user, setVisible, posts, dispatch, profile }) {
  const dispatchh = useDispatch();

  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [picker, setPicker] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [text, setText] = useState("");
  const [background, setBackground] = useState("");
  const [error, setError] = useState("");

  // console.log(videos);
  // console.log(images);

  const postRef = useRef(null);
  useClickOutSide(postRef, () => {
    setVisible(false);
  });

  const handleSubmitPost = async () => {
    if (background) {
      setLoading(true);
      const res = await createPost(
        null,
        background,
        text,
        null,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (res.status === "ok") {
        if (profile) {
          dispatchh(profileSlice.actions.PROFILE_POSTS([res.data, ...posts]));
        } else {
          dispatch({
            type: "POST_SUCCESS",
            payload: [res.data, ...posts],
          });
        }
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (images && images.length) {
      setLoading(true);

      const postImage = images.map((image) => {
        return dataURLtoBlob(image);
      });
      // console.log(postImage);
      const path = `${user.username}/post_contents`;

      let formData = new FormData();
      formData.append("path", path);
      postImage.forEach((image) => {
        formData.append("files", image);
      });

      const response = await uploadImages(formData, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response.images,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (res.status === "ok") {
        if (profile) {
          dispatchh(profileSlice.actions.PROFILE_POSTS([res.data, ...posts]));
        } else {
          dispatch({
            type: "POST_SUCCESS",
            payload: [res.data, ...posts],
          });
        }
        setText("");
        setImages([]);
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (videos && videos.length) {
      setLoading(true);

      const postVideo = videos.map((image) => {
        return dataURLtoBlob(image);
      });
      console.log(postVideo);
      const path = `${user.username}/post_contents`;

      let formData = new FormData();
      formData.append("path", path);
      postVideo.forEach((image) => {
        formData.append("files", image);
      });

      const response = await uploadImages(formData, user.token);
      console.log(response);
      const res = await createPost(
        null,
        null,
        text,
        null,
        response.videos,
        user.id,
        user.token
      );
      setLoading(false);

      if (res.status === "ok") {
        if (profile) {
          dispatchh(profileSlice.actions.PROFILE_POSTS([res.data, ...posts]));
        } else {
          dispatch({
            type: "POST_SUCCESS",
            payload: [res.data, ...posts],
          });
        }
        setText("");
        setImages([]);
        setVisible(false);
      } else {
        setError(res);
      }
    } else if ((images && images.length) || (videos && videos.length)) {
      setLoading(true);

      const postImage = images.map((image) => {
        return dataURLtoBlob(image);
      });
      // console.log(postImage);
      const path = `${user.username}/post_contents`;

      let formData = new FormData();
      formData.append("path", path);
      postImage.forEach((image) => {
        formData.append("files", image);
      });

      const response = await uploadImages(formData, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.status === "ok") {
        if (profile) {
          dispatchh(profileSlice.actions.PROFILE_POSTS([res.data, ...posts]));
        } else {
          dispatch({
            type: "POST_SUCCESS",
            payload: [res.data, ...posts],
          });
        }
        setText("");
        setImages([]);
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const res = await createPost(
        null,
        null,
        text,
        null,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (res.status === "ok") {
        if (profile) {
          dispatchh(profileSlice.actions.PROFILE_POSTS([res.data, ...posts]));
        } else {
          dispatch({
            type: "POST_SUCCESS",
            payload: [res.data, ...posts],
          });
        }
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(res);
      }
    } else {
      setError("Bạn chưa nhập gì cả");
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={postRef}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Tạo bài viết</span>
        </div>

        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="/icons/public.png" alt="" />
              <span>Công khai</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <EmojiPickerBackground
            user={user}
            text={text}
            setText={setText}
            setBackground={setBackground}
            background={background}
            showBg={showBg}
            setShowBg={setShowBg}
            picker={picker}
            setPicker={setPicker}
          />
        ) : (
          <ImageReview
            user={user}
            text={text}
            setText={setText}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
            picker={picker}
            setPicker={setPicker}
            videos={videos}
            setVideos={setVideos}
          />
        )}
        <AddYourPost
          setShowPrev={setShowPrev}
          showPrev={showPrev}
          showBg={showBg}
          setShowBg={setShowBg}
          picker={picker}
          setPicker={setPicker}
        />

        <button
          className="post_submit"
          style={{
            background: `${
              !text && !images.length && !videos.length ? "#e4e6eb" : "#20a305"
            }`,
            cursor: `${
              !text && !images.length && !videos.length
                ? "not-allowed"
                : "pointer"
            }`,
            color: `${
              !text && !images.length && !videos.length ? "#bcc0c4" : "#ffff"
            }`,
          }}
          onClick={() => {
            handleSubmitPost();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CreratePostPopup;
