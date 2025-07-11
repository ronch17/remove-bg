import { useRef } from "react";
import "./Header.css";
import { BiUpload } from "react-icons/bi";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const Header = ({ getImageName, colorData, isLoading }) => {
  const inputElement = useRef();

  let mycolor = colorData;

  function upload_file() {
    inputElement.current.click();
  }

  const sendFileToServer = async (e) => {
    const data = e.target.files[0];

    if (data.type === "image/png" || data.type === "image/jpeg") {
      const formData = new FormData();

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      formData.append("myFile", data, data.name);
      formData.append("color_to_api", mycolor);

      try {
        isLoading(true);
        const res = await axios.post(`${apiUrl}/upload_file`, formData, config);
        getImageName(res.data.imageName);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("There was an error uploading the file.");
      }
    } else {
      alert("File type not supported");
    }
    isLoading(false);
  };

  return (
    <div className="bg">
      <div className="header">
        <div className="top_header">
          <span className="esc"></span>
          <span className="header_text">העלאת תמונה כדי להסיר רקע</span>
        </div>
        <div className="bottom_header">
          <button className="header-btn" onClick={upload_file}>
            <BiUpload /> העלאת תמונה
          </button>
          <input
            onChange={sendFileToServer}
            type="file"
            ref={inputElement}
            className="input_file"
          />

          <span className="format">פורמטים נתמכים png, jpg</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
