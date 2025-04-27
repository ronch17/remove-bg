import React, { useRef, useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import "./RemoveBg.css";

const RemoveBg = ({ imageName, getColorData }) => {
  const [color, setColor] = useState("#000");

  const inputElement = useRef();

  function choose_color() {
    inputElement.current.click();
  }

  function change_color(e) {
    setColor(e.target.value);
    getColorData(e.target.value);
  }

  // console.log(e.target.value);

  return (
    <>
      <div className="top-color-div">
        <div className="color_div" onClick={choose_color}>
          <span className="display_text"> צבע רקע </span>

          <span
            className="display_color"
            style={{ backgroundColor: color }}
          ></span>
          <input
            type="color"
            className="input_color"
            onChange={change_color}
            ref={inputElement}
          />
        </div>

        <div style={{ color: "#1098B2" }}>
          <h6>
            אל תשכח להוריד את הקבצים שלך. הם ימחקו אוטומטית כשתצא מהדף
            <PiWarningCircle />
          </h6>
        </div>
      </div>
      <div className="image-container">
        {imageName ? (
          <div className="image-wrapper" style={{ backgroundColor: color }}>
            <img
              className="no-bg-img"
              src={`http://localhost:5000/no_bg_${imageName}`}
              alt="no-background"
              crossOrigin="Anonymous"
            />
          </div>
        ) : (
          <h3 className="no-img-text">
            העלו תמונה להסרת רקע, ניתן גם לבחור צבע בשביל לשנות צבע רקע
          </h3>
        )}
      </div>
    </>
  );
};

export default RemoveBg;
