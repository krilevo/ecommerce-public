require('dotenv').config(); // Load environment variables from .env

const AWS = require('aws-sdk');

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
});

module.exports = { s3, bucketName };
