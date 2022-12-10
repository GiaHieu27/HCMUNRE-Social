import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ScaleLoader from 'react-spinners/ScaleLoader';

import Header from '../../../components/user/Header';
import LeftHome from '../../../components/user/Home/Left';
import RightHome from '../../../components/user/Home/Right';
import CreatePost from '../../../components/user/CreatePost';
import SenVerification from '../../../components/user/Home/sendVerification';
import Post from '../../../components/user/Post';
import Meeting from '../../../components/user/Meeting';
import toast, { Toaster } from 'react-hot-toast';

function Home({ setVisible, visible, posts, loading, getPosts }) {
  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));
  const friends = friendStore.data.friends;
  const [height, setHeight] = useState();
  const middle = useRef(null);

  useEffect(() => {
    const a = setTimeout(() => {
      setHeight(middle.current.clientHeight);
    }, 1000);
    return () => {
      clearTimeout(a);
    };
  }, [middle.current?.clientHeight]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!visible && !firstRender.current) {
      toast.success(
        `Bài viết của bạn sẽ hiển thị sau khi quản trị viên duyệt bài`,
        {
          style: {
            border: '1px solid #007b55',
            padding: '20px',
            color: '#007b55',
            fontSize: '18px',
          },
          iconTheme: {
            primary: '#007b55',
            secondary: '#FFFAEE',
          },
          duration: 7000,
          position: 'bottom-left',
        }
      );
    }
  }, [visible]);

  return (
    <div className='home' style={{ height: `${height + 150}px` }}>
      <Header page='home' getPosts={getPosts} />

      <LeftHome user={user} />

      <Toaster position={'top-center'} reverseOrder={false} />

      <div className='home_middle' ref={middle}>
        {!user.verified && <SenVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        {friends && friends.length > 0 && <Meeting />}

        {loading ? (
          <div className='skeleton_loader'>
            <ScaleLoader color='#00AB55' />
          </div>
        ) : posts && posts.length ? (
          <div className='posts'>
            {posts.map((post) => (
              <Post key={post._id} post={post} user={user} />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <RightHome />
    </div>
  );
}

Home.propTypes = {
  loading: PropTypes.bool,
  setVisible: PropTypes.func,
  getPosts: PropTypes.func,
  posts: PropTypes.array,
};

export default Home;
