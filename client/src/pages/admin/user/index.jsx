import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// import userApi from '../../api/userApi';
import PageHeader from '../../../components/admin/PageHeader';
import CustomBreadcrumds from '../../../components/admin/CustomBreadcrumds';
import { getTotalAnalyze, lockAccount } from '../../../apis/admin';
import SearchToolbar from '../../../components/SearchToolBar';
import TooltipMUI from '../../../components/TooltipMUI';

function User() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const user = useSelector((state) => state.user);

  const [userList, setUserList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);

  const hanldeLockAcc = async (userId, token) => {
    const res = await lockAccount(userId, token);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getTotalAnalyze(user.token);
        const allUser = res.allUser.filter((user) => {
          return !user.isAdmin;
        });
        setUserList(allUser);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user.token]);

  let columns = [
    {
      field: 'full_name',
      headerName: 'Tên người dùng',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            component={Link}
            to={`/admin/user/${params.row.id}`}
          >
            {params.value}
          </Button>
        );
      },
      width: 180,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 190,
    },
    {
      field: 'accesses',
      headerName: 'Số lượt truy cập',
      width: 140,
    },
    {
      field: 'isLock',
      headerName: 'Trạng thái',
      width: 190,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            color={!!params.value ? 'red' : 'green'}
          >
            {!!params.value ? <ReportIcon /> : <VerifiedUserIcon />}

            <Typography
              variant="body2"
              sx={{
                marginLeft: '5px',
                fontWeight: '500',
              }}
            >
              {!!params.value ? 'Tài khoản đã bị khoá' : 'Đang hoạt động'}
            </Typography>
          </Box>
        );
      },
    },
    { field: 'gender', headerName: 'Giới tính' },
    {
      field: 'id',
      headerName: 'Hành động',
      width: 130,

      renderCell: (params) => {
        console.log(params);

        return (
          <>
            {!params.row.isLock ? (
              <TooltipMUI title="Khoá tài khoản" placement="top">
                <IconButton
                  aria-label="lock"
                  color="error"
                  onClick={() => hanldeLockAcc(params.value, user.token)}
                >
                  <LockIcon />
                </IconButton>
              </TooltipMUI>
            ) : (
              <TooltipMUI title="Mở khoá tài khoản" placement="top">
                <IconButton
                  aria-label="unlock"
                  color="success"
                  onClick={() => hanldeLockAcc(params.value, user.token)}
                >
                  <LockOpenIcon />
                </IconButton>
              </TooltipMUI>
            )}

            <TooltipMUI title="Chi tiết" placement="top">
              <IconButton
                aria-label="detail"
                color="primary"
                component={Link}
                to={`/admin/post-pending/${params.value}`}
              >
                <OpenInNewOutlinedIcon />
              </IconButton>
            </TooltipMUI>

            <TooltipMUI title="Xoá tài khoản" placement="top">
              <IconButton
                aria-label="delete"
                color="error"
                // onClick={() => handleDeletePost(params.value)}
              >
                <DeleteIcon />
              </IconButton>
            </TooltipMUI>
          </>
        );
      },
    },
  ];

  userList.map((user) => {
    user['id'] = user['_id'];
    return user;
  });

  return (
    <Box
      sx={{
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <CustomBreadcrumds pathnames={pathnames} />
      <PageHeader
        title={'Tất cả người dùng'}
        // rightContent={
        //   <Button
        //     variant="contained"
        //     component={Link}
        //     to="/user/create"
        //     startIcon={<PersonAddAltOutlinedIcon />}
        //   >
        //     Create
        //   </Button>
        // }
      />

      <Paper>
        <DataGrid
          autoHeight
          rows={userList}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[9, 50, 100]}
          onPageSizeChange={(size) => setPageSize(size)}
          // density="comfortable"
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
          components={{ Toolbar: SearchToolbar }}
        />
      </Paper>
    </Box>
  );
}

export default User;
