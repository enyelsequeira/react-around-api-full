const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../middleware/errors/AuthError');

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(11111, authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization Error');
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'
    );
    console.log(payload, 1);
  } catch (err) {
    console.log(err, 2);
    throw new AuthError('Authorization Error');
  }

  req.user = payload; // adding the payload to the Request object
  console.log('THIS IS OUR USER', req.user);
  next(); // passing the request further along
};
