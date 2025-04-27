import React, { useState } from "react";
import Card from "../UI/Card";
import OriginalBg from "./OriginalBg";
import RemoveBg from "./RemoveBg";
import "./RightDiv.css";
import { AiOutlinePicture } from "react-icons/ai";
import { PiPictureInPictureDuotone } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi";
import Eula from "./Eula";

const RightDiv = ({ imageName, getColorData }) => {
  const [tabChange, setTabChange] = useState(false);
  const [eulaPopup, setEulaPopup] = useState(false);

  const changedTab = (e) => {
    let ron = e.target.classList.value;
    console.log(ron);

    if (e.target.classList.value == "No_bg") {
      setTabChange(false);
    } else {
      setTabChange(true);
    }
  };

  const openEula = (close) => {
    setEulaPopup(!eulaPopup);
    setEulaPopup(close);
  };

  return (
    <Card divSide={true}>
      <div className="tabs_group">
        <span
          className="No_bg"
          onClick={changedTab}
          style={{
            borderBottom: tabChange == true ? "" : "3px solid #C933F3",
          }}
        >
          הסר רקע <PiPictureInPictureDuotone />
        </span>
        <span
          className="Original_bg"
          onClick={changedTab}
          style={{
            borderBottom: tabChange == true ? "3px solid #C933F3" : "",
          }}
        >
          מקורי <AiOutlinePicture />
        </span>
      </div>
      <div className="left_side">
        {tabChange ? (
          <OriginalBg imageName={imageName} />
        ) : (
          <RemoveBg getColorData={getColorData} imageName={imageName} />
        )}
      </div>
      <div className="eula">
        <button className="eula-btn" onClick={openEula}>
          <HiOutlineDocumentText />
          תקנון החברה
        </button>
        <h6>
          על ידי העלאת תמונה אתה מסכים לתנאים וההתנהלות שלנו. אתר זה מוגן על ידי
          מדיניות הפרטיות ותנאי השירות שלו
        </h6>
        {eulaPopup && <Eula close={openEula} />}
      </div>
    </Card>
  );
};

export default RightDiv;
