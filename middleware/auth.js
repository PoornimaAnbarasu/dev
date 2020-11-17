const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from the header
  const token = req.header('x-auth-token');

  //check if token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Token is not valid' });
  }
};
