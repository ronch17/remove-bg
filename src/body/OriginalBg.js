import React from "react";

const OriginalBg = ({ imageName }) => {
  return (
    <div>
      {imageName ? (
        <img
          className="no-bg-img"
          src={`http://localhost:5000/${imageName}`}
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
