import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

import Header from '../../../components/user/Header';
import ItemSaved from './ItemSaved';

function Saved() {
  const user = useSelector((state) => state.user);
  const [allSavedPosts, setAllSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllSavedPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getAllSavedPosts`,
          {
            headers: {
              Authorization: 'Bearer ' + user.token,
            },
          }
        );
        setAllSavedPosts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return error.response.data.message;
      }
    };
    getAllSavedPosts();
  }, [user.token]);

  return (
    <>
      <Header />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Đã lưu</h3>
            <div className="small_circle me-1">
              <i className="settings_filled_icon"></i>
            </div>
          </div>

          <div className="friends_left_wrap">
            <Link to="/saved" className={`mmenu_item hover3 active_friends`}>
              <div className="small_circle ">
                <i className="saved_icon"></i>
              </div>
              <span>Mục đã lưu</span>
            </Link>
          </div>
        </div>

        <div className="friends_right">
          <h4 className="fw-bold fs-5 mt-2">Tất cả</h4>
          {loading && !allSavedPosts.length ? (
            <div className="createPost saved-card mt-3">
              <Grid container spacing={5}>
                <Grid item xs={2}>
                  <Skeleton
                    variant="rounded"
                    width={144}
                    height={144}
                    sx={{ borderRadius: '10px' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Skeleton height={30} width={740} />
                  <Skeleton height={30} width={740} />
                  <Skeleton height={30} width={190} />
                  <Skeleton height={30} width={190} />
                  <Skeleton height={30} width={90} />
                </Grid>
              </Grid>
            </div>
          ) : allSavedPosts && allSavedPosts.length ? (
            allSavedPosts.map((item) => (
              <ItemSaved key={item._id} item={item} />
            ))
          ) : (
            <h4 className="createPost text-center p-5 mt-4 text-secondary">
              Chưa có bài viết nào được lưu
            </h4>
          )}
        </div>
      </div>
    </>
  );
}

export default Saved;
