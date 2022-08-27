import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../components/user/Header";
import axios from "axios";
import ItemSaved from "./ItemSaved";

function Saved() {
  const user = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState([]);

  const getSavedPosts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getSavedPosts`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setSavedPosts(data);
    } catch (error) {
      return error.response.data.message;
    }
  }, [user.token]);

  useEffect(() => {
    getSavedPosts();
  }, [getSavedPosts]);

  return (
    <>
      <Header />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Đã lưu</h3>
            <div className="small_circle me-1">
              <i className="settings_filled_icon"></i>
            </div>
          </div>

          <div className="friends_left_wrap">
            <Link to="/saved" className={`mmenu_item hover3 active_friends`}>
              <div className="small_circle ">
                <i className="saved_icon"></i>
              </div>
              <span>Mục đã lưu</span>
            </Link>
          </div>
        </div>

        <div className="friends_right">
          <h4 className="fw-bold fs-5 mt-2">Tất cả</h4>
          {savedPosts && savedPosts.length ? (
            savedPosts.map((item) => <ItemSaved key={item._id} item={item} />)
          ) : (
            <h4 className="createPost text-center p-5 mt-4 text-secondary">
              Chưa có bài viết nào được lưu
            </h4>
          )}
        </div>
      </div>
    </>
  );
}

export default Saved;
