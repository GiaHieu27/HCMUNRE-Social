import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Typography, Badge, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PropTypes from 'prop-types';
import moment from 'moment';

import { updateStatusNotifySeen } from '../../../apis/post';
import notifySlice from '../../../redux/slices/notifySlice';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));
function Notification({ notifies, user }) {
  const dispatch = useDispatch();
  return (
    <div className="all_menu notification scrollbar">
      <div className="all_menu_header">Thông báo</div>
      <div className="scrollbar">
        <ul className="notification_list">
          {notifies && notifies.length ? (
            notifies.map((notify) => (
              <Link
                to={`/${notify?.senderId.username}/posts/${notify?.postRef}`}
                key={notify?.postRef}
                onClick={() => {
                  dispatch(
                    notifySlice.actions.UPDATE_STATUS({
                      postRef: notify.postRef,
                      status: 'seen',
                    })
                  );
                  updateStatusNotifySeen(notify.recieverId, 'seen', user.token);
                }}
              >
                <li className="notification_item hover2">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <SmallAvatar
                        alt="Remy Sharp"
                        src={`${
                          notify.react === 'haha'
                            ? '/reacts/haha.svg'
                            : notify.react === 'like'
                            ? '/reacts/like.svg'
                            : notify.react === 'love'
                            ? '/reacts/love.svg'
                            : notify.react === 'sad'
                            ? '/reacts/sad.svg'
                            : notify.react === 'wow'
                            ? '/reacts/wow.svg'
                            : '/reacts/angry.svg'
                        }`}
                      />
                    }
                  >
                    <Avatar
                      alt="avatar-sender"
                      src={notify.senderId.picture}
                      sx={{ width: '56px', height: '56px' }}
                    />
                  </Badge>
                  <div>
                    <p className="box-wrap">
                      <span>
                        {notify.senderId.first_name} {notify.senderId.last_name}
                      </span>{' '}
                      {notify.notify}
                    </p>
                    <span className="notification_time">
                      {moment(notify.createdAt).startOf('mini').fromNow()}
                    </span>
                  </div>
                  {(notify.status === 'sent' || notify.status === 'unseen') && (
                    <FiberManualRecordIcon />
                  )}
                </li>
              </Link>
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
  user: PropTypes.object,
};

export default Notification;
