import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AllMenuItem({ name, description, icon }) {
  return (
    <Link
      to={`/${
        name === 'Bạn bè'
          ? 'friends'
          : name === 'Đã lưu'
          ? 'saved'
          : name === 'Nhắn tin'
          ? 'messenger'
          : ''
      }`}
      className="all_menu_item hover1"
    >
      {icon}
      <div className="all_menu_col">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </Link>
  );
}

AllMenuItem.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
};

export default AllMenuItem;
