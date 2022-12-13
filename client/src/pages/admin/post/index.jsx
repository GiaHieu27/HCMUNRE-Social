import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { Box, Button, colors, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import ReportIcon from '@mui/icons-material/Report';

// import userApi from '../../api/userApi';
import PageHeader from '../../../components/admin/PageHeader';
import CustomBreadcrumbs from '../../../components/admin/CustomBreadcrumbs';
import { getTotalAnalyze } from '../../../apis/admin';
import SearchToolbar from '../../../components/SearchToolBar';

function Post() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const user = useSelector((state) => state.user);

  const [postLists, setPostLists] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getTotalAnalyze(user.token);
        res.allPost.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPostLists(res.allPost);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user.token]);

  // console.log(postLists);

  let columns = [
    {
      field: 'full_name',
      headerName: 'Người đăng bài',
      renderCell: (params) => {
        return (
          <Typography
            variant='body2'
            sx={{
              fontWeight: '500',
            }}
          >
            {params.value}
          </Typography>
        );
      },
      width: 180,
    },
    {
      field: 'type',
      headerName: 'Loại bài viết',
      width: 200,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderRadius: '2px',
              padding: '5px 5px 2px 5px',
              backgroundColor:
                params.value === 'profilePicture'
                  ? colors.blue[50]
                  : params.value === 'cover'
                  ? colors.deepPurple[50]
                  : params.value === null &&
                    params?.row.images === null &&
                    params?.row.videos === null
                  ? colors.green[50]
                  : colors.red[50],
            }}
            color={
              params.value === 'profilePicture'
                ? colors.blue.A700
                : params.value === 'cover'
                ? colors.deepPurple.A700
                : params.value === null &&
                  params?.row.images === null &&
                  params?.row.videos === null
                ? colors.green.A700
                : colors.red.A700
            }
          >
            <Typography
              variant='body2'
              sx={{
                fontWeight: '500',
                marginBottom: '0px',
              }}
            >
              {params.value === 'profilePicture'
                ? 'Ảnh đại diện'
                : params.value === 'cover'
                ? 'Ảnh bìa'
                : params.value === null &&
                  params?.row.images === null &&
                  params?.row.videos === null
                ? 'Bài viết'
                : 'Media'}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'approve',
      headerName: 'Trạng thái',
      width: 150,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            color={!params.value ? 'red' : 'green'}
          >
            {!params.value ? <ReportIcon /> : <VerifiedUserIcon />}

            <Typography
              variant='body2'
              sx={{
                marginLeft: '5px',
                fontWeight: '500',
              }}
            >
              {!params.value ? 'Chờ duyệt' : 'Đã duyệt'}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Thời gian đăng',
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      field: 'censor',
      headerName: 'Người duyệt bài',
      flex: 1,
    },
    {
      field: '_id',
      headerName: 'Hành động',
      width: 130,
      renderCell: (params) => (
        <Button
          variant='text'
          component={Link}
          to={`/admin/post/${params.value}`}
          startIcon={<OpenInNewOutlinedIcon />}
        >
          Chi tiết
        </Button>
      ),
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
      <PageHeader title={'Danh sách bài viết'} />

      <Paper>
        <DataGrid
          autoHeight
          getRowId={(r) => r._id}
          rows={postLists}
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
    </Box>
  );
}

export default Post;
