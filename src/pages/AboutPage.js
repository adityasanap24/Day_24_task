import React from "react";
import "../components/css/common.css";

const AboutPage = () => {
  return (
    <>
      <div className="safeArea">
        <h1 className="pageTitle">About Page</h1>
        <div className="center safeArea">
          <p style={{ fontSize: "1.4em", textAlign: "center" }}>
            Made by Aditya Tajanpure <br />
            <br />
            Front end: React <br />
            Backend: NodeJS and Express <br />
            Database: MongoDB <br />
            <br />
            Thank you
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
