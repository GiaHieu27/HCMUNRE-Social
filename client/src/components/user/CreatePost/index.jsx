function CreatePost({ user, setVisible, profile }) {
  return (
    <div className={`createPost ${profile ? "mt-3" : ""}`}>
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover2" onClick={() => setVisible(true)}>
          Chia sẻ bài viết nhé {user?.last_name}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
