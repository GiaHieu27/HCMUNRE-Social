import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Badge, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import moment from 'moment';

import { updateStatusNotifySeen } from '../../../apis/post';
import notifySlice from '../../../redux/slices/notifySlice';

const SmallReact = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function Notification() {
  const dispatch = useDispatch();
  const {
    user,
    notification: { notifies },
  } = useSelector((state) => ({ ...state }));

  const handleSeenNotify = async (postRef) => {
    dispatch(notifySlice.actions.UPDATE_STATUS_SEEN(postRef));
    updateStatusNotifySeen(postRef, user.token);
  };

  return (
    <div className="all_menu notification scrollbar">
      <div className="all_menu_header">Thông báo</div>
      <div className="scrollbar">
        <ul className="notification_list">
          {notifies && notifies.length ? (
            notifies.map((notify) => {
              return (
                <Link
                  to={`/${user.username}/posts/${notify?.postRef}`}
                  key={notify?.postRef}
                  onClick={() => handleSeenNotify(notify.postRef)}
                >
                  <li className="notification_item hover2">
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <SmallReact
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
                          {notify.senderId.first_name}{' '}
                          {notify.senderId.last_name}
                        </span>{' '}
                        {notify.notify}
                      </p>
                      <span
                        className={`notification_time ${
                          notify.status === 'unseen' ? 'unseen' : ''
                        }`}
                      >
                        {moment(notify.createdAt).startOf('mini').fromNow()}
                      </span>
                    </div>
                    {notify.status === 'sent' || notify.status === 'unseen' ? (
                      <>
                        <FiberManualRecordIcon />
                      </>
                    ) : (
                      ''
                    )}
                  </li>
                </Link>
              );
            })
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

export default Notification;
