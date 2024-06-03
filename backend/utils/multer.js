const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { s3, bucketName } = require('.././aws-config');

// Store files in memory as buffer
const storage = multer.memoryStorage(); 

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size
});

// Middleware to upload to S3
const uploadToS3 = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const uniqueFileName = `${uuidv4()}_${req.file.originalname}`;

  const params = {
    Bucket: bucketName,
    Key: uniqueFileName,
    Body: req.file.buffer
  };

  s3.upload(params, (error, data) => {
    if (error) {
      console.error('S3 Upload Error:', error);
      return next(error);
    }

    req.uniqueFileName = uniqueFileName;

    next();
  });
};

module.exports = { upload, uploadToS3 };
