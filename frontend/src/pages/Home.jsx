import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Image } from "cloudinary-react";
import { Layout, Button } from "antd";

const { Header, Footer, Content } = Layout;

const Home = (props) => {
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

  // useEffect(() => {
  //   loadImages();
  // }, [imageIds]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header" style={{ color: "white" }}>
        Image Gallery
      </Header>
      <Content className="content">
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
      </Content>
      <Footer className="footer">
        <Button
          type="primary"
          onClick={() => {
            props.history.push("/upload");
          }}
        >
          upload images
        </Button>
      </Footer>
    </Layout>
  );
};

export default Home;
