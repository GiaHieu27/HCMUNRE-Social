import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../components/user/Header";
import Post from "../../../components/user/Post";

function SavedPosstProfile() {
  const { idPost } = useParams();
  const user = useSelector((state) => state.user);

  const [post, setPost] = useState({});

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
  }, [user.token, idPost]);

  useEffect(() => {
    getOneSavedPost();
  }, [getOneSavedPost]);

  return (
    <>
      <Header />
      <Post post={post} user={post?.user} />
    </>
  );
}

export default SavedPosstProfile;
