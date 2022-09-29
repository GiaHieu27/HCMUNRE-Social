import PropTypes from 'prop-types';

function AddFriendSmallCard({ item }) {
  const name = `${item.first_name} ${item.last_name}`;
  return (
    <div className="addfriendCard">
      <div className="addfriend_imgsmall">
        <img src={item.picture} alt="avatar" />
        <div className="addfriend_infos">
          <div className="addfriend_name">{name}</div>
          <div className="light_green_btn">
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className="filter_blus"
            />
            Kết bạn
          </div>
        </div>
      </div>
    </div>
  );
}

AddFriendSmallCard.propTypes = {
  item: PropTypes.object,
};

export default AddFriendSmallCard;
