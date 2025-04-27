const express = require("express");

const app = express();
const port = 5000;

var fileupload = require("express-fileupload");
//app.use(fileupload({useTempFiles:true}));

app.use(fileupload());

var cors = require("cors");
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set additional headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Add body parser for JSON
app.use(express.json());

// Add cache control headers to prevent browser caching
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.use(express.static("no_bg_image", {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

app.use(express.static("upload_image", {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

const send_to_api = require("./send_to_api");

app.post("/upload_file", (req, res) => {
  console.log(req.body.color_to_api);

  console.log(req.body);

  const newpath = __dirname + "/upload_image/";
  const file = req.files.myFile;
  const now = new Date().getTime();

  const filename = now + file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    try {
      (async () => {
        await send_to_api(
          `${newpath}${filename}`,
          filename,
          req.body.color_to_api
        );
        res.status(200).send({ imageName: filename, code: 200 });
      })();
    } catch (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
  });
});

// Add a new endpoint to change background color of an existing image
app.post("/change_bg_color", (req, res) => {
  const { imageName, color } = req.body;
  
  if (!imageName) {
    return res.status(400).send({ message: "Image name is required", code: 400 });
  }

  console.log("Changing background color of", imageName, "to", color);

  // Path to the original uploaded image
  const originalPath = __dirname + "/upload_image/" + imageName;
  
  // Check if the original file exists
  if (!fs.existsSync(originalPath)) {
    return res.status(404).send({ message: "Original image not found", code: 404 });
  }

  try {
    (async () => {
      await send_to_api(
        originalPath,
        imageName,
        color
      );
      
      // Force a timestamp to ensure the client gets the new image
      const timestamp = new Date().getTime();
      res.status(200).send({ 
        imageName: imageName, 
        code: 200,
        timestamp: timestamp
      });
    })();
  } catch (err) {
    console.error("Error changing background color:", err);
    res.status(500).send({ message: "Color change failed", code: 500 });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
