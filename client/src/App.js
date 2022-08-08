// import lib
import { useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

// import project
import Profile from "./pages/user/profile";
import Home from "./pages/user/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/user/home/Activate";
import ResetPassword from "./pages/user/reset";
import CreratePostPopup from "./components/user/CreratePostPopup";
import Friend from "./pages/user/friend";
import { postsReducer } from "./functions/reducer";
import Login from "./pages/user/login";

function App() {
  const [visible, setVisible] = useState(false);
  const { user, theme } = useSelector((sate) => ({ ...sate }));

  const [{ loading, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    if (Cookies.get("user")) getPosts();
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
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
