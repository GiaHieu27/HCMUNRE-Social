import { menu, create } from '../../../data/headers';
import AllMenuItem from './AllMenuItem';

function AllMenu() {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Tìm kiếm" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Xã hội</div>
            {menu.slice(0, 6).map((item, index) => (
              <AllMenuItem
                key={index}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        <div className="all_right">
          <div className="all_right_header">Tạo</div>
          {create.map((item, index) => (
            <div className="all_right_item hover1" key={index}>
              <div className="all_right_circle">
                <i className={item.icon}></i>
              </div>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllMenu;
