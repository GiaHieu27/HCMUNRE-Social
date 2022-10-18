import { useState } from 'react';
import { Link } from 'react-router-dom';

import LeftLink from './LeftLink';
import { left } from '../../../../data/home';

function LeftHome({ user }) {
  const [visible] = useState(false);
  const year = new Date().getFullYear();

  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link createPost">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 5).map((link, i) => (
        <LeftLink
          key={i}
          icon={link.icon}
          text={link.text}
          notification={link.notification}
        />
      ))}
      <div className={`fb_copyright ${visible && 'relative_fb_copyright'}`}>
        HCMUNRE © {year}
      </div>
    </div>
  );
}

export default LeftHome;
