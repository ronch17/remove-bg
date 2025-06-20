import React from "react";
import LOGO from "../assets/images_bg_remove/logo.png";
import BANNER from "../assets/images_bg_remove/banner.png";
import styles from "./Footer.module.css";

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
      <img className={styles.banner}  src={BANNER} alt="banner" />
    </div>
  );
};

export default Footer;
