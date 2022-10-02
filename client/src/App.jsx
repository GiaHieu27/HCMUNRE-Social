// import lib
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

// User
import LoggedInRoutes from './routes/user/LoggedInRoutes';
import NotLoggedInRoutes from './routes/user/NotLoggedInRoutes';
import Login from './pages/user/login';
import Home from './pages/user/home';
import Profile from './pages/user/profile';
import Saved from './pages/user/save';
import SavedPosstProfile from './pages/user/profile/SavedPosstProfile';
import Activate from './pages/user/home/Activate';
import ResetPassword from './pages/user/reset';
import CreratePostPopup from './components/user/CreratePostPopup';
import Friend from './pages/user/friend';
import Messenger from './pages/user/messenger';
import { postsReducer } from './functions/reducer';
import { SocketContext } from './context/socketContext';

// Admin
import AdminLoggedInRoutes from './routes/admin/AdminLoggedInRoutes';
import AdminNotLoggedInRoutes from './routes/admin/AdminNotLoggedInRoutes';
import LoginAdmin from './pages/admin/login';
import HomeAdmin from './pages/admin/home';

function App() {
  const { user, theme } = useSelector((sate) => ({ ...sate }));
  const { socket } = React.useContext(SocketContext);

  const [visible, setVisible] = React.useState(false);

  const [{ loading, posts }, dispatch] = React.useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  const getPosts = React.useCallback(async () => {
    try {
      dispatch({
        type: 'POST_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );
      dispatch({
        type: 'POST_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POST_ERROR',
        payload: error.response.data.message,
      });
    }
  }, [user?.token]);

  React.useEffect(() => {
    if (Cookies.get('user')) getPosts();
  }, [getPosts]);

  React.useEffect(() => {
    socket.emit('addUser', user?.id, user);
  }, [socket, user]);

  return (
    <div className={theme ? 'dark' : ''}>
      {/* create post popup */}
      {visible && (
        <CreratePostPopup
          user={user}
          setVisible={setVisible}
          dispatch={dispatch}
          posts={posts}
        />
      )}
      <Routes>
        {/* ---------User--------- */}
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile/" element={<Profile />} getPosts={getPosts} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/friends" element={<Friend />} />
          <Route path="/friends/:type" element={<Friend />} />
          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getPosts={getPosts}
              />
            }
          />
          <Route path="/activate/:tokenUrl" element={<Activate />} />
          <Route path="/saved" element={<Saved />} />
          <Route
            path="/:username/posts/:idPost"
            element={<SavedPosstProfile />}
          />
          <Route path="/messenger" element={<Messenger />} />
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<ResetPassword />} />
        {/* ---------User--------- */}

        {/* ---------Admin--------- */}
        <Route element={<AdminLoggedInRoutes />}>
          <Route path="/admin" element={<HomeAdmin />} />
        </Route>

        <Route element={<AdminNotLoggedInRoutes />}>
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Route>

        {/* ---------Admin--------- */}
      </Routes>
    </div>
  );
}

export default App;
