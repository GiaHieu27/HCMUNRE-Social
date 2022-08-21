import { useEffect, useState, useRef } from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";

function EmojiPickerBackground(props) {
  const [cursorPosition, setCursorPosition] = useState();

  const sm = useMediaQuery({ query: "(max-width: 550px)" });

  const bgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const postBackgrounds = [
    "../../../images/postBackgrounds/1.jpg",
    "../../../images/postBackgrounds/2.jpg",
    "../../../images/postBackgrounds/3.jpg",
    "../../../images/postBackgrounds/4.jpg",
    "../../../images/postBackgrounds/5.jpg",
    "../../../images/postBackgrounds/6.jpg",
    "../../../images/postBackgrounds/7.jpg",
    "../../../images/postBackgrounds/8.jpg",
    "../../../images/postBackgrounds/9.jpg",
  ];

  const handleEmojiClick = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = props.text.substring(0, ref.selectionStart);
    const end = props.text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    props.setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleBackgroundClick = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    props.setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };

  const handleRemoveBackground = () => {
    bgRef.current.style.backgroundImage = ``;
    props.setBackground();
    bgRef.current.classList.remove("bgHandler");
  };

  return (
    <div className={!props.type2 ? "" : "images_input"}>
      <div className={!props.type2 ? "flex_center" : ""} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={props.text}
          placeholder={`Bạn đang nghĩ gì thế ${props.user.last_name}`}
          onChange={(e) => props.setText(e.target.value)}
          onClick={() => props.setPicker(false)}
          className={`post_input ${!props.type2 ? "" : "input2"} ${
            sm && !props.background && "ww"
          }`}
          style={{
            paddingTop: `${
              props.background
                ? Math.abs(textRef.current.value.length * 0.1 - 30)
                : "0"
            }%`,
          }}
        ></textarea>
      </div>
      <div className={!props.type2 ? "post_emojis_wrap" : ""}>
        {props.picker && (
          <div
            className={`comment_emoji_picker ${
              !props.type2 ? "rlmove" : "movepicker2"
            }`}
          >
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        {!props.type2 && props.showBg && (
          <div className="post_background">
            <div
              className="no_bg"
              onClick={() => {
                handleRemoveBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                alt={i}
                key={i}
                onClick={() => {
                  handleBackgroundClick(i);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmojiPickerBackground;
