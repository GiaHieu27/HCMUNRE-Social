import { useSelector } from 'react-redux';

import moment from 'moment';

function Message({ currentFriend, typingMessage, scrollRef }) {
  const { user } = useSelector((state) => ({ ...state }));
  // const { message } = useSelector((state) => state.massage);

  return (
    <>
      <div className="message-show">
        <div className="my-message">
          <div className="image-message">
            <div className="my-text">
              <p className="message-text">How are you</p>
            </div>
          </div>
          <div className="time">vdvd</div>
        </div>

        <div className="fd-message">
          <div className="image-message-time">
            <img
              src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1659866114/LogoTNMT_ehw7vh.png"
              alt=""
            />
            <div className="message-time">
              <div className="fd-text">
                <p className="message-text">vnskjvnsjnvjk nvlksnv</p>
              </div>
              <div className="time">ff dsnl</div>
            </div>
          </div>
        </div>

        <div className="my-message">
          <div className="image-message">
            <div className="my-text">
              <p className="message-text">
                <img
                  src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1661770239/LuongHieu/post_contents/rjhcp94zfsawj90qqexm.jpg"
                  alt=""
                />
              </p>
            </div>
          </div>
          <div className="time">vdvd</div>
        </div>
      </div>
    </>
  );
}

export default Message;
