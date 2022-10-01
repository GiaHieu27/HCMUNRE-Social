import React from 'react';

function Notification({ user }) {
  return (
    <div className="all_menu notification scrollbar">
      <div className="all_menu_header">Thông báo</div>
      <div className="scrollbar">
        <ul className="notification_list">
          <li className="notification_item">
            <img src={user.picture} alt="avarta" />
            <div>
              <p className="box-wrap">
                <span>
                  {user.first_name} {user.last_name}
                </span>{' '}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                animi nobis veniam at quaerat inventore
              </p>
              <span className="notification_time">4 tuan truoc</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Notification;
