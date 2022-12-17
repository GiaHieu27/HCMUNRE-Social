import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import moment from 'moment';

function UserInfo({ user }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Avatar src={user.user.picture} sx={{ width: 100, height: 100 }} />

        <Grid2 container spacing={3} sx={{ marginTop: '20px' }}>
          <Grid2 xs={4}>
            <p>Họ tên</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.full_name}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Số lượt truy cập</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.accesses}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Sinh nhật</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>
              {user.user.bDate}/{user.user.bMonth}/{user.user.bYear}
            </p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Tạo tài khoản vào</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{moment(user.user.createdAt).format('h:mm:ss a, DD/MM/YYYY')}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Email</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.email}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Đang theo dõi</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.following.length}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Được theo dõi</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.followers.length}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Bạn bè</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.friends.length}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Giới tính</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.gender}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Loại tài khoản</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>{user.user.isAdmin ? 'Quản trị viên' : 'Người dùng'}</p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Xác thực</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>
              {user.user.verified
                ? 'Đã xác thực tài khoản'
                : 'Chưa xác thực tài khoản'}
            </p>
          </Grid2>

          <Grid2 xs={4}>
            <p>Trạng thái</p>
          </Grid2>
          <Grid2 xs={8}>
            <p>
              {user.user.isLock ? 'Tài khoản đã bị khóa' : 'Đang hoạt động'}
            </p>
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
