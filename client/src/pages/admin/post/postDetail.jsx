/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

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
      <PageHeader title={'Thông tin chi tiết'} />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {post && <Post post={post} user={currentUser} admin />}
          <Stack spacing={4}></Stack>
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
