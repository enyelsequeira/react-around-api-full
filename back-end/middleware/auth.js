const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization Required' });
  }

  let user;

  User.findById(payload._id).then((user) => {
    req.user = user;

    console.log('I HAVE THE USER', req.user);
    next();
  });
};
