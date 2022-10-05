import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));
function Notification({ notifications }) {
  return (
    <div className="all_menu notification scrollbar">
      <div className="all_menu_header">Thông báo</div>
      <div className="scrollbar">
        <ul className="notification_list">
          {notifications && notifications.length ? (
            notifications.map((notification, i) => (
              <li className="notification_item" key={i}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <SmallAvatar
                      alt="Remy Sharp"
                      src={`${
                        notification.react === 'haha'
                          ? '/reacts/haha.svg'
                          : notification.react === 'like'
                          ? '/reacts/like.svg'
                          : notification.react === 'love'
                          ? '/reacts/love.svg'
                          : notification.react === 'sad'
                          ? '/reacts/sad.svg'
                          : notification.react === 'sad'
                          ? '/reacts/wow.svg'
                          : '/reacts/angry.svg'
                      }`}
                    />
                  }
                >
                  <Avatar
                    alt="avatar-sender"
                    src={notification.senderId.picture}
                    sx={{ width: '56px', height: '56px' }}
                  />
                </Badge>
                <div>
                  <p className="box-wrap">
                    <span>
                      {notification.senderId.first_name}{' '}
                      {notification.senderId.last_name}
                    </span>{' '}
                    {notification.notify}
                  </p>
                  <span className="notification_time">
                    {moment(notification.createdAt).startOf('mini').fromNow()}
                  </span>
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
