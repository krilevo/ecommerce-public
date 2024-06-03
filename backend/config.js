require('dotenv').config();

module.exports = {
  secretKey: process.env.SECRET_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  tokenExpirationTime: '24h'
};
