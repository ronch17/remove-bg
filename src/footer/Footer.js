import React from "react";
import LOGO from "../assets/images_bg_remove/logo.png";
import BANNER from "../assets/images_bg_remove/banner.png";

const Footer = () => {
  const mystyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
  };

  return (
    <div style={mystyle}>
      <img src={LOGO} alt="logo" />
      <img style={{ width: "70%" }} src={BANNER} alt="banner" />
    </div>
  );
};

export default Footer;
