const jwt = require('jsonwebtoken');
const config = require('../config');
const secretKey = config.secretKey;

const authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(401).json({ error: 'No token provided. Access denied.' });
  }

  const token = extractToken(bearerHeader);
  
  if (!token) {
    return res.status(401).json({ error: 'Malformed token. Access denied.'})
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);

    if (!isTokenValid(decodedToken)) {
      return res.status(403).json({ error: 'You do not have permission for this action.' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token. Access denied.'})
  }
};

const extractToken = (bearerHeader) => {
  const tokenParts = bearerHeader.split(' ');

  if (tokenParts.length === 2 && tokenParts[0].toLowerCase() === 'bearer') {
    return tokenParts[1];
  }

  return null;
};

const isTokenValid = (decodedToken) => {
  return decodedToken && decodedToken.accessLevel === 'admin';
};

module.exports = authMiddleware;
