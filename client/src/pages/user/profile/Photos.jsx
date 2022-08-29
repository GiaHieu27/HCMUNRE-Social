function Photos({ photos }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Hình ảnh
        <div className="profile_header_link">Xem tất cả hình ảnh</div>
      </div>

      <div className="profile_header_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 hình ảnh"
          : `${photos.total_count} hình ảnh`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((photo) => (
            <div className="profile_photo_card" key={photo.public_id}>
              <img src={photo.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Photos;
