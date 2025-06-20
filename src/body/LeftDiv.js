import React, { useState } from "react";
import Card from "../UI/Card";
import "./LeftDiv.css";
import CHECK from "../assets/images_bg_remove/check.png";
import html2canvas from "html2canvas";

const LeftDiv = ({ imageName, colorData }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to download image
  const downloadImage = async (e) => {
    e.preventDefault(); // Prevent default navigation behavior

    if (!imageName) {
      alert("Please upload an image first");
      return;
    }

    setIsDownloading(true);

    try {
      // Find the image wrapper which contains the image with background color
      const imageWrapper = document.querySelector('.image-wrapper');
      if (!imageWrapper) {
        throw new Error("Image wrapper not found");
      }

      // Get the image element
      const imgElement = imageWrapper.querySelector('img');
      if (!imgElement) {
        throw new Error("Image element not found");
      }

      // Wait for the image to fully load to avoid capturing issues
      if (!imgElement.complete) {
        await new Promise((resolve) => {
          imgElement.onload = resolve;
        });
      }

      // Create a new div for capturing with exact dimensions
      const captureDiv = document.createElement('div');
      captureDiv.style.backgroundColor = colorData;
      captureDiv.style.width = '600px';
      captureDiv.style.height = '400px';
      captureDiv.style.position = 'fixed';
      captureDiv.style.left = '-9999px';
      captureDiv.style.top = '-9999px';
      captureDiv.style.display = 'flex';
      captureDiv.style.justifyContent = 'center';
      captureDiv.style.alignItems = 'center';

      // Create a new image that will be a copy of our transparent background image
      const newImg = new Image();
      newImg.crossOrigin = "Anonymous"; // Try to avoid CORS issues
      newImg.src = imgElement.src + '?t=' + new Date().getTime(); // Add timestamp to avoid caching
      newImg.style.maxWidth = '90%';
      newImg.style.maxHeight = '90%';

      // Add the new image to our capture div
      captureDiv.appendChild(newImg);
      document.body.appendChild(captureDiv);

      // Wait for the new image to load
      await new Promise((resolve) => {
        newImg.onload = resolve;
      });

      // Create a canvas from the element
      const canvas = await html2canvas(captureDiv, {
        backgroundColor: colorData || "#000000",
        scale: 2, // Better quality
        useCORS: true, // Try to use CORS for external images
        allowTaint: true, // Allow tainted canvas
      });

      // Remove the temporary div
      document.body.removeChild(captureDiv);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `background_removed_${imageName.split('.')[0]}.png`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        setIsDownloading(false);
      }, 'image/png');
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("There was a problem downloading the image");
      setIsDownloading(false);
    }
  };

  // Function to download HD image (same as regular for demo but with higher quality)
  const downloadHDImage = async (e) => {
    e.preventDefault(); // Prevent default navigation behavior

    if (!imageName) {
      alert("Please upload an image first");
      return;
    }

    setIsDownloading(true);

    try {
      // Find the image wrapper which contains the image with background color
      const imageWrapper = document.querySelector('.image-wrapper');
      if (!imageWrapper) {
        throw new Error("Image wrapper not found");
      }

      // Get the image element
      const imgElement = imageWrapper.querySelector('img');
      if (!imgElement) {
        throw new Error("Image element not found");
      }

      // Wait for the image to fully load to avoid capturing issues
      if (!imgElement.complete) {
        await new Promise((resolve) => {
          imgElement.onload = resolve;
        });
      }

      // Create a new div for capturing with exact dimensions
      const captureDiv = document.createElement('div');
      captureDiv.style.backgroundColor = colorData || '#000000';
      captureDiv.style.width = '1200px'; // Double size for HD
      captureDiv.style.height = '800px';
      captureDiv.style.position = 'fixed';
      captureDiv.style.left = '-9999px';
      captureDiv.style.top = '-9999px';
      captureDiv.style.display = 'flex';
      captureDiv.style.justifyContent = 'center';
      captureDiv.style.alignItems = 'center';

      // Create a new image that will be a copy of our transparent background image
      const newImg = new Image();
      newImg.crossOrigin = "Anonymous"; // Try to avoid CORS issues
      newImg.src = imgElement.src + '?t=' + new Date().getTime(); // Add timestamp to avoid caching
      newImg.style.maxWidth = '90%';
      newImg.style.maxHeight = '90%';

      // Add the new image to our capture div
      captureDiv.appendChild(newImg);
      document.body.appendChild(captureDiv);

      // Wait for the new image to load
      await new Promise((resolve) => {
        newImg.onload = resolve;
      });

      // Create a canvas from the element with higher scale for HD
      const canvas = await html2canvas(captureDiv, {
        backgroundColor: colorData || "#000000",
        scale: 6, // Even better quality for HD
        useCORS: true, // Try to use CORS for external images
        allowTaint: true, // Allow tainted canvas
      });

      // Remove the temporary div
      document.body.removeChild(captureDiv);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `background_removed_hd_${imageName.split('.')[0]}.png`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        setIsDownloading(false);
      }, 'image/png', 1.0); // Highest quality
    } catch (error) {
      console.error("Error downloading HD image:", error);
      alert("There was a problem downloading the HD image");
      setIsDownloading(false);
    }
  };

  return (
    <Card>
      <div className="inner_card" style={{ background: "#161B21" }}>
        <div className="download_box">
        <h2>תמונה חינם</h2>
        <h4 dir="rtl">תצוגה מקדימה של תמונה 612x408</h4>
        <button className="custom_btn" onClick={downloadImage} disabled={isDownloading}>
          {isDownloading ? 'מעבד...' : 'הורד'}
        </button>
        <div className="check_text">
          <small> איכות טובה עד 0.25 מגה פיקסל </small>
          <img src={CHECK} alt="icon" width="13"></img>
        </div>
        </div>
        <hr />
        <div className="download_box">
        <div className="align_text">
          <h2>Pro</h2>
          <button className="custom_gradient custom-gradient">חדש!</button>
          <div className="psuedo custom-gradient"></div>
        </div>
        <h4 dir="rtl">תמונה מלאה 1290x1920</h4>
        <button className="custom_btn" onClick={downloadHDImage} disabled={isDownloading}>
          {isDownloading ? 'מעבד...' : 'הורד HD'}
        </button>
        <div className="check_text">
          <small>איכות טובה עד 25 מגה פיקסל </small>
          <img src={CHECK} alt="icon" width="13"></img>
        </div>
        </div>
      </div>
    </Card>
  );
};

export default LeftDiv;
