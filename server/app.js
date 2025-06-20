const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = [
  'http://localhost:3002',
  'https://remove-bg-wine.vercel.app'
];

// הגדרות CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// טיפול ב-OPTIONS
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', allowedOrigins);
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});

app.use('/upload_image', express.static(path.join(__dirname, 'upload_image')));


// הגדרת תיקיית העלאה
const uploadDir = path.join(__dirname, 'upload_image');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// הגדרת multer - שמירה בדיסק עם שם ייחודי
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // const uniqueName = Date.now() + '-' + file.originalname;
    // cb(null, uniqueName);
    cb(null, 'new_image.jpg');
  }
});

// פילטר לקבצים מותרים בלבד
const fileFilter = (req, file, cb) => {
  if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
  fileFilter,
});

// ניתוח JSON
app.use(express.json());

// ראוט להעלאת קובץ (upload.single('myFile') - שם השדה בצד client)
app.post('/upload_file', upload.single('myFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
  }

  try {
    const fileName = req.file.filename;
    const filePath = path.join(uploadDir, fileName);
    const colorToApi = req.body.color_to_api || null;

    // כאן תוכל לקרוא לפונקציית send_to_api עם הנתונים
    await require('./send_to_api')(filePath, fileName, colorToApi);

    res.status(200).json({ imageName: fileName, code: 200 });
  } catch (error) {
    console.error('Error in upload_file route:', error);
    res.status(500).json({ message: 'File upload failed', code: 500 });
  }
});

// דוגמה לראוט נוסף
app.post('/change_bg_color', async (req, res) => {
  const { imageName, color } = req.body;

  if (!imageName) {
    return res.status(400).json({ message: 'Image name is required', code: 400 });
  }

  const originalPath = path.join(uploadDir, imageName);

  if (!fs.existsSync(originalPath)) {
    return res.status(404).json({ message: 'Original image not found', code: 404 });
  }

  try {
    await require('./send_to_api')(originalPath, imageName, color);

    const timestamp = Date.now();
    res.status(200).json({ imageName, code: 200, timestamp });
  } catch (error) {
    console.error('Error changing background color:', error);
    res.status(500).json({ message: 'Color change failed', code: 500 });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
