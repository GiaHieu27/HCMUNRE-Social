import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AddFriendSmallCard({ item, userParam }) {
  const name = `${item.first_name} ${item.last_name}`;
  return (
    <>
      <Link to={`${item.username}`} className="addfriendCard">
        <div className="addfriend_imgsmall">
          <img src={item.picture} alt="avatar" />
          <div className="addfriend_infos">
            <div className="addfriend_name">{name}</div>
            <div className="light_green_btn">
              <img
                src="/icons/addFriend.png"
                alt="icon-add-friend"
                className="filter_blus"
              />
              Kết bạn
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

AddFriendSmallCard.propTypes = {
  item: PropTypes.object,
  userParam: PropTypes.string,
};

export default AddFriendSmallCard;
