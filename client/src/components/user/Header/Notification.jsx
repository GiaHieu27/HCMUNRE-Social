import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

function Notification({ socketNotifications }) {
  return (
    <div className="all_menu notification scrollbar">
      <div className="all_menu_header">Thông báo</div>
      <div className="scrollbar">
        <ul className="notification_list">
          {socketNotifications && socketNotifications.length ? (
            socketNotifications.map((notification, i) => (
              <li className="notification_item" key={i}>
                <img src={notification.sender.picture} alt="avarta" />
                <div>
                  <p className="box-wrap">
                    <span>
                      {notification.sender.first_name}{' '}
                      {notification.sender.last_name}
                    </span>{' '}
                    {notification.notify}
                  </p>
                  <span className="notification_time">4 tuan truoc</span>
                </div>
              </li>
            ))
          ) : (
            <Box
              sx={{
                height: '78vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Bạn chưa có thông báo nào</Typography>
            </Box>
          )}
        </ul>
      </div>
    </div>
  );
}

Notification.propTypes = {
  notifications: PropTypes.array,
};

export default Notification;
