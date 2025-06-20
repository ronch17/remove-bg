import React, { useRef, useState, useCallback, useEffect } from "react";
import { PiWarningCircle } from "react-icons/pi";
import "./RemoveBg.css";
import { apiUrl } from "../utils/api";

const RemoveBg = ({ imageName, getColorData, isLoading }) => {
  const [color, setColor] = useState('');
  const inputElement = useRef();

  useEffect(() => {
    const storedColor = localStorage.getItem("backgroundColor");
    if (storedColor) {
      setColor(storedColor);
    }
  }, []);

  const choose_color = () => {
    inputElement.current.click();
  };

  const change_color = useCallback((e) => {
    const newColor = e.target.value;
    setColor(newColor);
    localStorage.setItem("backgroundColor", newColor);
    getColorData(newColor);
  }, [getColorData]);

  const removeBg = () => {
    setColor('');
    localStorage.removeItem("backgroundColor");
    getColorData('');
  }
  return (
      <>
        <div className="row">
      <div className="btns-group">
        <div className="top-color-div">
          <div className="color_div" onClick={choose_color}>
            <span className="display_text"> צבע רקע </span>
            <span className="display_color" style={{ backgroundColor: color }}></span>
            <input
                type="color"
                className="input_color"
                onChange={change_color}
                ref={inputElement}
                value={color}
            />
          </div>
        </div>
        <button className="remove-btn header-btn" onClick={removeBg} style={{backgroundColor: "transparent", border: "1px solid rgb(255 255 255 / 35%)"}}>הסר רקע</button>

      </div>
          <div style={{ color: "#1098B2" }}>
            <h4>
              אל תשכח להוריד את הקבצים שלך. הם ימחקו אוטומטית כשתצא מהדף
              <PiWarningCircle />
            </h4>
          </div>
        </div>


        <div className="image-container" style={{ ...(isLoading ? { height: "75%" } : {}) }}>
          {imageName ? (
              <div className="image-wrapper" style={{ backgroundColor: color }}>
                <img
                    className="no-bg-img"
                    src={`${apiUrl}/upload_image/no_bg_${imageName}`}
                    alt="no-background"
                    crossOrigin="Anonymous"
                />
              </div>
          ) : isLoading ? <div className="loader"></div> : (
              <h3 className="no-img-text">
                העלו תמונה להסרת רקע, ניתן גם לבחור צבע בשביל לשנות צבע רקע
              </h3>
          )}
        </div>
      </>
  );
};

export default RemoveBg;