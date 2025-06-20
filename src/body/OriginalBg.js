import React from "react";
import { apiUrl } from '../utils/api'
import styles from "./OriginalBg.module.css";

const OriginalBg = ({ imageName , isLoading}) => {
  return (
    <div className={isLoading ? styles.container : {}}>
      {imageName ? (
        <img
          className="original-image"
          src={`${apiUrl}/upload_image/${imageName}`}
          alt="original"
          style={{ paddingTop: "3rem" }}
        />
      ) : isLoading ? <div className={styles.loader}></div> : (
        <h3>כאן תוצג התמונה המקורית שלך</h3>
      )}
    </div>
  );
};

export default OriginalBg;
