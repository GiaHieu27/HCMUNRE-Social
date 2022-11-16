import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { Box, colors, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import DoneIcon from '@mui/icons-material/Done';

import { browseArticles, getTotalAnalyze } from '../../../apis/admin';
import { deletePost } from '../../../apis/post';
import PageHeader from '../../../components/admin/PageHeader';
import CustomBreadcrumds from '../../../components/admin/CustomBreadcrumds';
import SearchToolbar from '../../../components/SearchToolBar';
import TooltipMUI from '../../../components/TooltipMUI';

function PostPending() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const user = useSelector((state) => state.user);

  const [postPending, setPostPending] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getTotalAnalyze(user.token);
        setPostPending(res.postHasNotBeenApproved);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user.token]);

  const handleBrowserPost = async (postId) => {
    const res = await browseArticles(postId, user.token);
    setPostPending(res.posts);
  };

  const handleDeletePost = async (postId) => {
    const res = await deletePost(postId, user.token);
    if (res.status === 'ok') {
      const newPost = postPending.filter((item) => {
        return item.id !== postId;
      });
      setPostPending(newPost);
    }
  };

  console.log(postPending);

  let columns = [
    {
      field: 'full_name',
      headerName: 'Người đăng bài',
      renderCell: (params) => {
        return (
          <Typography
            variant="body2"
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
              variant="body2"
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
      width: 170,
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
              variant="body2"
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
      field: 'id',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <>
          <TooltipMUI title="Duyệt bài" placement="top">
            <IconButton
              aria-label="check"
              color="successCustom"
              onClick={() => handleBrowserPost(params.value)}
            >
              <DoneIcon />
            </IconButton>
          </TooltipMUI>

          <TooltipMUI title="Xoá bài" placement="top">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDeletePost(params.value)}
            >
              <DeleteIcon />
            </IconButton>
          </TooltipMUI>

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
        </>
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
      <CustomBreadcrumds pathnames={pathnames} />
      <PageHeader
        title={'Danh sách bài viết'}
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
          rows={postPending}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[9, 50, 100]}
          onPageSizeChange={(size) => setPageSize(size)}
          checkboxSelection
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
          components={{ Toolbar: SearchToolbar }}
        />
      </Paper>
    </Box>
  );
}

export default PostPending;
