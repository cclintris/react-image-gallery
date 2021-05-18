import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";

const Home = () => {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, [imageIds]);

  return (
    <div>
      <h1>Home</h1>
      {imageIds &&
        imageIds.map((imageId, idx) => (
          <Image
            key={idx}
            cloudName="cclinCloud"
            publicId={imageId}
            width="300"
            crop="scale"
          />
        ))}
    </div>
  );
};

export default Home;
