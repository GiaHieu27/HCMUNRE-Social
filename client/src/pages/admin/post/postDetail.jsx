/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';

import { getOnePost } from '../../../apis/admin';
import CustomDialog from '../../../components/CustomDialog';
import PageHeader from '../../../components/admin/PageHeader';
import Post from '../../../components/user/Post';

function PostDetail() {
  const { id } = useParams();

  const currentUser = useSelector((state) => state.user);

  const [post, setPost] = React.useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState('');
  const [dialogText, setDialogText] = React.useState('');

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getOnePost(id, currentUser.token);
        console.log(res);
        setPost(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <PageHeader title={'Thông tin bài viết chi tiết'} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {post && (
            <Paper
              sx={{
                background: 'white',
                borderRadius: '10px',
                height: '438px',
              }}
            >
              <Post post={post} user={currentUser} admin />
            </Paper>
          )}
        </Grid>
        <Grid item xs={6}>
          {post && (
            <>
              <Paper sx={{ padding: '20px', borderRadius: '10px' }}>
                <Grid container spacing={2}>
                  <Grid item sx={{ display: 'flex' }} xs={4}>
                    <Typography>Người đăng bài:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{post.post.user.full_name}</Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex' }} xs={4}>
                    <Typography>Ngày đăng:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>
                      {moment(post.post.createdAt).format(
                        'DD/MM/YYYY, HH:mm:ss'
                      )}
                    </Typography>
                  </Grid>

                  <Grid item sx={{ display: 'flex' }} xs={4}>
                    <Typography>Loại bài viết:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>
                      {post.post.images
                        ? 'Hình ảnh'
                        : post.post.videos
                        ? 'Video'
                        : 'Chữ viết'}
                    </Typography>
                  </Grid>

                  <Grid item sx={{ display: 'flex' }} xs={4}>
                    <Typography>Trạng thái:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      color={post.post.approve ? 'primary' : 'error'}
                      fontSize={18}
                    >
                      {post.post.approve ? 'Đã duyệt' : 'Chờ duyệt'}
                    </Typography>
                  </Grid>

                  <Grid item sx={{ display: 'flex' }} xs={4}>
                    <Typography>Lượt bình luận:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{post.post.comments.length}</Typography>
                  </Grid>

                  <Grid item sx={{ display: 'flex' }} xs={4}>
                    <Typography>Lượt tương tác:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{post.reacts.length}</Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Stack
                direction={'row'}
                marginTop='20px'
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  variant='contained'
                  sx={{ marginRight: '20px' }}
                  color='success'
                >
                  Duyệt bài
                </Button>
                <Button variant='contained' color='error'>
                  Xóa bài
                </Button>
              </Stack>
            </>
          )}
        </Grid>
      </Grid>

      <CustomDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        type={dialogType}
        showIcon
        content={
          <Typography variant='subtitle1' textAlign={'center'}>
            {dialogText}
          </Typography>
        }
        actions={
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Button variant='contained' onClick={() => setDialogOpen(false)}>
              OK
            </Button>
          </Box>
        }
      />
    </>
  );
}

export default PostDetail;
