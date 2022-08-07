// import lib
import { useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// import project
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/Activate";
import ResetPassword from "./pages/reset";
import CreratePostPopup from "./components/CreratePostPopup";
import Friend from "./pages/friend";
import { postsReducer } from "./functions/reducer";

function App() {
  const [visible, setVisible] = useState(false);
  const { user, theme } = useSelector((sate) => ({ ...sate }));

  const [{ loading, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      dispatch({
        type: "POST_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      dispatch({
        type: "POST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className={theme ? "dark" : ""}>
      {visible && (
        <CreratePostPopup
          user={user}
          setVisible={setVisible}
          dispatch={dispatch}
          posts={posts}
        />
      )}
      <Routes>
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
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
