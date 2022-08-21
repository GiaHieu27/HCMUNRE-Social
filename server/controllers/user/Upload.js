const cloudinary = require("cloudinary");

const removeTemp = require("../../helpers/removeTemp");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    const files = Object.values(req.files).flat();
    console.log(files);
    const images = [];
    const videos = [];

    for (const file of files) {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "image/webp"
      ) {
        const url = await uploadToCloudinaryImg(file, path);
        images.push(url);
        removeTemp(file.tempFilePath);
      }
      if (file.mimetype === "video/mp4") {
        const url = await uploadToCloudinaryVideo(file, path);
        videos.push(url);
        removeTemp(file.tempFilePath);
      }
    }
    console.log(images);
    console.log(videos);
    res.json({ images, videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listImages = async (req, res) => {
  try {
    const { path, sort, max } = req.body;
    cloudinary.v2.search
      .expression(path)
      .sort_by("created_at", sort)
      .max_results(max)
      .execute()
      .then((results) => res.json(results))
      .catch((err) => console.error(err.error.message));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinaryImg = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTemp(file.tempFilePath);
          console.log(err.message);
          res.status(400).json({ message: err.message });
        }
        console.log(res);
        console.log(111);
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const uploadToCloudinaryVideo = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        resource_type: "video",
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTemp(file.tempFilePath);
          console.log(err.message);
          res.status(400).json({ message: err.message });
        }
        console.log(res);

        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};
