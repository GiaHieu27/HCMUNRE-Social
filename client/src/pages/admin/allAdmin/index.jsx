import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
// import DoneIcon from '@mui/icons-material/Done';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import PageHeader from '../../../components/admin/PageHeader';
import CustomBreadcrumbs from '../../../components/admin/CustomBreadcrumbs';
import { getTotalAnalyze, lockAccount } from '../../../apis/admin';
import SearchToolbar from '../../../components/SearchToolBar';
import TooltipMUI from '../../../components/TooltipMUI';
import CreateAdmin from './CreateAdmin';

function AllAdmin() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const user = useSelector((state) => state.user);

  const [adminList, setAdminList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);
  const [openCreate, setOpenCreate] = React.useState(false);

  const hanldeLockAcc = async (userId, token) => {
    const res = await lockAccount(userId, token);

    if (typeof res === 'object') {
      const allAdmin = res.allUser.filter((user) => {
        return user.isAdmin;
      });
      setAdminList(allAdmin);
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getTotalAnalyze(user.token);
        const allAdmin = res.allUser.filter((user) => {
          return user.isAdmin;
        });
        setAdminList(allAdmin);
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
            variant='text'
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
              variant='body2'
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
      field: 'createdAt',
      headerName: 'Ngày tạo tài khoản',
      width: 150,

      renderCell: (params) => moment(params.value).format('DD-MM-YYYY'),
    },
    {
      field: '_id',
      headerName: 'Hành động',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {!params.row.isLock ? (
              <TooltipMUI title='Khoá tài khoản' placement='top'>
                <IconButton
                  aria-label='lock'
                  color='error'
                  onClick={() => hanldeLockAcc(params.value, user.token)}
                >
                  <LockIcon />
                </IconButton>
              </TooltipMUI>
            ) : (
              <TooltipMUI title='Mở khoá tài khoản' placement='top'>
                <IconButton
                  aria-label='unlock'
                  color='success'
                  onClick={() => hanldeLockAcc(params.value, user.token)}
                >
                  <LockOpenIcon />
                </IconButton>
              </TooltipMUI>
            )}

            <TooltipMUI title='Chi tiết' placement='top'>
              <IconButton
                aria-label='detail'
                color='primary'
                component={Link}
                to={`/admin/all-admin/${params.value}`}
              >
                <OpenInNewOutlinedIcon />
              </IconButton>
            </TooltipMUI>

            <TooltipMUI title='Xoá tài khoản' placement='top'>
              <IconButton
                aria-label='delete'
                color='error'
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

  return (
    <Box
      sx={{
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <CustomBreadcrumbs pathnames={pathnames} />
      <PageHeader
        title={'Tất cả quản trị viên'}
        rightContent={
          <Button
            variant='contained'
            startIcon={<PersonAddAlt1Icon />}
            onClick={() => setOpenCreate(true)}
            color={'success'}
          >
            Tạo tài khoản admin
          </Button>
        }
      />

      <Paper>
        <DataGrid
          autoHeight
          getRowId={(r) => r._id}
          rows={adminList}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[9, 50, 100]}
          onPageSizeChange={(size) => setPageSize(size)}
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
          components={{ Toolbar: SearchToolbar }}
        />
      </Paper>

      <CreateAdmin openCreate={openCreate} setOpenCreate={setOpenCreate} />
    </Box>
  );
}

export default AllAdmin;
