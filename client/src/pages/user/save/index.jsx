import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "../../../components/user/Header";
import axios from "axios";
import { useSelector } from "react-redux";

function Saved(props) {
  const user = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState();

  const getSavedPosts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getSavedPosts`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(data);
    } catch (error) {
      return error.response.data.message;
    }
  };

  useEffect(() => {
    getSavedPosts();
  }, []);

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

        <div className="friends_right"></div>
      </div>
    </>
  );
}

Saved.propTypes = {};

export default Saved;
