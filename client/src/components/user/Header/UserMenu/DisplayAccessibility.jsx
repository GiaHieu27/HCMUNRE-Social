import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import themeSlice from '../../../../redux/slices/themeSlice';

function DisplayAccessibility({ setVisible }) {
  const darkTheme = useSelector((sate) => sate.theme);
  const dispatch = useDispatch();
  const [state, setState] = useState(darkTheme);

  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Màn hình hiển thị
      </div>
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: '60px' }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Chế đội hiển thị</span>
          <span className="mmenu_span2">
            Điều chỉnh giao diện của HCMUNRE-Social để giảm độ chói và cho mắt
            bạn nghỉ ngơi.
          </span>
        </div>
      </div>

      <label htmlFor="darkOff" className="hover1">
        <span>Tắt</span>
        <input
          type="radio"
          name="dark"
          id="darkOff"
          checked={!state ? true : false}
          onChange={() => {
            dispatch(themeSlice.actions.LIGHT());
            Cookies.set('darkTheme', false);
            setState(false);
          }}
        />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>Bật</span>
        <input
          type="radio"
          name="dark"
          id="darkOn"
          checked={state ? state : false}
          onChange={() => {
            dispatch(themeSlice.actions.DARK());
            Cookies.set('darkTheme', true);
            setState(true);
          }}
        />
      </label>
      <div className="mmenu_main">
        <div className="small_circle">
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Chế độ thu gọn</span>
          <span className="mmenu_span2">Điều chỉnh kích thước phông chữ</span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Tắt</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>Bật</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
    </div>
  );
}

DisplayAccessibility.propTypes = {
  setVisible: PropTypes.func,
};

export default DisplayAccessibility;
