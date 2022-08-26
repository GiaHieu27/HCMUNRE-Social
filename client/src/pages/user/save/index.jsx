import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "../../../components/user/Header";

function Saved(props) {
  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Đã lưu</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>

          <div className="friends_left_wrap">
            <Link to="/saved" className={`mmenu_item hover3 `}>
              <div className="small_circle">
                <i className="friends_home_icon"></i>
              </div>
              <span>Mục đã lưu</span>
            </Link>

            {/* <Link to="/friends/requests" className={`mmenu_item hover3 `}>
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friends Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

            <Link to="/friends/sent" className={`mmenu_item hover3 `}>
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <Link to="/friends/all" className={`mmenu_item hover3 `}>
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom Lists</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

Saved.propTypes = {};

export default Saved;
