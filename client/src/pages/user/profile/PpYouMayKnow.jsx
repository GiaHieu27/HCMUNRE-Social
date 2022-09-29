import PropTypes from 'prop-types';
import { Dots } from '../../../svg';
import AddFriendSmallCard from './AddFriendSmallCard';

function PpYouMayKnow({ friends }) {
  const friendsOfFriends = friends.map((item) => item.friends).flat();

  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        Có thể bạn biết những người này
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {friendsOfFriends.map((item, index) => (
          <AddFriendSmallCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

PpYouMayKnow.propTypes = {
  friends: PropTypes.array,
};

export default PpYouMayKnow;
