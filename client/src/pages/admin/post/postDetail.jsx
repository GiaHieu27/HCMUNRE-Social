/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";

import { browseArticles, getOnePost } from "../../../apis/admin";
import CustomDialog from "../../../components/CustomDialog";
import PageHeader from "../../../components/admin/PageHeader";
import Post from "../../../components/user/Post";
import { deletePost } from "../../../apis/post";

function PostDetail() {
  const { id } = useParams();
  const { user, admin } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const fullName = `${admin.first_name} ${admin.last_name}`;

  const currentUser = useSelector((state) => state.user);

  const [post, setPost] = React.useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);

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

  const handleDeletePost = async (postId) => {
    const res = await deletePost(postId, user.token);
    if (res.status === "ok") {
      navigate("/admin/post/");
    }
  };

  const handleBrowserPost = async (postId, fullName) => {
    const res = await browseArticles(postId, fullName, user.token);
    if (res) {
      navigate("/admin/post-pending/");
    }
  };

  return (
    <>
      <PageHeader title={"Thông tin bài viết chi tiết"} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {post && (
            <Paper
              sx={{
                background: "white",
                borderRadius: "10px",
                height: "438px",
              }}
            >
              <Post post={post} user={currentUser} admin />
            </Paper>
          )}
        </Grid>
        <Grid item xs={6}>
          {post && (
            <>
              <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item sx={{ display: "flex" }} xs={4}>
                    <Typography>Người đăng bài:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{post.post.user.full_name}</Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex" }} xs={4}>
                    <Typography>Ngày đăng:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>
                      {moment(post.post.createdAt).format(
                        "DD/MM/YYYY, HH:mm:ss"
                      )}
                    </Typography>
                  </Grid>

                  <Grid item sx={{ display: "flex" }} xs={4}>
                    <Typography>Loại bài viết:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>
                      {post.post.images
                        ? "Hình ảnh"
                        : post.post.videos
                        ? "Video"
                        : "Chữ viết"}
                    </Typography>
                  </Grid>

                  <Grid item sx={{ display: "flex" }} xs={4}>
                    <Typography>Trạng thái:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      color={post.post.approve ? "primary" : "error"}
                      fontSize={18}
                    >
                      {post.post.approve ? "Đã duyệt" : "Chờ duyệt"}
                    </Typography>
                  </Grid>

                  <Grid item sx={{ display: "flex" }} xs={4}>
                    <Typography>Lượt bình luận:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{post.post.comments.length}</Typography>
                  </Grid>

                  <Grid item sx={{ display: "flex" }} xs={4}>
                    <Typography>Lượt tương tác:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{post.reacts.length}</Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Stack
                direction={"row"}
                marginTop="20px"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {!post.post.approve && (
                  <Button
                    variant="contained"
                    sx={{ marginRight: "20px" }}
                    color="success"
                    onClick={() => handleBrowserPost(post.post._id, fullName)}
                  >
                    Duyệt bài
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
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
        maxWidth={"400"}
        title={"Bạn có chắc chắn muốn xóa"}
        actions={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: " center",
            }}
            width="100%"
          >
            <Button
              sx={{
                width: "100px",
                height: "50px",
              }}
              onClick={() => setDialogOpen(false)}
            >
              Hủy
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{
                width: "100px",
                height: "50px",
                marginLeft: "43px",
              }}
              onClick={() => handleDeletePost(post.post._id)}
            >
              Xóa
            </Button>
          </Box>
        }
      />
    </>
  );
}

export default PostDetail;
