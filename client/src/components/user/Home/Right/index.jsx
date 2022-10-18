import Contact from './Contact';

function RightHome() {
  return (
    <div className="right_home">
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Có thể bạn quen biết</div>
        </div>
        <div className="contacts_list">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default RightHome;
