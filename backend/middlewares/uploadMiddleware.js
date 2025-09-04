const multer = require('multer');

//configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // e.g., 1693928392-image.jpg
  },
});

//File Filter 
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false); 
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;

