import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import RedeemIcon from '@mui/icons-material/Redeem';
import SendIcon from '@mui/icons-material/Send';

import Picker from 'emoji-picker-react';

const MessageSend = ({
  handleInputChange,
  newMessage,
  handleSendMessage,
  handleSendMessageEnter,
  setNewMessage,
  imageMessage,
  setImageMessage,
}) => {
  const textRef = useRef(null);
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

  const handleImageSend = async (e) => {
    if (e.target.files.length !== 0) {
      // sendingSPlay();
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        console.log(event.target.result);
        setImageMessage(event.target.result);
      };
      // const imgMess = await comment(postId, text, imgMes[0].url, user.token);
      // ImageMessageSend(formData, user.token);
    }
  };

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Đính kèm tệp</div>
        <AddCircleOutlineIcon />
      </div>
      <div className="file hover-image">
        <div className="add-image">Thêm hình ảnh</div>
        <input
          onChange={handleImageSend}
          type="file"
          id="pic"
          className="form-control"
          accept="image/jpeg,image/png,image/gif,image/webp"
        />
        <label htmlFor="pic">
          <InsertPhotoIcon />
        </label>
      </div>
      <div className="file">
        <AttachFileIcon />
      </div>
      <div className="file hover-gift">
        <div className="add-gift">Add gift</div>
        <RedeemIcon />
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
          onChange={handleInputChange}
          onKeyUp={handleSendMessageEnter}
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control-custom"
          ref={textRef}
        />
        {imageMessage && (
          <img
            src={imageMessage}
            alt=""
            width="200"
            height="100"
            style={{ transform: 'translateX(-76px)' }}
          />
        )}
        <div
          onClick={() => setPicker(!picker)}
          style={{ transform: 'translateX(-10px)', cursor: 'pointer' }}
        >
          <EmojiEmotionsIcon />
        </div>
      </div>
      <div onClick={handleSendMessage} className="file">
        {newMessage ? <SendIcon /> : '❤️'}
      </div>
      <div className="comment_emoji_picker">
        {picker && <Picker onEmojiClick={handleEmoji} />}
      </div>
    </div>
  );
};

MessageSend.prototype = {
  handleInputChange: PropTypes.func,
  handleSendMessage: PropTypes.func,

  newMessage: PropTypes.string,
};

export default MessageSend;
