import React from "react";

const OriginalBg = ({ imageName }) => {
  return (
    <div>
      {imageName ? (
        <img
          className="original-image"
          src={`http://localhost:5001/upload_image/${imageName}`}
          alt="original"
          style={{ paddingTop: "3rem" }}
        />
      ) : (
        <h3>כאן תוצג התמונה המקורית שלך</h3>
      )}
    </div>
  );
};

export default OriginalBg;
