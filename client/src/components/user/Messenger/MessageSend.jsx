import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RedeemIcon from '@mui/icons-material/Redeem';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Picker from 'emoji-picker-react';

function MessageSend({
  handleChangeInput,
  newMessage,
  handleSendingMessage,
  handleSendingMessageByPressingEnter,
  setNewMessage,
  imageMessage,
  setImageMessage,
}) {
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  const [picker, setPicker] = useState(false);

  

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = newMessage.substring(0, ref.selectionStart);
    const end = newMessage.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setNewMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleSendingImage = async (e) => {
    if (e.target.files.length !== 0) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImageMessage(event.target.result);
      };
    }
  };

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Đính kèm tệp</div>
        <AddCircleIcon color="successCustom" />
      </div>
      <div className="file hover-image">
        {/* <div className="add-image">Thêm hình ảnh</div> */}
        <input
          onChange={handleSendingImage}
          type="file"
          id="pic"
          className="form-control"
          accept="image/jpeg,image/png,image/gif,image/webp"
          ref={imgRef}
        />
        {/* <label htmlFor="pic"> */}
        {/* </label> */}
        <Tooltip title="Thêm hình ảnh" onClick={() => imgRef.current.click()}>
          <IconButton sx={{ p: '5px' }}>
            <InsertPhotoIcon color="successCustom" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="file">
        <AttachFileIcon color="successCustom" />
      </div>
      <div className="file hover-gift">
        <div className="add-gift">Add gift</div>
        <RedeemIcon color="successCustom" />
      </div>
      <div
        className="message-type"
        style={{
          height: `${imageMessage ? '115px' : ''}`,
          borderRadius: `${imageMessage ? '14px' : ''}`,
        }}
      >
        <input
          value={newMessage}
          onChange={handleChangeInput}
          onKeyUp={handleSendingMessageByPressingEnter}
          onClick={() => setPicker(false)}
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control-custom"
          ref={textRef}
        />
        {imageMessage && (
          <div className="messenger_img_preview comment_img_preview">
            <img
              src={imageMessage}
              alt=""
              width="200"
              height="100"
              style={{ transform: 'translateX(-76px)' }}
            />
            <div
              className="small_white_circle"
              onClick={() => setImageMessage('')}
            >
              <i className="exit_icon"></i>
            </div>
          </div>
        )}
        <div
          onClick={() => setPicker(!picker)}
          style={{ transform: 'translateX(-10px)', cursor: 'pointer' }}
        >
          <EmojiEmotionsIcon color="successCustom" />
        </div>
      </div>
      <div onClick={handleSendingMessage} className="file">
        {newMessage || imageMessage ? (
          <SendIcon color="successCustom" />
        ) : (
          <FavoriteIcon color="error" />
        )}
      </div>
      <div className="comment_emoji_picker">
        {picker && <Picker onEmojiClick={handleEmoji} />}
      </div>
    </div>
  );
}

MessageSend.prototype = {
  handleChangeInput: PropTypes.func,
  handleSendingMessage: PropTypes.func,
  setNewMessage: PropTypes.func,
  handleSendingMessageByPressingEnter: PropTypes.func,
  setImageMessage: PropTypes.func,

  newMessage: PropTypes.string,
  imageMessage: PropTypes.string,
};

export default MessageSend;
