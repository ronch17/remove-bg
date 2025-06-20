const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

module.exports = async function send_to_api(image_path, fileName, color) {
  const inputPath = image_path;

  // בדיקה אם הקובץ קיים
  if (!fs.existsSync(inputPath)) {
    console.error("❌ File does not exist:", inputPath);
    return;
  }

  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", fs.createReadStream(inputPath));
  if (color) {
    formData.append("bg_color", color);
  }

  try {
    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": "UCQa99X4xGSDaxKAeoEt63S8", // ודא שזה תקף
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    if (response.status === 200) {
      const outputPath = path.join(__dirname, "upload_image", "no_bg_" + fileName);
      fs.writeFileSync(outputPath, response.data);
      console.log("✅ Image processed successfully:", outputPath);
    } else {
      console.error("❌ Unexpected response status:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("❌ Failed to process image:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      console.error("Body:", error.response.data.toString()); // זה הכי חשוב – רואים למה זה נכשל
    } else {
      console.error("Error:", error.message);
    }
  }
};
