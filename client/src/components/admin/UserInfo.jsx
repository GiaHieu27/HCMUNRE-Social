import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import moment from 'moment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportIcon from '@mui/icons-material/Report';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

function UserInfo({ user }) {
  return (
    <Card elevation={2} sx={{ width: '79vw' }}>
      <CardContent sx={{ position: 'relative' }}>
        {user.user.cover ? (
          <img
            src={user.user.cover}
            alt=''
            style={{ width: '77vw', height: '350px', borderRadius: '10px' }}
          />
        ) : (
          <div
            style={{
              width: '77vw',
              height: '350px',
              borderRadius: '10px',
              background: '#e5e5e5',
            }}
          ></div>
        )}
        <Box
          sx={{
            background: 'white',
            position: 'absolute',
            top: '294px',
            left: '50px',
            width: '205px',
            height: '205px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
        >
          <Avatar
            src={user.user.picture}
            sx={{
              width: 200,
              height: 200,
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: '30px',
            transform: 'translateX(260px) translateY(38px)',
          }}
        >
          {user.user.full_name}
        </Typography>

        <Grid2
          container
          spacing={3}
          sx={{
            marginTop: '110px',
            display: 'flex',
            justifyContent: 'center',
            transform: 'translateX(200px)',
          }}
        >
          <Grid2 xs={3}>
            <Typography>Loại tài khoản</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Box sx={{ display: 'flex' }}>
              {user.user.isAdmin ? (
                <AdminPanelSettingsIcon color={'primary'} />
              ) : (
                <PersonIcon color={'secondary'} />
              )}
              <Typography
                sx={{ marginLeft: '6px' }}
                color={user.user.isAdmin ? 'primary' : 'secondary'}
              >
                {user.user.isAdmin ? 'Quản trị viên' : 'Người dùng'}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Xác thực</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Box
              color={user.user.verified ? 'green' : 'red'}
              sx={{ display: 'flex' }}
            >
              {user.user.verified ? <VerifiedUserIcon /> : <ReportIcon />}
              <Typography sx={{ marginLeft: '6px' }}>
                {user.user.verified
                  ? 'Đã xác thực tài khoản'
                  : 'Chưa xác thực tài khoản'}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Trạng thái</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Box
              color={user.user.isLock ? 'red' : 'green'}
              sx={{ display: 'flex' }}
            >
              {user.user.isLock ? <ReportIcon /> : <VerifiedUserIcon />}
              <Typography sx={{ marginLeft: '6px' }}>
                {user.user.isLock ? 'Tài khoản đã bị khóa' : 'Đang hoạt động'}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Số lượt truy cập</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>{user.user.accesses}</Typography>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Sinh nhật</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>
              {user.user.bDate}/{user.user.bMonth}/{user.user.bYear}
            </Typography>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Tạo tài khoản vào</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>
              {moment(user.user.createdAt).format('h:mm:ss a, DD/MM/YYYY')}
            </Typography>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Email</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>{user.user.email}</Typography>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Đang theo dõi</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>{user.user.following.length}</Typography>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Được theo dõi</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>{user.user.followers.length}</Typography>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Bạn bè</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>{user.user.friends.length}</Typography>
          </Grid2>

          <Grid2 xs={3}>
            <Typography>Giới tính</Typography>
          </Grid2>
          <Grid2 xs={7}>
            <Typography>{user.user.gender}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
