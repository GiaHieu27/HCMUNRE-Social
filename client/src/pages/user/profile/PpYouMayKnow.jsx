import PropTypes from 'prop-types';
import { Dots } from '../../../svg';
import AddFriendSmallCard from './AddFriendSmallCard';

function PpYouMayKnow({ friends, userParam }) {
  const friendsOfFriends = friends
    .map((item) => item.friends)
    .flat()
    .filter((item) => item.username !== userParam);

  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        Có thể bạn biết những người này
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {friendsOfFriends &&
          friendsOfFriends.length &&
          friendsOfFriends.map((item, index) => (
            <AddFriendSmallCard item={item} key={index} userParam={userParam} />
          ))}
      </div>
    </div>
  );
}

PpYouMayKnow.propTypes = {
  friends: PropTypes.array,
  userParam: PropTypes.string,
};

export default PpYouMayKnow;
