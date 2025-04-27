import { useState } from "react";
import "./App.css";
import LeftDiv from "./body/LeftDiv";
import RightDiv from "./body/RightDiv";
import Footer from "./footer/Footer";
import Header from "./header/Header";

function App() {
  const [imageName, setImageName] = useState("");
  const [colorData, setColorData] = useState("");

  const imageUpload = (name) => {
    setImageName(name);
  };

  const getColorData = (color) => {
    setColorData(color);
  };

  return (
    <div className="App">
      <Header colorData={colorData} getImageName={imageUpload} />
      <div className="grid_body">
        <RightDiv getColorData={getColorData} imageName={imageName} />
        <LeftDiv imageName={imageName} colorData={colorData} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
