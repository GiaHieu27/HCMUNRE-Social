import React from 'react';
import PropTypes from 'prop-types';

function Notification({ notifications }) {
  return (
    <div className="all_menu notification scrollbar">
      <div className="all_menu_header">Thông báo</div>
      <div className="scrollbar">
        <ul className="notification_list">
          {notifications && notifications.length
            ? notifications.map((notification) => (
                <li className="notification_item">
                  <img src={notification.sender.picture} alt="avarta" />
                  <div>
                    <p className="box-wrap">
                      <span>
                        {notification.sender.first_name}{' '}
                        {notification.sender.last_name}
                      </span>{' '}
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Rerum animi nobis veniam at quaerat inventore
                    </p>
                    <span className="notification_time">4 tuan truoc</span>
                  </div>
                </li>
              ))
            : ''}
        </ul>
      </div>
    </div>
  );
}

Notification.propTypes = {
  notifications: PropTypes.array,
};

export default Notification;
