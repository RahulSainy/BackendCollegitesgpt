const multer = require('multer');

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const fileName = file.originalname + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
    cb(null, fileName);
  },
});

// Define file filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create the multer upload instance
const upload = multer({ storage, fileFilter });

module.exports = upload;