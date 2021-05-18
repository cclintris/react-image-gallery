const express = require("express");
const app = express();
const { cloudinary } = require("./utils/cloudinary");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api/images", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder: react_image_gallery")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedRes = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "react_image_gallery",
    });
    console.log(uploadedRes);
    res.json({ msg: "Image uploaded successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong!" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
