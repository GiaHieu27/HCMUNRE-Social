import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../../../components/user/Header";
import Post from "../../../components/user/Post";

function SavedPosstProfile() {
  const { idPost } = useParams();
  const user = useSelector((state) => state.user);

  const [post, setPost] = useState({});
  const [height, setHeight] = useState();
  const savedPostRef = useRef(null);

  const getOneSavedPost = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getOneSavedPost/${idPost}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setPost(data);
    } catch (error) {
      return error.response.data.message;
    }
  }, [idPost, user.token]);

  useEffect(() => {
    getOneSavedPost();
  }, [getOneSavedPost]);

  useEffect(() => {
    const a = setInterval(() => {
      setHeight(savedPostRef.current.clientHeight);
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, [savedPostRef.current?.clientHeight]);

  return (
    <>
      <Header />
      <div className="home" style={{ height: `${height + 140}px` }}>
        <div className="saved_post" ref={savedPostRef}>
          {post.hasOwnProperty("background") && (
            <Post post={post} user={user} />
          )}
        </div>
      </div>
    </>
  );
}

export default SavedPosstProfile;
