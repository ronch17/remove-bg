import { useState } from "react";
import "./App.css";
import LeftDiv from "./body/LeftDiv";
import RightDiv from "./body/RightDiv";
import Footer from "./footer/Footer";
import Header from "./header/Header";

function App() {
  const [imageName, setImageName] = useState("");
  const [colorData, setColorData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageUpload = (name) => {
    setImageName(name);
  };

  const getColorData = (color) => {
    setColorData(color);
  };

  const loaderFn = (val) => {
      setIsLoading(val);
  }

  return (
    <div className="App">
      <Header isLoading={loaderFn} colorData={colorData} getImageName={imageUpload} />
      <div className="grid_body">
        <RightDiv isLoading={isLoading} getColorData={getColorData} imageName={imageName} />
        <LeftDiv imageName={imageName} colorData={colorData} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
